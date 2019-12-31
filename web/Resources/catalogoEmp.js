$(init);
var table = null;
var empresa = null;
var tr = null;
function init() {
    table = $("#empre").DataTable({
        "aLengthMenu": [[10, 25, 50, 75, 100], [10, 25, 50, 75, 100]],
        "iDisplayLength": 15
    });//definiendo las caracteristicas del datatable 

    table.on('click', '.delete', function () {
        $tr = $(this).closest('tr');
        tr = $tr;
        var id = $(this).attr("data-id");
        $.ajax({
            type: "post",
            url: urlDelete,
            datatype: 'json',
            data: { 'pk': id },
            success: function (respuesta) {
                if (respuesta['status']) {
                    table.row($tr).remove().draw();

                    Materialize.toast('Registro eliminado', 5000);
                    // setRow(respuesta['data'],'delete');
                } else
                    Materialize.toast('Error al eliminar Empresa', 5000);
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
        $("#nomempresa").focus();
    });

    $("#guardar").on("click", function () {
        $("#frmEmp").submit();
    });

    $(".edit").on("click", function () {
        $("#pk").val($(this).attr("data-idempresa"));
        $("#nomempresa").val($(this).attr("data-nomempresa"));
        $("#dirempresa").val($(this).attr("data-dirempresa"));
        $("#correoempresa").val($(this).attr("data-correoempresa"));
        $("#descripempresa").val($(this).attr("data-descripempresa"));
        $("#telefonoempresa").val($(this).attr("data-telefonoempresa"));
        $("#nomempresa").focus();
        $("#modalReg").modal('open');
    });

    $(".delete").on("click", function () {
        /*  var id = $(this).attr("data-id");
          $.ajax({
              type:"post",
              url:urlDelete,
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
   
          */
    });
}

function validateform() {
    $("#frmEmp").validate({
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
        errorPlacement: function (error, element) {
            error.insertAfter(element)
        },
        submitHandler: function (form) {
            saveClick();
        }
    });
}

function saveClick() {
    var id = $('#pk').val();
    var sURL = ''
    if (id > 0)
        sURL = urlUpdate;
    else
        sURL = urlInsert;
    $.ajax({
        type: "post",
        url: sURL,
        datatype: 'json',
        data: $("#frmEmp").serialize(),
        success: function (respuesta) {
            if (respuesta['status']) {
                $("#pk").val("0");
                $("#nomempresa").val("");
                $("#dirempresa").val("");
                $("#correoempresa").val("");
                $("#descripempresa").val("");
                $("#telefonoempresa").val("");
                $("#nomempresa").focus();
                $("#modalReg").modal('close');
                if (id === '0') {
                    Materialize.toast('Registro Agregado', 5000);

                } else {
                    Materialize.toast('Registro actualizado', 5000);
                }

            }
            setRow(respuesta['data'], 'insert');




        }//fin succes
    });//fin Ajax
}//fin clic

function setRow(data, action) {
    console.log(action);
    if (action == 'insert') {
        console.log("insert");
        var row = table.row.add([
            data.nomempresa,
            data.dirempresa,
            data.correoempresa,
            data.descripempresa,
            data.telefonoempresa,
            '<i class="material-icons edit" data-idempresa="' + data.pk + '" data-nomempresa="' + data.nomempresa + '"data-dirempresa="' + data.dirempresa + '" data-correoempresa="' + data.correoempresa + '" data-descripempresa="' + data.descripempresa + '" data-telefonoempresa="' + data.telefonoempresa + '">create</i>' +
            '<i class="material-icons delete" data-idempresa="' + data.pk + '">delete_forever</i>'
        ]).draw().node();
        $(row).attr('id', data.pk);
        Empresa[data.pk] = {
            "idempresa": data.pk,
            "nomempresa": data.nomempresa,
            "dirempresa": data.dirempresa,
            "correoempresa": data.correoempresa,
            "descripempresa": data.descripempresa,
            "telefonoempresa": data.telefonoempresa,
        }
    }//Fin primer if
    if (action == 'delete') {
        console.log("delete");

        table.row('#' + data.pk).remove.draw();
    }//fin segundo if
}//fin setRow