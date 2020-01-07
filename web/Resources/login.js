$(init);
function init(){

    //console.log(urlvalidausr);

    // Inicializa el NavBar
    $(document).ready(function(){
        $('.sidenav').sidenav();
    });

    //Iniciliza la ventana Modal y la Validación
    $("#modalReg").modal();
    validateForm();

    // Clic del boton circular para validar correo y contraseña
    $("#un_lock").on("click",function(){
        $('#frm-acceso').submit();
    });

    // Clic del boton circular Agregar Registro Nuevo formulario modal
    $("#add_record").on("click",function(){
        $("#correousuario").val('');
        $("#nomusuario").val('');
        $("#pwdusuario").val('');
        $("#domusuario").val('');
        $("#modalReg").modal('open');
        $("#nomusuario").focus();
        
    });
    
    // clic del boton de guardar
    $('#guardar').on("click",function(){
        $('#frmUsr').submit();
    });
       
}
//valida el formulario y el login ademas
 //asignan las reglas
function validateForm(){
    $('#frm-acceso').validate({
        rules: {
            correo:{required:true, email:true, minlength:4, maxlength:120},
            contra:{required:true, minlength:4, maxlength:32},
        },
        messages: {
            correo:{required:"No puedes dejar este campo vacío",email:"Se requiere correo valido",minlength:"Debes ingresar al menos 4 caracteres", maxlength:"No puedes ingresar más de 120 caracteres"},
            contra:{required:"No puedes dejar este campo vacío",minlength:"Debes ingresar al menos 4 caracteres", maxlength:"No puedes ingresar más de 32 caracteres"},
        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function(error, element){
            error.insertAfter(element)                
        },
        submitHandler: function(form){
            validaData();
        }
    });
    $("#frmUsr").validate({
        rules: {
            'nomusuario': { required: true, minlength:4, maxlength:120 },
            'correousuario': { required: true, email:true, minlength:4, maxlength:120},
            'pwdusuario': { required: true, minlength:4, maxlength:40},
            'domusuario': { required: true, minlength:4, maxlength:250},      
        },

        messages: {
            'nomusuario': { required: 'Ingresar el nombre del usuario', minlength:'ingrese minimo 4 caracteres', maxlength:'Ingrese maximo 120 caracteres' },
            'correousuario': { required: 'Ingresar el correo del usuario', email:'Ingrese una direccion de correo valida', minlength:'ingrese minimo 4 caracteres', maxlength:'Ingrese maximo 120 caracteres' },
            'pwdusuario': { required: 'Ingresar la contraeña del usuario', minlength:'ingrese minimo 4 caracteres', maxlength:'Ingrese maximo 40 caracteres' },
            'domusuario': { required: 'Ingresar el domicilio del usuario', minlength:'ingrese minimo 4 caracteres', maxlength:'Ingrese maximo 250 caracteres'  },
        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function (error, element) {
            error.insertAfter(element)
        },
        submitHandler: function (form) {
            saveClick();
        }
    });

}
// Envia los datos del formulario de registro a la base de datos
function saveClick() {
    $.ajax({
        type:"post",
        url:urllogin,
        dataType:'json',
        data: $("#frmUsr").serialize(),
        success: function(response){
            if (response['status']==1){
               $("#nomusuario").val($("#nomusuario").val());
                M.toast({html: 'Registro exitoso', classes: 'rounded', displayLength: 4000});
                $("#modalReg").modal('close');
            }
            else{
                M.toast({html: 'Error al Registrar Usuario', classes: 'rounded', displayLength: 4000});
            }
        }
    });
}//fin clic

function validaData(){
    $.ajax({
        type: "post", // podría ser get, post, put o delete.
        url: validacion, // url del recurso
        dataType: 'json', // formato que regresa la respuesta
        data: $("#frm-acceso").serialize(), // datos a pasar al servidor, en caso de necesitarlo
        success: function(response){
            if (response['status']>=1){
                if (response['status'] == 1) {
                    window.location.href='http://127.0.0.1/symfony/EmpresasSymfony/web/app_dev.php/'
                    M.toast({html: 'Acceso Permitido', classes: 'rounded', displayLength: 4000});
                }else if (response['status']==2) {
                    window.location.href='http://127.0.0.1/symfony/EmpresasSymfony/web/app_dev.php/catempresas'
                    M.toast({html: 'Acceso Permitido', classes: 'rounded', displayLength: 4000});
                }
                //print_r(resultado);
                //die();
            }
            else{
                M.toast({html: 'Acceso Denegado', classes: 'rounded', displayLength: 4000});
            }
        }
    });
}