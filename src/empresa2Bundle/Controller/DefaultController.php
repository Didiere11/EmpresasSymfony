<?php

namespace empresa2Bundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use Symfony\Component\HttpFoundation\Request;

class DefaultController extends Controller
{
    protected $SQLPrueba;

    public function __construct() {
        $this->SQLPrueba = new SQLModel();
       
    }

    public function indexAction(Request $request)
    {

        return $this->render('empresa2Bundle:Default:index.html.twig');
    }
    public function loginAction(Request $request)
    {
        if ($request->getMethod() == 'POST') {
            $post = $request->request->all();
            $query = 'SELECT correo,contraseña FROM usuario';
            $query .= ' WHERE correo= ' ."'" .$post["correo"]."'";
            $query .= ' AND contraseña=' ."'".$post['contra']."'";
            $result = $this->SQLPrueba->executeQuery($query);
           /*if ($result['data'] == null) {
               print_r('no entra');
                die();
             }else{
                print_r('si entra');
                die();
                 
             }*/
          // print_r($result);
           //die();
        }
        return $this->render('empresa2Bundle:Default:login.html.twig');
    }
}
