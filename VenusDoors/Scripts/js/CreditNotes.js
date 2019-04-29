$(document).ready(function () {
    $(".AddComment").hide();
    $(".showInput").hide();
    $(".read-more-target").hide();
    $("#read-less-state").hide();
    $("#SendMs").hide();
    $("#infoMore").hide();
    $("#btOculDis").hide();

    $(document).on('click', "#btAdd", function () {
        $("#addFile").trigger('click');
    });

    $("#read-more-state").on("click", function () {
        $("#read-more-state").hide();
        $("#read-less-state").show();
        $(".read-more-target").show();
    });

    $("#read-less-state").on("click", function () {
        $("#read-more-state").show();
        $("#read-less-state").hide();
        $(".read-more-target").hide();
    });

    $("#ocultarCampo").on("click", function () {
        $(".showInput").hide();
        $(".AddComment").hide();
        $(".ocultarTitulo").show();
    });

    $("#mostrarCampo").on("click", function () {
        $(".showInput").show();
        $(".AddComment").show();
        $(".ocultarTitulo").hide();
    });

    $("#cSend").on('click', function () {
        $("#SendMs").show();
        $("#Credit").hide();
    });

    $("#ApplyInv").on('click', function () {
        $("#tittleModal").text("Apply credits from CN-00002");
        $("#previewPDF").hide();
        $("#btPrint").hide();
        $("#btDownload").hide();
        $("#apply").show();
        $("#crSave").show();
    });

    $("#btPDF").on('click', function () {
        $("#tittleModal").text("Preview");
        $("#previewPDF").show();
        $("#btPrint").show();
        $("#btDownload").show();
        $("#apply").hide();
        $("#crSave").hide();
    });

    $("#btVolver").on("click", function () {
        $("#SendMs").hide();
        $("#Credit").show();
    });

    $(document).on('click', "#btLinkAdd", function () {
        $("#btFile").trigger("click");
    });

    $("#btDisplay").on('click', function () {
        $("#infoMore").show();
        $("#btOculDis").show();
        $("#btDisplay").hide();
    });

    $("#btOculDis").on('click', function () {
        $("#infoMore").hide();
        $("#btOculDis").hide();
        $("#btDisplay").show();
    });

    $(document).on('click', '#btModi', function (event) {
        $("#lblTituloModal").text("Modify Credit Notes");
        $("#btnCON").hide();
        $("#editDXU").hide();
        $("#NEWINVOICE").show();
        $("#btnConMod").show();
        $("#btBackMod").hide();
        $("#detailBACK").hide();
        $("#btnAtras").hide();
        $("#btSaveChan").hide();
        $('#createBACK').hide();
        $('#modInBack').hide();
        $("#btnSAVE").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $("#NEWORDER").hide();
        $("#DETAILORDER").hide();
        $("#btSavDrs").hide();
        $("#btGuardar").hide();
        $("#MODIFYOR").hide();
        $("#btCancel").hide();
        $("#btnCancelar").hide();
    });

    $("#btnConMod").on('click', function () {
        $('#DETAILORDER').show();
        $("#btnClose").show();
        $('#createBACK').hide();
        $("#btnBack").show();
        $('#modInBack').show();
        $("#btBackMod").show();
        $("#editDXU").show();
        $("#btnBack").hide();
        $("#detailBACK").hide();
        $("#NEWINVOICE").hide();
        $("#btnConMod").hide();
        $("#btSavDrs").show();
        $("#btGuardar").show();
        $("#btnAtras").hide();
        $("#btnCancelar").hide(); modDoor
        $("#modDoor").show();
        $("#editDoor").hide();
    });

    $(document).on('click', '#modDoor', function (event) {
        var id = $(this).attr('data-id');
        $("#btGuardar").hide();
        $("#btSavDrs").hide();
        $("#detailBACK").hide();
        $("#MODIFYOR").show();
        $("#btCancel").hide();
        $("#btnSAVE").hide();
        $("#btnCON").hide();
        $("#btnAtras").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $("#btnConMod").hide();
        $("#editDXU").hide();
        $("#btBackMod").hide();
        $("#NEWINVOICE").hide();
        $('#modInBack').hide();
        $("#NEWORDER").hide();
        $("#DETAILORDER").hide();
        $('#createBACK').removeClass("active");
        $('#btnAtras').removeClass("active");
        $("#btSaveChan").show();
        $("#btnCancelar").show();
        QuitarClaseErrorACombos();
    });

    $("#btBackMod").on('click', function () {
        $("#lblTituloModal").text("Modify Credit Notes");
        $("#NEWINVOICE").show();
        $("#btnConMod").show();
        $("#editDXU").hide();
        $('#DETAILORDER').hide();
        $('#btBackMod').hide();
        $("#btnCancelar").hide();
        $("#btCancel").hide();
        $('#createBACK').hide();
        $('#modInBack').hide();
        $("#btnClose").hide();
        $("#btSavDrs").hide();
        $("#btGuardar").hide();
    });

    $("#modInBack").on('click', function () {
        $("#btBackMod").trigger("click");
    });

    $("#editDXU").on('click', function () {
        $("#lblTituloModal").text("Modify Order");
        $("#NEWORDER").show();
        $("#btnCancelar").show();
        $("#btCancel").hide();
        $("#editDXU").hide();
        $("#DETAILORDER").hide();
        $('#modInBack').hide();
        $("#btBackMod").hide();
        $("#btSavDrs").hide();
        $("#btGuardar").hide();
    });

    $("#btnCancelar").on('click', function () {
        $('#DETAILORDER').show();
        $("#btnClose").show();
        $('#modInBack').show();
        $('#createBACK').hide();
        $("#btnBack").show();
        $("#btBackMod").show();
        $("#editDXU").show();
        $("#NEWORDER").hide();
        $("#btnBack").hide();
        $("#detailBACK").hide();
        $("#NEWINVOICE").hide();
        $("#MODIFYOR").hide();
        $("#btnConMod").hide();
        $("#btSavDrs").show();
        $("#btGuardar").show();
        $("#btnAtras").hide();
        $("#btnCancelar").hide();
        $("#btSaveChan").hide();
        $("#modDoor").show();
        $("#editDoor").hide();
    });

    $("#btnBack").on('click', function () {
        $("#createBACK").trigger("click");
    });

    $("#btNew").on('click', function () {
        $("#lblTituloModal").text("New Credit Notes");
        $("#btnCON").show();
        $("#editDXU").hide();
        $("#btnConMod").hide();
        $("#btBackMod").hide();
        $("#NEWINVOICE").show();
        $("#detailBACK").hide();
        $("#btnAtras").hide();
        $("#btSaveChan").hide();
        $('#modInBack').hide();
        $('#createBACK').hide();
        $("#btnSAVE").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $("#NEWORDER").hide();
        $("#DETAILORDER").hide();
        $("#btSavDrs").hide();
        $("#btGuardar").hide();
        $("#MODIFYOR").hide();
        $("#btCancel").hide();
        $("#btnCancelar").hide();
    });

    $("#createBACK").on('click', function () {
        $("#lblTituloModal").text("New Credit Notes");
        $("#NEWINVOICE").show();
        $("#btnCON").show();
        $("#btnConMod").hide();
        $("#btBackMod").hide();
        $("#detailBACK").hide();
        $("#btnAtras").hide();
        $("#btSaveChan").hide();
        $('#createBACK').hide();
        $('#modInBack').hide();
        $("#btnSAVE").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $("#editDXU").hide();
        $('#NEWORDER').hide();
        $("#MODIFYOR").hide();
        $("#DETAILORDER").hide();
        $("#btGuardar").hide();
        $("#btSavDrs").hide();
        $('#btnAtras').removeClass("active");
        $("#btCancel").hide();
        $("#btnCancelar").hide();
    });

    $("#detailBACK").on('click', function () {
        $("#btnAtras").trigger("click");
    });

    $("#btnAtras").on('click', function () {
        $("#lblTituloModal").text("Create order");
        $("#NEWORDER").show();
        $("#createBACK").show();
        $("#btnSAVE").show();
        $("#btnBack").show();
        $("#btnClose").show();
        $("#btnConMod").hide();
        $("#editDXU").hide();
        $("#detailBACK").hide();
        $("#btBackMod").hide();
        $('#modInBack').hide();
        $("#createBACK").show();
        $("#btnAtras").hide();
        $("#btSaveChan").hide();
        $("#btnCON").hide();
        $("#DETAILORDER").hide();
        $("#MODIFYOR").hide();
        $("#btSavDrs").hide();
        $("#btGuardar").hide();
        $('#createBACK').removeClass("active");
        $("#btCancel").hide();
        $("#btnCancelar").hide();
    });

    $("#btnCON").on('click', function () {
        $("#lblTituloModal").text("Create order");
        $("#createBACK").show();
        $("#btnSAVE").show();
        $("#btnBack").show();
        $("#NEWORDER").show();
        $("#detailBACK").hide();
        $("#btnClose").show();
        $("#btBackMod").hide();
        $("#editDXU").hide();
        $("#btnConMod").hide();
        $("#btnAtras").hide();
        $("#btSaveChan").hide();
        $('#modInBack').hide();
        $("#btnCON").hide();
        $("#NEWINVOICE").hide();
        $("#DETAILORDER").hide();
        $("#MODIFYOR").hide();
        $("#btSavDrs").hide();
        $("#btGuardar").hide();
        $('#createBACK').removeClass("active");
        $("#btCancel").hide();
        $("#btnCancelar").hide();
    });

    $("#btCancel").on('click', function () {
        $("#btnSAVE").trigger("click");
    });

    $("#btnSAVE").on('click', function () {
        $("#lblTituloModal").text("Details of the order #");
        $("#btnClose").show();
        $("#btnAtras").show();
        $("#detailBACK").show();
        $('#DETAILORDER').show();
        $("#btSavDrs").show();
        $("#btGuardar").show();
        $("#btBackMod").hide();
        $("#editDXU").hide();
        $("#createBACK").hide();
        $('#modInBack').hide();
        $("#btnConMod").hide();
        $("#btnBack").hide();
        $("#btSaveChan").hide();
        $("#btnSAVE").hide();
        $("#btnCON").hide();
        $("#NEWORDER").hide();
        $("#NEWINVOICE").hide();
        $("#MODIFYOR").hide();
        $("#btCancel").hide();
        $("#btnCancelar").hide();
        $("#modDoor").hide();
        $("#editDoor").show();
    });

    $("#createDoor").on('click', function () {
        $("#editDoor").trigger("click");
    });

    $(document).on('click', '#editDoor', function (event) {
        var id = $(this).attr('data-id');
        $("#btGuardar").hide();
        $("#btSavDrs").hide();
        $("#detailBACK").hide();
        $("#MODIFYOR").show();
        $("#btCancel").show();
        $("#btnSAVE").hide();
        $("#btnCON").hide();
        $("#btnAtras").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $("#btnConMod").hide();
        $("#editDXU").hide();
        $("#btBackMod").hide();
        $("#NEWINVOICE").hide();
        $('#modInBack').hide();
        $("#NEWORDER").hide();
        $("#DETAILORDER").hide();
        $('#createBACK').removeClass("active");
        $('#btnAtras').removeClass("active");
        $("#btSaveChan").show();
        $("#btnCancelar").hide();
        QuitarClaseErrorACombos();

    });

});
$(function () {
    'use strict';

    $('#summernote').summernote({
        height: 150,
        tooltip: false
    })
});

