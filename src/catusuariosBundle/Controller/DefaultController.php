<?php

namespace catusuariosBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function catusuariosAction()
    {
        return $this->render('catusuariosBundle:Default:catusuarios.html.twig');
    }
}
