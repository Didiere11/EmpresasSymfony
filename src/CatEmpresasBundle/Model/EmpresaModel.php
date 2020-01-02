<?php

namespace CatEmpresasBundle\Model;

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
    public function insertEmpresa($data){
        $result = $this->SQLModel->insertIntoTable('empresas',$data,'idempresa');
        return $result;
    }
}