$(function () {
    $('#datepickerNoOfMonths').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: 2
    });

    $('#modalToggle').click(function () {
        $('#modal').modal({
            backdrop: 'static'
});
    });

})

function Colores(IdStatus) {
    var Color = "#94a5a6";
    switch (IdStatus) {
        case 13:
            Color = "#94a5a6";
            break;
        case 14:
            Color = "#15806f";
            break;
        case 15:
            Color = "#f59d00";
            break;
        case 16:
            Color = "#15806f";
            break;
        case 17:
            Color = "#15806f";
            break;
        default:

    }

    return Color;
}

function Iconos(IdType) {
    var Icono = "fa fa-sticky-note-o";
    switch (IdType) {
        case 10:
            Icono = "fa fa-plus";
            break;
        case 11:
            Icono = "fa fa-envelope-o";
            break;
        case 12:
            Icono = "fa fa-comment-o";
            break;
        case 13:
            Icono = "fa fa-file-text-o";
            break;
        case 14:
            Icono = "fa fa-paperclip";
            break;
        case 15:
            Icono = "fa fa-trash-o";
            break;
        case 16:
            Icono = "fa fa-edit";
            break;
        case 17:
            Icono = "fa fa-times";
            break;
        case 18:
            Icono = "fa fa-check";
            break;
        case 19:
            Icono = "a fa-paper-plane-o";
            break;
        case 20:
            Icono = "fa fa-usd";
            break;
        case 21:
            Icono = "fa fa-files-o";
            break;
        default:

    }

    return Icono;
}

