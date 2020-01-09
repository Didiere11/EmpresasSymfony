<?php

namespace loginBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use loginBundle\Model\UsuarioModel;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

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
                    $result['status']= 1;
                    $result['message']="ERROR";
                }else{
                    $result['status']= 2;
                    $result['message']="administrador";
                }
            }
            return $this->jsonResponse($result);
        }
        //-------------------------------------------------------------------------

        return $this->render('loginBundle:Default:login.html.twig');
        
    }

}
