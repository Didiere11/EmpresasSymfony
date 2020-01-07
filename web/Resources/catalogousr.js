$(init);
var table = null;
var usuarios = null;
var tr = null;
$(document).ready(function () {
    $('.sidenav').sidenav();
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

    /*  table.on('click', '.delete', function () {
          $tr = $(this).closest('tr');
          tr = $tr;
          var id = $(this).attr("data-id");
          $.ajax({
              type: "post",
              url: eliminaUsuario,
              datatype: 'json',
              data: { 'pk': id },
              success: function (respuesta) {
                  if (respuesta['status']) {
                      table.row($tr).remove().draw();
                  M.toast({html: 'Registro Eliminado', classes: 'rounded', displayLength: 4000});
                      // setRow(respuesta['data'],'delete');
                } else
                 M.toast({html: 'Registro no eliminado', classes: 'rounded', displayLength: 4000});
              }
          });
   */
    /*  table.on('click', '.edit', function () {
          $tr = $(this).closest('tr');
          table.row($tr).remove().draw();
      });*/

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

    $(".edit").on("click", function () {
        $("#idusuario").val($(this).attr("data-id"));
        $("#nomusuario").val($(this).attr("data-nomusr"));
        $("#correousuario").val($(this).attr("data-corrusr"));
        $("#pwdusuario").val($(this).attr("data-pwdusur"));
        $("#domusuario").val($(this).attr("data-domusr"));
        $("#nomusuario").focus();
        $("#modalReg").modal('open');
    });
    /*
        $(".delete").on("click", function () {
             var id = $(this).attr("data-id");
              $.ajax({
                  type:"post",
                  url:deleteUsuario,
                  datatype:'json',
                  data:{'pk':id},
                  success: function(respuesta){
                      if(respuesta['status']){
                       Materialize.toast('Registro eliminado', 5000);
                       setRow(respuesta['data'],'delete');
                      }else
                      Materialize.toast('Error al eliminar Empresa', 5000);
                   }
              });//fin ajax
       
              
        });*/
}

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
/*
function saveClick() {
    $.ajax({
        type: "post",
        url: insertarUsuario,
        dataType: 'json',
        data: $("#frmUsr").serialize(),
        success: function (response) {
            if (response['status'] == 1) {
                $("#nomusuario").val($("#nomusuario").val());
                M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
              //  location.reload();
              setRow(data, action);
                $("#modalReg").modal('close');
            }
            else {
                M.toast({ html: 'Error al Registrar Usuario', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}//fin clic

*/



//-----------------------------------
/*function saveClick() {
    var id = $('#idusuario').val();
    var sURL = '';
    if (id > 0)
        sURL = insertarUsu;
    else
        sURL = insertaUsuario;
    $.ajax({
        type: "post",
        url: sURL,
        datatype: 'json',
        data: $("#frmUsr").serialize(),
        success: function (respuesta) {
            if (respuesta['status']==1) {
               reset();
                $("#modalReg").modal('close');
                if (id == '0') {
                    M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 })
                   
                } else {
                    M.toast({ html: 'Registro Actualizado', classes: 'rounded', displayLength: 4000 });
                    
                }
            }
            setRow(respuesta['data'], 'insert');
        }//fin succes
    });//fin Ajax
}//fin clic*/
//----------------------------------

function saveClick() {
    var id = $("#idusuario").val();

    if (id > 0) {
        var urls = editaEmpresa;
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

function reset() {
    $("#nomusuario").val('');
    $("#correousuario").val('');
    $("#pwdusuario").val('');
    $("#domusuario").val('');
    $("#tipousr").val(1);
}
