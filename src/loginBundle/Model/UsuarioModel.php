<?php

namespace loginBundle\Model;

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
    public function insertUsuario($data){
        $result = $this->SQLModel->insertIntoTable('usuario',$data,'idusuario');
        return $result;
    }
}