function Moneda(entrada) {
    var resul = "";
    entrada = entrada.toString().split(".");
    var num = entrada[0];
    var nums = new Array();
    var simb = ","; //Éste es el separador
    num = num.toString();
    num = num.replace(/\D/g, "");   //Ésta expresión regular solo permitira ingresar números
    nums = num.split(""); //Se vacia el valor en un arreglo
    var long = nums.length - 1; // Se saca la longitud del arreglo
    var patron = 3; //Indica cada cuanto se ponen las comas
    var prox = 2; // Indica en que lugar se debe insertar la siguiente coma

    while (long > prox) {
        nums.splice((long - prox), 0, simb); //Se agrega la coma
        prox += patron; //Se incrementa la posición próxima para colocar la coma
    }

    for (var i = 0; i <= nums.length - 1; i++) {
        resul += nums[i]; //Se crea la nueva cadena para devolver el valor formateado
    }

    if (entrada[1] == null) {
        resul = resul + ".00";
    } else {
        resul = resul + "." + entrada[1];
    }
   
    return resul;
}
$(function () {
    'use strict';
    $('.br-mailbox-list').perfectScrollbar();

    $('#showMailBoxLeft').on('click', function (e) {
        e.preventDefault();
        if ($('body').hasClass('show-mb-left')) {
            $('body').removeClass('show-mb-left');
            $(this).find('.fa').removeClass('fa-arrow-left').addClass('fa-arrow-right');
        } else {
            $('body').addClass('show-mb-left');
            $(this).find('.fa').removeClass('fa-arrow-right').addClass('fa-arrow-left');
        }
    });
});
var meses = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic");
Date.prototype.ddmmyyyy = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return (dd[1] ? dd : "0" + dd[0]) + " " + meses[mm] + " " + yyyy;
};

