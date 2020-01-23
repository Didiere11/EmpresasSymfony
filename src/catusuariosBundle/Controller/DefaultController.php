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

            $post['nomusuario']=trim($post["nomusuario"]); 
         //print_r($post);
          //die();
            
        $data = array(
            //--en BD-----------------en formulario
            "nomusuario"=> "'" . $post["nomusuario"]. "'",
            "correo"=> "'" . $post["correo"] . "'",
            "contraseña"=> "'" . $post["contraseña"] . "'",
            "domicilio"=> "'" . $post["domicilio"] . "'",
            "idtipousr"=> "'" . $post["tipousr"] . "'"
        );
       
        
         
        $result = $this->UsuarioModel->insertUsuario($data);
       
        $dataa = array(
            "idtipousr"=> "'" . $post["tipousr"] . "'"
        );
        $tipo = $this->UsuarioModel->getTipo($dataa);
        $post['idusuario']=$result["data"][0]['idusuario'];
        $post['tipousr']=$tipo["data"][0]['tipousr'];
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
        $profile = $this->getUser();
        $user = $profile->getData();

        $result = $this->UsuarioModel->getUsuarios();
        $tipo = $this->UsuarioModel->getTipoUsr();
        
        $tipousuario = $tipo['data'];
        $usuarios = $result['data'];
        $content['tipousuario'] = $tipousuario;
        $content['usuarios'] = $usuarios;
        $content['user'] = $user;
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
        "correo"=> "'" . $post["correo"] . "'",
        "contraseña"=> "'" . $post["contraseña"] . "'",
        "domicilio"=> "'" . $post["domicilio"] . "'",
        "idtipousr"=> "'" . $post["tipousr"] . "'"
    );
    
    $id = array(
        "idusuario"=> "'" .$post["idusuario"]."'");
    $result = $this->UsuarioModel->editarUsuario($data,$id);
    $dataa = array(
        "idtipousr"=> "'" . $post["tipousr"] . "'"
    );
    $tipo = $this->UsuarioModel->getTipo($dataa);
    $post['idusuario']=$result["data"][0]['idusuario'];
    $post['tipousr']=$tipo["data"][0]['tipousr'];
   
    if ($result['status']==1) {
        
        $result['data'] = $post;
        //print_r($post);
        //die();
        $result['status'] = TRUE;
        $result['message']="Guardado con exito";
    }else{
        $result['status'] = FALSE;
        $result['message']="ERROR";
    }
    return $this->jsonResponse($result);
    
    
}
}
