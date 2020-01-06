<?php

namespace loginBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class UsuarioModel {
    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();       
    }
    public function getUsuarios($data){
        $result = $this->SQLModel->selectFromTable('usuario','correo,contraseña', $data);
        return $result;
    }
    public function insertUsuario($data){
        $result = $this->SQLModel->insertIntoTable('usuario',$data,'idusuario');
        return $result;
    }
}