Date.prototype.ddmmyyyyHH = function () {



    var day = this.getDate().toString();
    var month = this.getMonth().toString();
    var year = this.getFullYear().toString();
    var hour = this.getHours().toString();
    var minute = this.getMinutes().toString();
    var time = (day[1] ? day : "0" + day[0]) + " " + meses[month] + " " + year + " " + (hour[1] ? hour : "0" + hour[0]) + ':' + (minute[1] ? minute : "0" + minute[0]);
    return time;
};
var re = /-?\d+/;
var inicio = true;

function Desactivar() {
  //  $('#inStatus').removeClass("is-invalid");
    $('#inDescription').removeClass("active");
}


var _IdInvoice = 0;
$(document).on('click', '.Invoice', function (event) {
    $("#txtComment").val("");
    $(".showInput").hide();
    $(".AddComment").hide();
    $(".ocultarTitulo").show();
    $("#read-more-state").show();
    $("#read-less-state").hide();

    var IdInvoice = $(this).attr('data-id');
    _IdInvoice = $(this).attr('data-id');
    if (!$(this).hasClass("active")) {
        for (var i = 0; i < listInvoice.length; i++) {
            if (IdInvoice == listInvoice[i].Id) {
                LlenarVistaPrincipal(listInvoice[i]);
                break;
            }
        }
    }
    $('.Invoice').removeClass("active");
    $(this).addClass("active");
    });

var claseAnterior = 'paid';
