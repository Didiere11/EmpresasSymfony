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
    //console.log(urlvalidausr);

    // Inicializa el NavBar
    $(document).ready(function(){
        $('.sidenav').sidenav();
        $("#frm-content").serialize();
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
                    M.toast({ html: 'Usuario eliminado', classes: 'rounded blue lighten-2' });
                } else {
                    M.toast({ html: 'Usuario no eliminado', classes: 'rounded blue lighten-2' });
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


