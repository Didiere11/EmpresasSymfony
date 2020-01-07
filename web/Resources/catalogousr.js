$(init);
var table = null;
var usuarios = null;
var tr = null;
$(document).ready(function () {
    $('.sidenav').sidenav();
    $("#frm-content").serialize();
});
function init() {
    table = $("#usr").DataTable({
        "aLengthMenu": [[10, 25, 50, 75, 100], [10, 25, 50, 75, 100]],
        "iDisplayLength": 15
    });//definiendo las caracteristicas del datatable 
    // eliminar
    $(document).on("click", '.delete', function () {
        $tr = $(this).closest('tr');
        tr = $tr;
        var idusuario = $(this).attr("data-id");
        $.ajax({
            type: "post",
            url: eliminaUsuario,
            dataType: 'json',
            data: { 'idusuario': idusuario },
            success: function (result) {
                if (result['status']) {
                    table.row($tr).remove().draw();
                    M.toast({ html: 'Usuario eliminado', classes: 'rounded blue lighten-2' });
                } else {
                    M.toast({ html: 'Usuario no eliminado', classes: 'rounded blue lighten-2' });

                }
            }
        });
        //editar
    });

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    $("#modalReg").modal();
    validateform();

    $("#add-record").on("click", function () {
        $("#nomusuario").val('');
        $("#correousuario").val('');
        $("#pwdusuario").val('');
        $("#domusuario").val('');
        $("#tipousr").val(1);
        $("#modalReg").modal('open');
        $("#nomusuario").focus();
    });

    $("#guardar").on("click", function () {
        $("#frmUsr").submit();

    });
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
    $(document).on("click", '.edit', function(){
        var idusuario = $(this).attr("data-id");
        var nombre = $(this).attr("data-nomusuario");
        var correo = $(this).attr("data-correousuario");
        var pwd = $(this).attr("data-pwdusuario");
        var domicilio = $(this).attr("data-domusuario");
        var tipousr = $(this).attr("data-tipousr");
        $("#idusuario").val(idusuario);
        $('#nomusuario').val(nombre);
        $('#correousuario').val(correo);
        $("#pwdusuario").val(pwd);
        $("#domusuario").val(domicilio);
        $("#tipousr").val(tipousr);
        $('#modalReg').modal('open');
        $('#nomusuario').focus();           
    }); 
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
function validateform() {
    $("#frmUsr").validate({
        rules: {
            'nomusuario': { required: true, minlength: 4, maxlength: 120 },
            'correousuario': { required: true, email: true, minlength: 4, maxlength: 120 },
            'pwdusuario': { required: true, minlength: 4, maxlength: 40 },
            'domusuario': { required: true, minlength: 4, maxlength: 250 },
        },

        messages: {
            'nomusuario': { required: 'Ingresar el nombre del usuario', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 120 caracteres' },
            'correousuario': { required: 'Ingresar el correo del usuario', email: 'Ingrese una direccion de correo valida', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 120 caracteres' },
            'pwdusuario': { required: 'Ingresar la contraeña del usuario', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 40 caracteres' },
            'domusuario': { required: 'Ingresar el domicilio del usuario', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 250 caracteres' },
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

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------

function saveClick() {
    var id = $("#idusuario").val();
    if (id > 0) {
        var urls =  editarUsuario;
    }
    else {
        var urls = insertaUsuario;
    }
    $.ajax({
        type: "post",
        url: urls,
        dataType: 'json',
        data: $("#frmUsr").serialize(),
        success: function (response) {
            if (response['status'] == 1) {
                $("#nomusuario").val($("#nomusuario").val());
                M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
                reset();
                $("#modalReg").modal('close');
                setRow(response['data'], 'insert');
            }
            else {
                M.toast({ html: 'Error al Registrar Usuario', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function setRow(data, action) {
    if (action == 'insert') {
        var row = table.row.add([
            data.nomusuario,
            data.correousuario,
            data.pwdusuario,
            data.domusuario,
            data.tipousr,
            '<i class="material-icons edit" data-id="' + data.idusuario + '" data-nomusuario"' + data.nomusuario + '" data-correousuario"' + data.correousuario + '" data-pwdusuario"' + data.pwdusuario + '"  data-domusuario"' + data.domusuario + '" data-tipousr"' + data.idtipousr + '">create</i>' +
            '<i class="material-icons delete" data-id="' + data.idusuario + '">delete_forever</i>'
        ]).draw().node();
        $(row).attr('data-id', data.idusuario);
        usuarios[data.idusuario] = {
            "data-id": data.idusuario,
            "data-nomusuario": data.nomusuario,
            "data-correousuario": data.correousuario,
            "data-pwdusuario": data.pwdusuario,
            "data-domusuario": data.domusuario,
            "data-tipousr":data.idtipousr,
        }
    }//Fin primer if
    if (action == 'delete') {
        console.log("delete");

        table.row('#' + data.idusuario).remove.draw();
    }//fin segundo if
}//fin setRow
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function reset() {
    $("#nomusuario").val('');
    $("#correousuario").val('');
    $("#pwdusuario").val('');
    $("#domusuario").val('');
    $("#tipousr").val(1);
}
