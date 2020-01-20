<?php

namespace loginBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use loginBundle\Model\UsuarioModel;
use loginBundle\Model\Profile;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;
use Symfony\Component\Security\Core\Authentication\Token\UsernamePasswordToken;



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

    public function insertarUsuarioAction(Request $request){
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            $post = $request->request->all();
            
        $data = array(
            //--en BD-----------------en formulario
            "nomusuario"=> "'" . $post["nomusuario"] . "'",
            "correo"=> "'" . $post["correousuario"] . "'",
            "contraseña"=> "'" . $post["pwdusuario"] . "'",
            "domicilio"=> "'" . $post["domusuario"] . "'",
            "idtipousr"=> "'" . $post["tipousr"] . "'"
        );
       
        $result = $this->UsuarioModel->insertUsuario($data);
        if ($result['status']) {
            $result['data'] = $post;
            $result['status'] = TRUE;
            $result['message']="Guardado con exito";
        }else{
            $result['status'] = FALSE;
            $result['message']="ERROR";
        }
        return $this->jsonResponse($result);
        }   
    }
    
   public function loginAction(Request $request)
    { 
        $session = $request->getSession();
          // Creamos el token
        
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            $post = $request->request->all();
            
            $data = array(
                "correo"=> "'" . $post["corr"] . "'",
                "contraseña"=> "'" . $post["contra"] . "'"
            );
            $result = $this->UsuarioModel->getUsuarios($data);
            $aux = $result["data"][0]['idtipousr'];
                
            if ($result['data']==null) {
                $result['status'] = FALSE;
                $result['message']="ERROR";
            }else{ 
                if ($aux==1) {
                    $role = array('ROLE_USER');
                }else if($aux == 2){
                    $role = array('ROLE_ADMIN');
                }
                    //Creamos el objeto Profile con los datos presentados por el formulario

                    $profile = new Profile($result["data"][0]['correo'], $result["data"][0]['contraseña'], $this->App['salt'], $role);
                    $profile->setData($result['data'][0]);
                    $token = new UsernamePasswordToken($profile, $profile->getPassword(), 'main', $profile->getRoles());
                    $this->container->get('security.token_storage')->setToken($token);
            
                    // Creamos e iniciamos la sesión
                    $session->set('_security_main', serialize($token));
                   
                    $result['status']= 1;
                    $result['message']="ERROR";
                }
                /*else{
                    //print_r($result);
                    //die();
                    //Creamos el objeto Profile con los datos presentados por el formulario
                    $profile = new Profile($result["data"][0]['correo'], $result["data"][0]['contraseña'], $this->App['salt'], array('ROLE_ADMIN'));
                    $profile->setData($result['data'][0]);
                    $token = new UsernamePasswordToken($profile, $profile->getPassword(), 'main', $profile->getRoles());
                    $this->container->get('security.token_storage')->setToken($token);
            
                    // Creamos e iniciamos la sesión
                    $session->set('_security_main', serialize($token));
                   
                    $result['status']= 2;
                    $result['message']="administrador";
                }*/
            
            return $this->jsonResponse($result);
        }
        //-------------------------------------------------------------------------

        return $this->render('loginBundle:Default:login.html.twig');
        
    }
    public function adminAction(Request $request)
    {
        return new Response('<html><body>Admin page!</body></html>');
    }

}
