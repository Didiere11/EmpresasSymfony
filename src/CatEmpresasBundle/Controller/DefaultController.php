<?php

namespace CatEmpresasBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function catempresasAction()
    {
        return $this->render('CatEmpresasBundle:Default:catempresas.html.twig');
    }
}
