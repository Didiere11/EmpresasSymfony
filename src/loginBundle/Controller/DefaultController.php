<?php

namespace loginBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use loginBundle\Model\UsuarioModel;

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
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            $post = $request->request->all();
            
            $data = array(
                "correo"=> "'" . $post["correo"] . "'",
                "contraseña"=> "'" . $post["contra"] . "'"
            );
            $result = $this->UsuarioModel->getUsuarios($data);
            //print_r($result['data']);
            //die();
            if ($result['data']==null) {
                $result['status'] = FALSE;
                $result['message']="ERROR";
            }else{
               
                
                $result['data'] = $post;
                $result['status'] = TRUE;
                $result['message']="acceso con exito";
            }
            
            return $this->jsonResponse($result);
        }
        return $this->render('loginBundle:Default:login.html.twig');
    }

}
