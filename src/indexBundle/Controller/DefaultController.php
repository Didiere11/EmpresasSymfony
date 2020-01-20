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
        $user = $profile->getData();


        $result = $this->EmpresaModel->getEmpresas();
        $empresas = $result['data'];
        $content['empresas'] = $empresas;
        $content['user'] = $user;
       
        return $this->render('indexBundle:Default:index.html.twig', array('content' => $content));
    }
}
