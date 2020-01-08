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
        $post['idusuario']=$result["data"][0]['idusuario'];
        if ($result['status']==1) {
            //print_r($result['data']);
            //die();
            $result['data'] = $post;
            $result['status'] = TRUE;
            $result['message']="Guardado con exito";
        }else{
            //print_r($result['status']);
            //die();
            $result['status'] = FALSE;
            $result['message']="ERROR";
        }
        return $this->jsonResponse($result);
        }
    }
    public function catusuariosAction()
    {
        $result = $this->UsuarioModel->getUsuarios();
        $usuarios = $result['data'];
        $content['usuarios'] = $usuarios;
       
        return $this->render('catusuariosBundle:Default:catusuarios.html.twig', array('content' => $content));
    }

    public function eliminarUsuarioAction(Request $request){
        $post = $request->request->all();
        $data = array(
            "idusuario"=> "'" . $post["idusuario"] . "'"
        );
        //print_r($data);
        //die();
        $result = $this->UsuarioModel->eliminarUsuario($data);
        if ($result['status']) {
            $result['data'] = $post;
            $result['status'] = TRUE;
            $result['message']="Eliminado con exito";
        }else{
            $result['status'] = FALSE;
            $result['message']="ERRORRRR";
        }
        return $this->jsonResponse($result);
        
        
    }

    public function editarUsuarioAction(Request $request){
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
    $id = array(
        "idusuario"=> "'" .$post["idusuario"]."'");
        print_r($id);
        die();
    $result = $this->UsuarioModel->editarUsuario($data,$id);
   
    if ($result['status']) {
        $result['data'] = $post;
        $result['status'] = TRUE;
        $result['message']="Guardado con exito";
    }else{
        print_r($result["data"]);
            die();
        $result['status'] = FALSE;
        $result['message']="ERROR";
    }
    return $this->jsonResponse($result);
    
    
}
}
