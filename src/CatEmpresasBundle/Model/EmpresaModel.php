<?php
namespace CatEmpresasBundle\Model;
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
    public function insertarEmpresas($data){
        $result = $this->SQLModel->insertIntoTable('empresa',$data,'idempresa');

        return $result;
    }
    public function eliminarEmpresas($post){
        $result = $this->SQLModel->deleteFromTable('imagenes',$post);
        $result = $this->SQLModel->deleteFromTable('empresa',$post);

        return $result;
    }
    public function insertImagen($post){
        $result = $this->SQLModel->InsertintoTable('imagenes',$post);

        return $result;
    }
    public function actualizarImagenes($post,$where){

        $result = $this->SQLModel->updateFromTable('imagenes',$post,$where);
        return $result;
    }
    public function actualizarEmpresas($data,$where){
         $result = $this->SQLModel->updateFromTable('empresa',$data,$where);
         return $result;
     }
}