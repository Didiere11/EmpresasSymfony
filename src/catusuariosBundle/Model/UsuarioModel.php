<?php

namespace catusuariosBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class UsuarioModel {
    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();       
    }
    public function getUsuarios(){
        $fields = ' SELECT ';
        $fields .= ' u."idusuario",';
        $fields .= ' u."nomusuario",';
        $fields .= ' u."correo",';
        $fields .= ' u."contraseña",';
        $fields .= ' u."domicilio", ';
        $fields .= ' u."idtipousr", ';
        $fields .= ' t."idtipousr",';
        $fields .= ' t."tipousr"';
        $fields .= ' FROM "usuario" u ';
        $fields .= ' INNER JOIN "tipousuario" t on  ';
        $fields .= ' u."idtipousr" = t."idtipousr" ';
        $result = $this->SQLModel->executeQuery($fields);
        return $result;
    }
    public function getTipoUsr(){
        $result = $this->SQLModel->selectFromTable('tipousuario');
        return $result;
    }
    public function getTipo($dataa){
        $result = $this->SQLModel->selectFromTable('tipousuario','tipousr',$dataa);
        return $result;
    }
    public function insertUsuario($data){
        $result = $this->SQLModel->insertIntoTable('usuario',$data,'idusuario');
        return $result;
    }
    public function eliminarUsuario($data){
        $result = $this->SQLModel->deleteFromTable('usuario',$data);
        
        return $result;
    }

    public function editarUsuario($data,$id){
    
        $result = $this->SQLModel->updateFromTable('usuario', $data, $id,'idusuario');
      
          return $result;
      }
}