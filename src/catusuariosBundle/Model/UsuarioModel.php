<?php

namespace catusuariosBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class UsuarioModel {
    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();       
    }
    public function getUsuarios(){
        $result = $this->SQLModel->selectFromTable('usuario');
        return $result;
    }
}