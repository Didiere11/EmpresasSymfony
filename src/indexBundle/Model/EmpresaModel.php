<?php

namespace  indexBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class EmpresaModel {
    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();       
    }
    public function getEmpresas(){
        $fields = ' SELECT ';
        $fields .= ' e."idempresa",';
        $fields .= ' e."nombreempresa",';
        $fields .= ' e."direccionempresa",';
        $fields .= ' e."descripcionempresa",';
        $fields .= ' e."telefonoempresa", ';
        $fields .= ' e."correoempresa", ';
        $fields .= ' i."idempresa",';
        $fields .= ' i."formatoimagen",';
        $fields .= ' i."rutaimagen" ';
        $fields .= ' FROM "empresa" e ';
        $fields .= ' INNER JOIN "imagenes" i on  ';
        $fields .= ' e."idempresa" = i."idempresa" ';
        //print_r($fields);
        //die();
        $result = $this->SQLModel->executeQuery($fields);

        if (!($result['status'] && count($result['data']) > 0)) {
            return $result;
        }
        foreach ($result['data'] as $value) {
            $data[$value['idempresa']] = $value;
        }
        $result["data"] = $data;
        return $result;
    }
    public function insertarvista($data){
        $result = $this->SQLModel->insertIntoTable('vistas',$data,'idvista');
        return $result;
    }
}