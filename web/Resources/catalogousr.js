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
        $("#correo").val('');
        $("#contraseña").val('');
        $("#domicilio").val('');
        $("#tipousr").val(1);
        $('#tipousr').formSelect();
        $("#modalReg").modal('open');
        $("#nomusuario").focus();
    });

    $("#guardar").on("click", function () {
        $("#frmUsr").submit();

    });
//---------------------------------------------------------------------------------------------------------------------------------------------------------------------

table.on('click', '.edit', function () {
    $tr = $(this).closest('tr');
});

    $(document).on("click", '.edit', function(){
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
                table.row($tr).remove().draw();
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
    var tipousr = $(this).attr("data-tipo");
    console.log(action);
    if (action == 'insert') {
        console.log("insert");
        var row = table.row.add([
            data.idusuario,
            data.nomusuario,
            data.correo,
            data.contraseña,
            data.domicilio,
            data.tipousr,
            '<i class="material-icons edit" data-id="' + data.idusuario + '" data-nom="' +  data.nomusuario + '"data-corr="' + data.correo + '" data-cont="' + data.contraseña + '" data-dom="' + data.domicilio + '" data-tipo="' + data.idtipousr + '">create</i>' +
            '<i class="material-icons delete" data-id="' + data.idempresa + '">delete_forever</i>'
        ]).draw().node();
        $(row).attr('data-id', data.idempresa);
        usuario[data.idusuario] = {
            "data-id": data.idusuario,
            "data-nom": data.nomusuario,
            "data-corr":  data.correo,
            "data-cont": data.contraseña,
            "data-dom": data.domicilio,
            "data-tipo":data.idtipousr,
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
        $("#correo").val('');
        $("#contraseña").val('');
        $("#domicilio").val('');
        $("#tipousr").val(1);
        $('#tipousr').formSelect();
}
