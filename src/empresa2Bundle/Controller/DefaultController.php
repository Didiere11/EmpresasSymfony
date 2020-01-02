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

    public function indexAction(Request $request)
    {
        return $this->render('empresa2Bundle:Default:index.html.twig');
    }
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    public function loginAction(Request $request)
    {        //validacion de metodo
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            $post = $request->request->all();

            //validacion de usuarios
            $query = 'SELECT correo,contraseña FROM usuario';
            $query .= ' WHERE correo= ' ."'" .$post["correo"]."'";
            $query .= ' AND contraseña=' ."'".$post['contra']."'";
            $result = $this->SQLPrueba->executeQuery($query);
           
        }
        return $this->render('empresa2Bundle:Default:login.html.twig');
    }

    public function insertusrAction(Request $request){
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            $post = $request->request->all();
            $insert = 'INSERT INTO usuario ' ;
            $insert .= '(nomusuario,correo,contraseña,domicilio,idtipousr)';
            $insert .= 'VALUES ('."'".$post['nom']."'".','."'".$post['corr']."'".','."'".$post['pwd']."'".','."'".$post['dom']."'".',1)';
        
            $result = $this->SQLPrueba->executeQuery($insert);
        }
            //return jsonResponse($result);
            return $this->render('empresa2Bundle:Default:login.html.twig');
    }

   
   
}
