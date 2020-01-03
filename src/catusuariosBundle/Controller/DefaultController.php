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
        //print_r($post);
        //die();
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
    public function catusuariosAction()
    {
        $result = $this->UsuarioModel->getUsuarios();
        $usuarios=$result['data'];
        return $this->render('catusuariosBundle:Default:catusuarios.html.twig', array('usuarios'=>$usuarios));
    }

    public function deleteUsuarioAction(Request $request){
        if($request->getMethod()== 'POST'){
            $post = $request->request->all();
            $result = $this->UsuarioModel->deleteUsuario($post);
            if($result['status'])
                return new JsonResponse(array('status'=>TRUE, 'data'=>$post));
            else
                return new JsonResponse(array('status'=>FALSE, 'data'=>''));
        }
        return $this->render('catusuariosBundle:Default:catusuarios.html.twig', array('usuarios'=>$usuarios));
    }
}
