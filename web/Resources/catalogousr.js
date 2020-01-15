$(init);
var table = null;
var usuario = null;
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
    //------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    table.on('click', '.delete', function () {
        $tr = $(this).closest('tr');
        tr = $tr;
        var idusuario = $(this).attr("data-id");
        $("#modalconfirmacion").modal({ dismissible: false }).modal('open');
        $('#si').on("click", function () {
            $.ajax({
                type: "post",
                url: eliminaUsuario,
                datatype: 'json',
                data: { 'idusuario': idusuario },
                success: function (respuesta) {
                    if (respuesta['status']) {
                        table.row($tr).remove().draw();
                        M.toast({ html: 'Usuario eliminado', classes: 'rounded red lighten-2' });
                        $("#modalconfirmacion").modal('close');
                    } else
                        M.toast({ html: 'Usuario no eliminado', classes: 'rounded red lighten-2' });
                    $("#modalconfirmacion").modal('close');
                }
            });
        });
    });

    $('#no').on("click", function () {
        $("#modalconfirmacion").modal('close');
    });

    $("#modalReg").modal({ dismissible: false });
    validateform();

    //-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

    $("#add-record").on("click", function () {
        $("#nomusuario").val('');
        $("#correo").val('');
        $("#contraseña").val('');
        $("#domicilio").val('');
        $("#tipousr").val(1);
        $('#tipousr').formSelect();
        $("#modalReg").modal('open');
        $("#nomusuario").focus();

    });

    $("#cancelar").on("click", function () {
        $("#idusuario").val('');
        $("#nomusuario").val('');
        $("#correo").val('');
        $("#contraseña").val('');
        $("#domicilio").val('');
        $("#tipousr").val(1);
        $('#tipousr').formSelect();
        $("#modalReg").modal('close');

    });

    $("#guardar").on("click", function () {
        $("#frmUsr").submit();

    });

    //---------------------------------------------------------------------------------------------------------------------------------------------------------------------

    table.on('click', '.edit', function () {
        $tr = $(this).closest('tr');
    });

    $(document).on("click", '.edit', function () {
        var idusuario = $(this).attr("data-id");
        var nombre = $(this).attr("data-nom");
        var correo = $(this).attr("data-corr");
        var pwd = $(this).attr("data-cont");
        var domicilio = $(this).attr("data-dom");
        var tipousr = $(this).attr("data-tipo");
        $("#idusuario").val(idusuario);
        $('#nomusuario').val(nombre);
        $('#correo').val(correo);
        $("#contraseña").val(pwd);
        $("#domicilio").val(domicilio);
        //$("#tipousr").val(tipousr);
        $('#tipousr').formSelect();
        $('#modalReg').modal('open');
        $('#correo').focus();
        $("#contraseña").focus();
        $("#domicilio").focus();
        $('#nomusuario').focus();
    });
}
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------
function validateform() {
    $("#frmUsr").validate({
        rules: {
            'nomusuario': { required: true, minlength: 4, maxlength: 120 },
            'correo': { required: true, email: true, minlength: 4, maxlength: 120 },
            'contraseña': { required: true, minlength: 4, maxlength: 40 },
            'domicilio': { required: true, minlength: 4, maxlength: 250 },
        },

        messages: {
            'nomusuario': { required: 'Ingresar el nombre del usuario', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 120 caracteres' },
            'correo': { required: 'Ingresar el correo del usuario', email: 'Ingrese una direccion de correo valida', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 120 caracteres' },
            'contraseña': { required: 'Ingresar la contraeña del usuario', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 40 caracteres' },
            'domicilio': { required: 'Ingresar el domicilio del usuario', minlength: 'ingrese minimo 4 caracteres', maxlength: 'Ingrese maximo 250 caracteres' },
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
        var urls = editarUsuario;
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
                if (urls == editarUsuario) {
                    $("#nomusuario").val($("#nomusuario").val());
                    M.toast({ html: 'Registro actualizado', classes: 'rounded green lighten-2', displayLength: 4000 });
                    reset();
                    $("#modalReg").modal('close');
                    table.row($tr).remove().draw();
                    setRow(response['data'], 'insert');
                } else {
                    $("#nomusuario").val($("#nomusuario").val());
                    M.toast({ html: 'Registro exitoso', classes: 'rounded green lighten-2', displayLength: 4000 });
                    reset();
                    $("#modalReg").modal('close');
                    setRow(response['data'], 'insert');
                }
            }
            else {
                M.toast({ html: 'Error al Registrar Usuario', classes: 'rounded red lighten-2', displayLength: 4000 });
            }
        }
    });
}
//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function setRow(data, action) {
    var tipousr = $(this).attr("data-tipo");
    console.log(action);
    if (action == 'insert') {
        console.log("insert");
        var row = table.row.add([
            // data.idusuario,
            data.nomusuario,
            data.correo,
            data.contraseña,
            data.domicilio,
            data.tipousr,
            '<i class="material-icons edit" data-id="' + data.idusuario + '" data-nom="' + data.nomusuario + '"data-corr="' + data.correo + '" data-cont="' + data.contraseña + '" data-dom="' + data.domicilio + '" data-tipo="' + data.idtipousr + '">create</i>' +
            '<i class="material-icons delete" data-id="' + data.idusuario + '">delete_forever</i>'
        ]).draw().node();
        $(row).attr('data-id', data.idusuario);
        usuario[data.idusuario] = {
            "data-id": data.idusuario,
            "data-nom": data.nomusuario,
            "data-corr": data.correo,
            "data-cont": data.contraseña,
            "data-dom": data.domicilio,
            "data-tipo": data.idtipousr,
        }
        alert(row);
    }//Fin primer if
    if (action == 'delete') {
        console.log("delete");


        table.row('#' + data.idusuario).remove.draw();
    }//fin segundo if
}//fin setRow
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
function reset() {
    $("#nomusuario").val('');
    $("#idusuario").val('');
    $("#correo").val('');
    $("#contraseña").val('');
    $("#domicilio").val('');
    $("#tipousr").val(1);
    $('#tipousr').formSelect();
    $("#modalReg").modal('close');
}