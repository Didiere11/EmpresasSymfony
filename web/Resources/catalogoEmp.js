Dropzone.autoDiscover = true;
var myDropzone;
var table = "null";
var tr = null;
$(document).ready(function() {
    table = $('#empresas-table').DataTable();
    validateForm();
    $('.sidenav').sidenav();
    $("#empresamodal").modal();
    $("#PreviewImagen").modal();
    $('#empresas-guardar').on("click", function() {
        //document.getElementById('empresa-form').reset();
        $('#empresa-form').submit();
    });
    //insertarEmpresa();
    //actualizarEmpresa();
});
$('#empresa-nuevo').on("click", function() {
    $("#empresamodal").modal({ dismissible: false }).modal('open');
    insertarEmpresa();

});
$(document).on("click", '.edit', function() {
    var idempresa = $(this).attr("id-edit");
    var nombre = $(this).attr("data-nom");
    var dire = $(this).attr("data-dir");
    var descr = $(this).attr("data-descrip");
    var tele = $(this).attr("data-tel");
    var corr = $(this).attr("data-corr");
    var img = $(this).attr("data-img");
    $("#empresamodal").modal({ dismissible: false }).modal('open');
    $("#idempresa").val(idempresa);
    $("#nombre").val(nombre);
    $("#direccion").val(dire);
    $("#telefono").val(tele);
    $("#descripcion").val(descr);
    $("#correo").val(corr);
    $("#addfile").val(img);
    $("#direccion").focus();
    $("#telefono").focus();
    $("#descripcion").focus();
    $("#correo").focus();
    $("#nombre").focus();
    $tr = $(this).closest('tr');
    tr = $tr;
    var idempresa = $(this).attr("id-edit");
    pintarDatos(idempresa);
    $("#empresas-guardar").attr("idempresa", idempresa);
    actualizarEmpresa(idempresa);

});
//sirve para editar los servicio
$(document).on("click", '.right', function() {
    var idempresa = $(this).attr("idempresa");
    $.ajax({
        type: "post",
        url: insertarvis,
        dataType: "json",
        data: { idempresa },
        success: function(respuesta) {
            if (respuesta["status"]) {
                //table.remove().draw();
                M.toast({
                    html: "visita registrada",
                    classes: "rounded ",
                    displayLength: 4000
                });
            } else {

            }
        }
    });
});

$(document).on("click", '.delete', function() {
    var idempresa = $(this).attr("id-record");
    $("#EliminarSiNo").modal({ dismissible: false }).modal('open');
    $("#Aceptar").attr("idempresa", idempresa);
});
$(document).on("click", '#Aceptar', function() {
    $tr = $(this).closest('tr');
    tr = $tr;
    var idempresa = $(this).attr("idempresa");
    table.row($tr).remove().draw();
    eliminarEmpresa(idempresa);
});

$('#Cerrar').on("click", function() {
    $("#EliminarSiNo").modal('close');
});

$('#cancelar').on("click", function() {
    $("#empresamodal").modal('close');
    reset();
});

function pintarDatos(idempresa) {
    $("#addfile").val('data:' + Empresas[idempresa]["formatoimagen"] + ';base64,' + Empresas[idempresa]["rutaimagen"]).next().addClass("active");
    var divrow = $('<div/>', {
        'class': 'row img'
    }).appendTo('#empresa-form');
    var divcol = $('<div/>', {
        'class': 'col s3'
    }).appendTo(divrow);
    var divimg = $('<img/>', {
        'class': '',
        'src': 'data:' + Empresas[idempresa]["formatoimagen"] + ';base64,' + Empresas[idempresa]["rutaimagen"],
        'width': '200',
        'height': '100'
    }).appendTo(divrow);
    $("#idempresa").val(idempresa);
}

