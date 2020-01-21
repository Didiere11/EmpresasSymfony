<?php

namespace indexBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use indexBundle\Model\EmpresaModel;

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
    public function indexAction(Request $request){
       
        $profile = $this->getUser();
            
        if($profile != ''){
        $user = $profile->getData();
        $content['user'] = $user;
        }
            $result = $this->EmpresaModel->getEmpresas();
            $empresas = $result['data'];
            $content['empresas'] = $empresas;
            
        return $this->render('indexBundle:Default:index.html.twig', array('content' => $content));
    }
    public function insertarvistaAction(Request $request){
        $profile = $this->getUser();
        $user = $profile->getData();
        $content['user'] = $user;
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
        $post = $request->request->all();
        $data = array(
            "idempresa"=> "'" . $post["idempresa"] . "'",
            "correo"=> "'" . $content['user']['correo'] . "'",
        );
        
        $result = $this->EmpresaModel->insertarvista($data);
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
    }
}
