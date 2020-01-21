<?php
namespace CatEmpresasBundle\Controller;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Utilerias\SQLBundle\Model\SQLModel;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use CatEmpresasBundle\Model\EmpresaModel;
class DefaultController extends Controller
{
protected $EmpresaModel;
    public function __construct() {
        $this->EmpresaModel = new EmpresaModel();
     }
    
    protected function jsonResponse($data) {
        $response = new Response(json_encode($data));
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
    public function insertarEmpresaAction(Request $request){
        if ($request->getMethod() == 'POST') {
            //extraccion de parametros
            $post = $request->request->all();  
        $data = array(
            "nomempresa"=> "'" . $post["nomempresa"] . "'",
            "dirempresa"=> "'" . $post["dirempresa"] . "'",
            "correoempresa"=> "'" . $post["correoempresa"] . "'",
            "descripempresa"=> "'" . $post["descripempresa"] . "'",
            "telefonoempresa"=> "'" . $post["telefonoempresa"] . "'"
        );

        $post =$request->request->all();
        $tmp = $_FILES['archivo']["tmp_name"];
        $tmp = file_get_contents($tmp);
        $base64 = base64_encode($tmp);
        $data_Empresas = array(
            "nombreempresa" => "'" . $post["nombre"] . "'",
            "direccionempresa" =>"'". $post["direccion"]."'",
            "descripcionempresa" =>"'". $post["descripcion"]."'",
            "telefonoempresa" => "'".$post["telefono"]."'",
            "correoempresa" => "'".$post["correo"]."'",

        );
        $result_Empresas = $this->EmpresaModel->insertarEmpresas($data_Empresas);
        $post['idempresa']=$result_Empresas["data"][0]['idempresa'];
        if ($result_Empresas['status']) {
            $data_img = array(
                "idempresa" => $result_Empresas["data"][0]["idempresa"] ,
                "formatoimagen" =>"'".  $_FILES['archivo']["type"]."'",
                "rutaimagen" =>"'".$base64."'",
            );
            $result = $this->EmpresaModel->insertImagen($data_img);
            $result['status']=true;
            $result['data']=$post;
            

        } else {
            $result_Empresas['status'] = FALSE;
            $result_Empresas['error'] = "Error";
        }
        return $this->jsonResponse($result);

    }
}
    public function editarEmpresaAction(Request $request){
        $post =$request->request->all();
       
        $tmp = $_FILES['archivo']["tmp_name"];
        $tmp = file_get_contents($tmp);
        $base64 = base64_encode($tmp);
        $data_Empresas = array(
            "nombreempresa" => "'" . $post["nombre"] . "'",
            "direccionempresa" =>"'". $post["direccion"]."'",
            "descripcionempresa" =>"'". $post["descripcion"]."'",
            "telefonoempresa" => "'".$post["telefono"]."'",
            "correoempresa" => "'".$post["correo"]."'",
         
        );
        $where=array("idempresa" => "'".$post["idempresa"]."'");

        $result_Empresas = $this->EmpresaModel->actualizarEmpresas($data_Empresas,$where);

        if ($result_Empresas['status']) {
            $data_img = array(
               
                "formatoimagen" =>"'".  $_FILES['archivo']["type"]."'",
                "rutaimagen" =>"'".$base64."'",
            );
            $result = $this->EmpresaModel->actualizarImagenes($data_img,$where);
            $result['status']=true;
            $result['data']=$post;

        } else {
            $result_Empresas['status'] = FALSE;
            $result_Empresas['error'] = "Error";
        }
        return $this->jsonResponse($result);


    }
    public function eliminarEmpresaAction(Request $request){
        $post =$request->request->all();
        $result = $this->EmpresaModel->eliminarEmpresas($post);

    if ($result['status']) {
                $result['data'] = $post;
                $result['status'] = TRUE;
                $result['message'] = "Elimidado con exito";
            } else {
                $result['status'] = FALSE;
                $result['error'] = "Error";
            }
            return $this->jsonResponse($result);
    }
    public function catempresasAction(Request $request){
        $profile = $this->getUser();
        $user = $profile->getData();

        $result = $this->EmpresaModel->getEmpresas();
        $empresas = $result['data'];
        $content['empresas'] = $empresas;
        $content['user'] = $user;
        return $this->render('CatEmpresasBundle:Default:catempresas.html.twig', array('content' => $content));
    }
    public function vistasAction(Request $request){
        $profile = $this->getUser();
        $user = $profile->getData();
        $result = $this->EmpresaModel->getVistas();
        $empresas = $result['data'];
        $content['empresas'] = $empresas;
        $content['user'] = $user;
        return $this->render('CatEmpresasBundle:Default:vistas.html.twig', array('content' => $content));
    }
    public function visitageneralAction(Request $request){
        $profile = $this->getUser();
        $user = $profile->getData();
        $result = $this->EmpresaModel->getVistaGeneral();
        $empresas = $result['data'];
        $content['empresas'] = $empresas;
        $content['user'] = $user;
        return $this->render('CatEmpresasBundle:Default:vistageneral.html.twig', array('content' => $content));
    }
}