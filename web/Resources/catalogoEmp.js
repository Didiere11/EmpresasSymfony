$(init);
function init(){

    //console.log(urlvalidausr);

    // Inicializa el NavBar
    $(document).ready(function(){
        $('.sidenav').sidenav();
    });

    //Iniciliza la ventana Modal y la Validación
    $("#modalRegistro").modal();
    validateForm();

    // Clic del boton circular para validar correo y contraseña

    // Clic del boton circular Agregar Registro Nuevo formulario modal
    $("#add-record").on("click",function(){
        $("#nomempresa").val('');
        $("#dirempresa").val('');
        $("#correoempresa").val('');
        $("#descripempresa").val('');
        $("#telefonoempresa").val('');
        $("#modalRegistro").modal('open');
        $("#nomempresa").focus();

        
    });
    
    // clic del boton de guardar
    $('#guardar').on("click",function(){
        $('#frm-registro').submit();
    });
       
}
//valida el formulario y el login ademas
 //asignan las reglas
function validateForm(){
    $('#frm-registro').validate({
        rules: {
            'nomempresa': { required: true },
            'dirempresa': { required: true },
            'correoempresa': { required: true },
            'descripempresa': { required: true },
            'telefonoempresa': { required: true },
        },

        messages: {
            'nomempresa': { required: 'Ingresar el nombre de la empresa' },
            'dirempresa': { required: 'Ingresar la direccion de la Empresa' },
            'correoempresa': { required: 'Ingresar el correo de la empresa' },
            'descripempresa': { required: 'Ingresar una brebe descripcion de la empresa' },
            'telefonoempresa': { required: 'ingresar numero telefonico' }
        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function(error, element){
            error.insertAfter(element)                
        },
        submitHandler: function(form){
            saveData();
        }
    });

}
// Envia los datos del formulario de registro a la base de datos
function saveData(){
    //var sURL = "actRegistroGuarda.php";
    $.ajax({
        type:"post",
        url: insertarEmpresa,
        dataType:'json',
        data: $("#frm-registro").serialize(),
        success: function(response){
            if (response['status']==1){
               $("#nomempresa").val($("#nomempresa").val());
                M.toast({html: 'Registro exitoso', classes: 'rounded', displayLength: 4000});
                $("#modalRegistro").modal('close');
                $("#contra").focus();
            }
            else{
                M.toast({html: 'Error al Registrar Usuario', classes: 'rounded', displayLength: 4000});
            }
        }
    });
}

