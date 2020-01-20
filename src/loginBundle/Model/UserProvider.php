<?php

namespace loginBundle\Model;

use Symfony\Component\Security\Core\User\UserProviderInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\Exception\UsernameNotFoundException;
use Symfony\Component\Security\Core\Exception\UnsupportedUserException;
use Symfony\Component\DependencyInjection\ContainerInterface;
use loginBundle\Model\UsuarioModel;

class UserProvider implements UserProviderInterface {

    private $UsuarioModel;

    public function __construct(ContainerInterface $container = null) {
        $this->UsuarioModel = new UsuarioModel();
    }

    public function loadUserByUsername($username = "none") {
        if ($username == "" || $username == "*") {
            $username = "_none_username";
            throw new UsernameNotFoundException(sprintf('Username "%s" does not exist.', $username));
        }
        $Args = Array('correo' => "'" . $username . "'");
        $result_usuario = $this->UsuarioModel->findUser($Args);
        print_r($result_usuario);
        die();
        if (!$result_usuario['status']) {
            throw new UsernameNotFoundException($result_usuario['data']);
        }

        if (count($result_usuario['data']) == 0) {
            throw new UsernameNotFoundException(sprintf('Username "%s" does not exist.', $username));
        }

        $usuario = $result_usuario['data'][0];

        $roles = array('ROLE_ADMIN');
        $user = new Profile($usuario['correo'], $usuario['contraseña'], $roles);
        $user->setData($usuario);
        return $user;
    }

    public function refreshUser(UserInterface $user) {
        if (!$user instanceof Profile) {
            throw new UnsupportedUserException(sprintf('Instances of "%s" are not supported.', get_class($user)));
        }

        return $user;
    }

    public function supportsClass($class) {
        return $class === 'loginBundle\Model\Profile';
    }

}
