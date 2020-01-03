<?php

namespace catusuariosBundle\Model;

use Utilerias\SQLBundle\Model\SQLModel;

class UsuarioModel {
    protected $SQLModel;

    public function __construct() {
        $this->SQLModel = new SQLModel();       
    }
    //public function getUsuarios(){
      //  $result = $this->SQLModel->selectFromTable('usuario');
//return $result;
//}
public function getUsuarios(){
    $campos_select = array(
        'idusuario',
        'nomusuario',
        'correo',
        'contraseña',
        'domicilio',
    );
  //  $where = array(
    //    'nocontrol'->''
    //);
    $result = $this->SQLModel->selectFromTable('usuario',$campos_select);
    $data=array();
    foreach($result['data'] as $key=>$value){
        $data[$value['idusuario']]=$value;
    }
    $result['data']=$data;
    return $result;
}
    public function insertUsuario($data){
        $result = $this->SQLModel->insertIntoTable('usuario',$data,'idusuario');
        return $result;
    }
    public function deleteUsuario($post)
    {
        $where=array(
            'idusuario'=>$post['pk']
        );
        $result = $this->SQLModel->deleteFromTable('usuario', $where);
        return $result;
    }
}