function validateForm() {
    $('#empresa-form').validate({
        rules: {
            nombre: {
                required: {
                    depends: function() {
                        if ($("#nombre").val().trim().length == 0) {
                            $("#nombre").val('');
                        }
                        return true;
                    }
                },
                minlength: 4,
                maxlength: 220
            },
            direccion: {
                required: {
                    depends: function() {
                        if ($("#direccion").val().trim().length == 0) {
                            $("#direccion").val('');
                        }
                        return true;
                    }
                },
                minlength: 4,
                maxlength: 220
            },
            telefono: {
                required: {
                    depends: function() {
                        if ($("#telefono").val().trim().length == 0) {
                            $("#telefono").val('');
                        }
                        return true;
                    }
                },
                number: true,
                minlength: 7,
                maxlength: 10
            },
            correo: { required: true, email: true },
            descripcion: {
                required: {
                    depends: function() {
                        if ($("#descripcion").val().trim().length == 0) {
                            $("#descripcion").val('');
                        }
                        return true;
                    }
                },
                minlength: 4,
                maxlength: 250
            },
            addfile: { required: true },
        },
        messages: {
            nombre: { required: "No puedes dejar este campo vacío", email: "Se requiere correo valido", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            direccion: { required: "No se puede dejar el campo vacio", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 220 caracteres" },
            telefono: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 7 caracteres", maxlength: "No puedes ingresar más de 10 caracteres" },
            descripcion: { required: "No puedes dejar este campo vacío", minlength: "Debes ingresar al menos 4 caracteres", maxlength: "No puedes ingresar más de 250 caracteres" },
            correo: { required: "No puedes dejar este campo vacion", email: "Este campo debe de ser un correo electronico" },
            addfile: { required: "Favor de agregar una imagen" },
        },
        errorElement: "div",
        errorClass: "invalid",
        errorPlacement: function(error, element) {
            error.insertAfter(element)
        },
        submitHandler: function(form) {
            myDropzone.processQueue();
        }
    });
}

$(function() {
    $('#correo').on('keypress', function(e) {
        if (e.which == 32)
            return false;
    });
});
// Limpia los campos al cerrar la modal
function reset() {
    $("#idempresa").val('');
    $("#nombre").val('');
    $("#direccion").val('');
    $("#telefono").val('');
    $("#descripcion").val('');
    $("#correo").val('');
    myDropzone.removeAllFiles(true);
    $('.img').hide();

};

function eliminarEmpresa(idempresa) {
    $.ajax({
        type: "delete",
        url: urlEliminar,
        dataType: 'json',
        data: { idempresa },
        success: function(respuesta) {
            if (respuesta['status']) {
                M.toast({ html: 'Registro Eliminado con Exito', classes: 'rounded', displayLength: 4000 });
                var action = "delete";
                var base64 = "";
                setRow(respuesta.data, base64, action);

            } else {
                M.toast({ html: 'Error al Eliminar ', classes: 'rounded', displayLength: 4000 });
            }
        }
    });
}

function actualizarEmpresa(idempresa) {
    //Dropzone class
    pdf = $(".add-file").dropzone({
        url: urlActualizar,
        paramName: "archivo",
        maxFilesize: 5, //MB
        maxFiles: 1,
        method: "post",
        uploadMultiple: false,
        previewsContainer: false,
        dictFileTooBig: "Error, el archivo no debe superar los 10MB",
        dictInvalidFileType: "Error, tipo de formato no aceptado",
        acceptedFiles: ".jpeg, .png , .jpg",
        autoProcessQueue: false,
        data: { idempresa },
        error: function(file, errorMessage) {
            M.toast({ html: errorMessage, classes: 'rounded', displayLength: 4000 });
        },
        init: function() {
            myDropzone = this;
            $("#empresas-guardar").click(function(e) {
                $('#empresa-form').submit();


            });
            this.on("sending", function(file, xhr, formData) {
                var data = $('#empresa-form').serializeArray();
                // post = post + "&IdEmpresa=" + ;
                $.each(data, function(key, el) {
                    formData.append(el.name, el.value);
                });
            });
            this.on("success", function(file) {
                var res = JSON.parse(file.xhr.response);
                var base64 = file.dataURL;
                var data = res.data;
                if (res.status) {
                    M.toast({ html: 'Se actualizo con exito', classes: 'rounded', displayLength: 4000 });
                    table.row('#' + data.idempresa).remove().draw();
                    var action = "update";
                    setRow(data, base64, action);
                    reset();
                    $("#empresamodal").modal('close');
                } else {
                    show_alert("warning", res.data);
                }

            });
        }

    });
}

function insertarEmpresa() {
    //Dropzone class
    pdf = $(".add-file").dropzone({
        url: urlInsertar,
        paramName: "archivo",
        maxFilesize: 15, //MB
        maxFiles: 1,
        method: "post",
        uploadMultiple: false,
        previewsContainer: false,
        dictFileTooBig: "Error, el archivo no debe superar los 10MB",
        dictInvalidFileType: "Error, tipo de formato no aceptado",
        acceptedFiles: ".jpeg, .png , .jpg",
        autoProcessQueue: false,
        error: function(file, errorMessage) {
            M.toast({ html: errorMessage, classes: 'rounded', displayLength: 4000 });

        },
        init: function() {
            myDropzone = this;
            $("#empresas-guardar").click(function(e) {
                $('#empresa-form').submit();

            });
            this.on("sending", function(file, xhr, formData) {
                var data = $('#empresa-form').serializeArray();
                $.each(data, function(key, el) {
                    formData.append(el.name, el.value);
                });
            });
            this.on("success", function(file) {
                var res = JSON.parse(file.xhr.response);
                var base64 = file.dataURL;
                var data = res.data;
                if (res.status) {
                    M.toast({ html: 'Registro exitoso', classes: 'rounded', displayLength: 4000 });
                    var action = "insert";
                    setRow(data, base64, action);
                    reset();
                    $("#empresamodal").modal('close');
                } else {
                    show_alert("warning", res.data);
                }

            });
        }
    });
}

function setRow(data, base64, action) {
    Empresas[data.idempresa] = data;

    if (action === 'insert') {
        var row = table.row.add([
            data.idempresa,
            data.nombre,
            data.direccion,
            data.telefono,
            data.correo,
            data.descripcion,
            '<img src="' + base64 + '" width="200" height="100" ></img>',
            '<i class="material-icons edit"   id-edit="' + data.idempresa + '" data-nom="' + data.nombre + '"data-dir="' + data.direccion + '"data-descrip="' + data.descripcion + '"data-tel="' + data.telefono + '"data-corr="' + data.correo + '" class="material-icons">create</i>' +
            '<i class="material-icons delete" id-record="' + data.idempresa + '" class="material-icons">delete_forever</i>'

        ]).draw().node();
    }
    if (action === 'update') {
        table.row('#' + data.idempresa).remove().draw();
        var row = table.row.add([
            data.idempresa,
            data.nombre,
            data.direccion,
            data.telefono,
            data.correo,
            data.descripcion,
            '<img src="' + base64 + '" width="200" height="100" ></img>',
            '<i class="material-icons edit"  id-edit="' + data.idempresa + '" data-nom="' + data.nombre + '"data-dir="' + data.direccion + '"data-descrip="' + data.descripcion + '"data-tel="' + data.telefono + '"data-corr="' + data.correo + '" class="material-icons">create</i>' +
            '<i class="material-icons delete" id-record="' + data.idempresa + '" class="material-icons">delete_forever</i>'
        ]).draw().node();
        $(row).attr('id-edit', data.idempresa);
    }
    if (action === 'delete') {
        Empresas[data.idempresa] = data;
        table.row('#' + data.idempresa).remove().draw();
    }

}