<?php

namespace CatEmpresasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use CatEmpresasBundle\Model\EmpresaModel;


class DefaultController extends Controller
{
    protected $EmpresaModel;
    public function __construct() {
        $this->EmpresaModel = new EmpresaModel();
     }
    
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }

    public function insertarEmpresaAction(Request $request){
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            $post = $request->request->all();     
        $data = array(
            "nomempresa"=> "'" . $post["nomempresa"] . "'",
            "dirempresa"=> "'" . $post["dirempresa"] . "'",
            "correoempresa"=> "'" . $post["correoempresa"] . "'",
            "descripempresa"=> "'" . $post["descripempresa"] . "'",
            "telefonoempresa"=> "'" . $post["telefonoempresa"] . "'"
        );
        //print_r($data);
        //die();
        $result = $this->EmpresaModel->insertEmpresa($data);
        
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
    public function editarEmpresaAction(Request $request){
            //extraccion de parametros
        $post = $request->request->all();    
        
       // print_r($id);
        //die();
        $data = array(
            "nomempresa"=> "'" . $post["nomempresa"] . "'",
            "dirempresa"=> "'" . $post["dirempresa"] . "'",
            "correoempresa"=> "'" . $post["correoempresa"] . "'",
            "descripempresa"=> "'" . $post["descripempresa"] . "'",
            "telefonoempresa"=> "'" . $post["telefonoempresa"] . "'"
        );
        $id = array(
            "idempresa"=> "'" .$post["idempresa"]."'");
        $result = $this->EmpresaModel->editarEmpresa($data,$id);
       
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
    public function eliminarEmpresaAction(Request $request){
        $post = $request->request->all();
        $data = array(
            "idempresa"=> "'" . $post["idempresa"] . "'"
        );
        //print_r($data);
        //die();
        $result = $this->EmpresaModel->eliminarEmpresa($data);
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
    public function catempresasAction(Request $request){
        $result = $this->EmpresaModel->getEmpresas();
        $empresa = $result['data'];
        $content['empresa'] = $empresa;
       
        return $this->render('CatEmpresasBundle:Default:catempresas.html.twig', array('content' => $content));
    }
}