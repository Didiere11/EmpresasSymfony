// Inicializa el NavBar
Dropzone.autoDiscover = false;
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
    $("#nombre").focus()
    insertarEmpresa();
});

$(document).on("click", '.edit', function(){
    var idempresa = $(this).attr("id-edit");
    pintarDatos(idempresa);
    $("#empresas-guardar").attr("idempresa", idempresa);
    $("#empresamodal").modal({ dismissible: false }).modal('open');
    actualizarEmpresa(idempresa);
    $("#Aceptar").attr("idempresa", idempresa);
    $("#EliminarSiNo").modal('close');
});

//sirve para editar los servicio

$(document).on("click", '.delete', function () {
    var idempresa = $(this).attr("id-record");
    $("#EliminarSiNo").modal({ dismissible: false }).modal('open');
    $("#Aceptar").attr("idempresa", idempresa);


});

$('#Aceptar').on("click", function() {
    $tr = $(this).closest('tr');
    tr = $tr;
    var idempresa = $(this).attr("idempresa");
    eliminarEmpresa(idempresa);
    table.row($tr).remove().draw();
    $("#EliminarSiNo").modal('close');


});

$('#Cerrar').on("click", function() {
    $("#EliminarSiNo").modal('close');
});

$('#cancelar').on("click", function() {
    $("#empresamodal").modal('close');
    reset();
});

function pintarDatos(idempresa) {
    $("#nombre").val(Empresas[idempresa]["nombreempresa"]).next().addClass("active");
    $("#direccion").val(Empresas[idempresa]["direccionempresa"]).next().addClass("active");
    $("#telefono").val(Empresas[idempresa]["telefonoempresa"]).next().addClass("active");
    $("#correo").val(Empresas[idempresa]["correoempresa"]).next().addClass("active");
    $("#descripcion").val(Empresas[idempresa]["descripcionempresa"]).next().addClass("active");
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
            nombre: { required: true, minlength: 4, maxlength: 220 },
            direccion: { required: true, minlength: 4, maxlength: 220 },
            telefono: { required: true, number: true, minlength: 7, maxlength: 10 },
            correo: { required: true, email: true },
            descripcion: { required: true, minlength: 4, maxlength: 250 },
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
        type: "post",
        url: urlEliminar,
        dataType: 'json',
        data: { 'idempresa': idempresa },
        success: function (result) {
            if (result['status']) {
                table.row().remove().draw(idempresa);
                M.toast({ html: 'Empresa eliminada', classes: 'rounded red lighten-2' });
                $("#modalconfirmacion").modal('close');
            } else {
                M.toast({ html: 'Empresa no eliminada', classes: 'rounded red lighten-2' });
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
                $.each(data, function(key, el) {
                    formData.append(el.name, el.value);
                });
            });
            this.on("success", function(file) {
                var res = JSON.parse(file.xhr.response);
                var base64 = file.dataURL;
                var data = res.data;
                if (res.status) {
                    M.toast({ html: 'Se actualizo con exitoso', classes: 'rounded', displayLength: 4000 });
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
            data.descripcion,
            data.telefono,
            data.correo,

            '<img src="' + base64 + '" width="200" height="100" ></img>',
            '<i class="material-icons edit" id="editar" name="editar"  id-edit="' + data.idempresa + '" class="material-icons">create</i>' +
            '<i class="material-icons delete" id="eliminar" name="eliminar" id-record="' + data.idempresa + '" class="material-icons">delete_forever</i>'
        ]).draw().node();


function limpiar(){
        $("#nomempresa").val('');
        $("#dirempresa").val('');
        $("#correoempresa").val('');
        $("#descripempresa").val('');
        $("#telefonoempresa").val('');
}

    }
    if (action === 'update') {

        Empresas[data.idempresa] = data;
        var row = table.row('#' + data.idempresa).node();
        $(row).find('td:nth-child(1)').text(data.nombreempresa);
        $(row).find('td:nth-child(2)').text(data.direccionempresa);
        $(row).find('td:nth-child(3)').text(data.descripcionempresa);
        $(row).find('td:nth-child(4)').text(data.correoempresa);
        $(row).find('td:nth-child(5)').text(data.telefonoempresa);
        $(row).find('td:nth-child(6)').text(data.rutaimagen);
    }
    if (action === 'delete') {
        table.row('#' + data.idempresa).remove().draw();
    }

}