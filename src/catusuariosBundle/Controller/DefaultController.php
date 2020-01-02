<?php

namespace catusuariosBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use catusuariosBundle\Model\UsuarioModel;

class DefaultController extends Controller
{
    protected $UsuarioModel;
    public function __construct() {
        $this->UsuarioModel = new UsuarioModel();
     }
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    public function catusuariosAction()
    {
        $result = $this->UsuarioModel->getUsuarios();
        $usuario = $result['data'];
        $content['usuario'] = $usuario;
        return $this->render('catusuariosBundle:Default:catusuarios.html.twig', array('content' => $content));
    }
}
