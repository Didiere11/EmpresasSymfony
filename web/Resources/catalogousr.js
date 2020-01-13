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
               // alert('de verdad desea borrar el registro')
                if (result['status']) {
                    table.row($tr).remove().draw();
                    M.toast({ html: 'Registro eliminado', classes: 'rounded red lighten-2' });
                } else {
                    M.toast({ html: 'Registro no eliminado', classes: 'rounded red lighten-2' });

                }
            }
        });
        //editar
    });

//-------------------------------------------------------------------------------------------------------------------------------------------------------------------------
    $("#modalReg").modal({ dismissible: false });
    validateform();

    $("#modalconfirmacion").modal({ dismissible: false });
    validateform();
//asfasfsafsafas
    $("#add-record").on("click", function () {
        $("#nomusuario").val('');
        $("#correo").val('');
        $("#contraseña").val('');
        $("#domicilio").val('');
        $("#tipousr").val(1);
        $('#tipousr').formSelect();
        $("#modalReg").modal('open');
        $("#nomusuario").focus();
      //asfasfsafsafas
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
        $("#tipousr").val(tipousr);
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
                if (urls==editarUsuario) {
                    $("#nomusuario").val($("#nomusuario").val());
<<<<<<< HEAD
                    M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
=======
                    M.toast({ html: 'Registro actualizado', classes: 'rounded green lighten-2', displayLength: 4000 });
>>>>>>> cfda4d0ebdd354f2cbb3a6a37d918338c86821cc
                    reset();
                    $("#modalReg").modal('close');
                    table.row($tr).remove().draw();
                    setRow(response['data'], 'insert');
                }else{
                    $("#nomusuario").val($("#nomusuario").val());
<<<<<<< HEAD
                    M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
=======
                    M.toast({ html: 'Registro exitoso', classes: 'rounded green lighten-2', displayLength: 4000 });
>>>>>>> cfda4d0ebdd354f2cbb3a6a37d918338c86821cc
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
            '<i class="material-icons edit" data-id="' + data.idusuario + '" data-nom="' +  data.nomusuario + '"data-corr="' + data.correo + '" data-cont="' + data.contraseña + '" data-dom="' + data.domicilio + '" data-tipo="' + data.idtipousr + '">create</i>' +
            '<i class="material-icons delete" data-id="' + data.idusuario + '">delete_forever</i>'
        ]).draw().node();
        $(row).attr('data-id', data.idusuario);
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
        $("#idusuario").val('');
        $("#correo").val('');
        $("#contraseña").val('');
        $("#domicilio").val('');
        $("#tipousr").val(1);
        $('#tipousr').formSelect();
        $("#modalReg").modal('close');
}
