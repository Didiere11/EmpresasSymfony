<?php

namespace  indexBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class EmpresaModel {
    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();       
    }
    public function getEmpresas(){
        $result = $this->SQLModel->selectFromTable('empresas');
        return $result;
    }
    
}