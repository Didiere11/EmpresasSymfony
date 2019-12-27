<?php

namespace EmpresasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="Empresas_home")
     */
    public function indexAction()
    {
        return $this->render('EmpresasBundle:Default:index.html.twig');
    }
    /**
     * @Route("/login", name="Empresas_login")
     */
    public function loginAction()
    {
        return $this->render('EmpresasBundle:Default:login.html.twig');
    }
      /**
     * @Route("/catalogempresas", name="Empresas_catalogempresas")
     */
    public function catalogempresasAction()
    {
        return $this->render('EmpresasBundle:Default:catalogempresas.html.twig');
    }
}
