<?php

namespace empresa2Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use empresa2Bundle\Model\EmpresaModel;

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
    public function IndexAction(Request $request){
       
        return $this->render('empresa2Bundle:Default:index.html.twig');
    }
    public function insertarEmpresaAction(Request $request){
        $post = $request->request->all();
        print_r($post);
        die();
        $data = array(
            "nomempresa"=> "'" . $post["nomempresa"] . "'",
            "dirempresa"=> "'" . $post["dirempresa"] . "'",
            "correoempresa"=> "'" . $post["correoempresa"] . "'",
            "descripempresa"=> "'" . $post["descripempresa"] . "'",
            "telefonoempresa"=> "'" . $post["telefonoempresa"] . "'"
        );
       
        $result = $this->EmpresaModel->insertEmpresa($data);
    }
    public function loginAction(Request $request){
        $result = $this->EmpresaModel->getEmpresas();
        $empresa = $result['data'];
        $content['empresa'] = $empresa;
       
        return $this->render('empresa2Bundle:Default:catalogempresas.html.twig', array('content' => $content));
    }

   
   
}
