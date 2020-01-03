$(init);
var table = null;
var usuario = null;
var tr = null;
$(document).ready(function(){
    $('.sidenav').sidenav();
});
function init() {
    table = $("#usr").DataTable({
        "aLengthMenu": [[10, 25, 50, 75, 100], [10, 25, 50, 75, 100]],
        "iDisplayLength": 15
    });//definiendo las caracteristicas del datatable 

    table.on('click', '.delete', function () {
        $tr = $(this).closest('tr');
        tr = $tr;
        var id = $(this).attr("data-id");
        $.ajax({
            type: "post",
            url: deleteUsuario,
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
    });
    table.on('click', '.edit', function () {
        $tr = $(this).closest('tr');
        table.row($tr).remove().draw();
    });

    $("#modalReg").modal();
    validateform();

    $("#add-record").on("click", function () {
        $("#modalReg").modal('open');
        $("#nomusuario").focus();
    });

    $("#guardar").on("click", function () {
        $("#frmUsr").submit();
    });

    $(".edit").on("click", function () {
        $("#pk").val($(this).attr("data-idempresa"));
        $("#nomusuario").val($(this).attr("data-nomusuario"));
        $("#correousuario").val($(this).attr("data-correousuario"));
        $("#pwdusuario").val($(this).attr("data-pwdusuario"));
        $("#domusuario").val($(this).attr("data-domusuario"));
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

function saveClick() {
    $.ajax({
        type:"post",
        url:insertarUsuario,
        dataType:'json',
        data: $("#frmUsr").serialize(),
        success: function(response){
            if (response['status']==1){
               $("#nomusuario").val($("#nomusuario").val());
                M.toast({html: 'Registro exitoso', classes: 'rounded', displayLength: 4000});
                location.reload();
                $("#modalReg").modal('close');
            }
            else{
                M.toast({html: 'Error al Registrar Usuario', classes: 'rounded', displayLength: 4000});
            }
        }
    });
}//fin clic

function setRow(data, action) {
    console.log(action);
    if (action == 'insert') {
        console.log("insert");
        var row = table.row.add([
            data.nomusuario,
            data.correousuario,
            data.pwdusuario,
            data.domusuario,
            '<i class="material-icons edit" data-idempresa="' + data.pk + '" data-nomusuario="' + data.nomusuario + '"data-correousuario="' + data.correousuario + '" data-pwdusuario="' + data.pwdusuario + '" data-domusuario="' + data.domusuario + '">create</i>' +
            '<i class="material-icons delete" data-idempresa="' + data.pk + '">delete_forever</i>'
        ]).draw().node();
        $(row).attr('id', data.pk);
        Empresa[data.pk] = {
            "idempresa": data.pk,
            "nomusuario": data.nomusuario,
            "correousuario": data.correousuario,
            "pwdusuario": data.pwdusuario,
            "domusuario": data.domusuario,
            "telefonoempresa": data.telefonoempresa,
        }
    }//Fin primer if
    if (action == 'delete') {
        console.log("delete");

        table.row('#' + data.pk).remove.draw();
    }//fin segundo if
}//fin setRow

