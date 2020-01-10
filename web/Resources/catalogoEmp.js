$(init);
var table = null;
var empresas = null;
var tr = null;
$(document).ready(function () {
    $('.sidenav').sidenav();
});
function init(){
    table = $("#empre").DataTable({
        "aLengthMenu": [[10, 25, 50, 75, 100], [10, 25, 50, 75, 100]],
        "iDisplayLength": 15
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
    table.on('click', '.edit', function () {
        $tr = $(this).closest('tr');
        
    });
    $(document).on("click", '.edit', function(){
        var IdEmpresa = $(this).attr("data-id");
        var nombre = $(this).attr("data-nom");
        var direccion = $(this).attr("data-dir");
        var correo = $(this).attr("data-corr");
        var descripcion = $(this).attr("data-des");
        var telefono = $(this).attr("data-tel");
        $("#idempresa").val(IdEmpresa);
        $('#nomempresa').val(nombre);
        $('#dirempresa').val(direccion);
        $("#correoempresa").val(correo);
        $("#descripempresa").val(descripcion);
        $("#telefonoempresa").val(telefono);
        $('#modalRegistro').modal('open');
        $('#dirempresa').focus();
        $("#correoempresa").focus();
        $("#descripempresa").focus();
        $("#telefonoempresa").focus();
        $('#nomempresa').focus();           
    });
    // clic del boton de guardar
    $('#guardar').on("click",function(){
        validateForm();
        $('#frm-registro').submit();
    });     
}
 //asignan las reglas
function validateForm(){
    $('#frm-registro').validate({
        rules: {
            'nomempresa': {  required: true, minlength: 4, maxlength: 120 },
            'dirempresa': { required: true, minlength: 4, maxlength: 120 },
            'correoempresa': { required: true, email: true, minlength: 4, maxlength: 120 },
            'descripempresa': { required: true, minlength: 4, maxlength: 120 },
            'telefonoempresa': { required: true, number:true,minlength: 10, maxlength: 10 },
        },

        messages: {
            'nomempresa': { required: 'Ingresar el nombre de la empresa', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 120 caracteres'},
            'dirempresa': { required: 'Ingresar la direccion de la Empresa' , minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 120 caracteres' },
            'correoempresa': { required: 'Ingresar el correo del Empresa', email: 'Ingrese una direccion de correo valida', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 120 caracteres' },
            'descripempresa': {  required: 'Ingresar la descripcion de la empresa', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 250 caracteres' },
            'telefonoempresa': { required: 'ingresar numero telefonico',number: 'Ingresar puros caracteres de tipo numerico', minlength: 'ingresar numero telefonico a 10 caracteres', maxlength: 'Ingresar numero telefonico a 10 caracteres' }
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
// Envia los datos del formulario de registro a la base de datos para insertar o editar depedniendo la accion
function saveData(){
        var id = $("#idempresa").val();

        if (id > 0) {
            var urls= editaEmpresa; 
        }
        else{
            var urls= insertarEmpresa; 
        }
        $.ajax({
            type:"post",
            url: urls,
            dataType:'json',
            data: $("#frm-registro").serialize(),
            success: function(response){
                if (response['status']==1){
                   $("#nomempresa").val($("#nomempresa").val());
                    M.toast({html: 'Registro exitoso', classes: 'rounded', displayLength: 4000});
                    limpiar();
                    $("#modalRegistro").modal('close');
                    table.row($tr).remove().draw();
                    setRow(response['data'], 'insert');
                    
                }
                else{
                    M.toast({html: 'Error al Registrar Usuario', classes: 'rounded', displayLength: 4000});
                }
            } 
        });  
    }

$(document).on("click", '.delete', function(){
    $tr = $(this).closest('tr');
    tr = $tr;
    var idempresa = $(this).attr("data-id");
    $("#idempresa").val(idempresa);
    $.ajax({
        type: "post",
        url: eliminaEmpresa,
        dataType: 'json',
        data: { 'idempresa': idempresa },
        success: function (result) {
            if (result['status']) {
                    table.row($tr).remove().draw();
                    M.toast({ html: 'Empresa Eliminada', classes: 'rounded blue lighten-2' });
                } else {
                    M.toast({ html: 'Error al eliminar empresa', classes: 'rounded blue lighten-2' });
                }
        } 
    });

});
function setRow(data, action) {
    console.log(action);
    if (action == 'insert') {
        console.log("insert");
        var row = table.row.add([
            data.idempresa,
            data.nomempresa,
            data.dirempresa,
            data.correoempresa,
            data.descripempresa,
            data.telefonoempresa,
            '<i class="material-icons edit" data-id="' + data.idempresa + '" data-nom="' +  data.nomempresa + '"data-dir="' + data.dirempresa + '" data-corr="' + data.correoempresa + '" data-des="' + data.descripempresa + '" data-tel="' + data.telefonoempresa + '">create</i>' +
            '<i class="material-icons delete" data-id="' + data.idempresa + '">delete_forever</i>'
        ]).draw().node();
        $(row).attr('data-id', data.idempresa);
        empresas[data.idempresa] = {
            "data-id":data.idempresa,
            "data-nom": data.nomempresa,
            "data-dir": data.dirempresa,
            "data-corr": data.correoempresa,
            "data-des": data.descripcion,
            "data-tel":data.telefonoempresa,
        }
        alert(row);
    }
    if (action == 'delete') {
        console.log("delete");

        table.row('#' + data.idempresa).remove.draw();
    }
}

function limpiar(){
        $("#nomempresa").val('');
        $("#dirempresa").val('');
        $("#correoempresa").val('');
        $("#descripempresa").val('');
        $("#telefonoempresa").val('');
}
