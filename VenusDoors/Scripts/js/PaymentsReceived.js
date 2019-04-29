$(document).ready(function () {
    $("#SendMs").hide();
    $("#infoMore").hide();
    $("#btOculDis").hide();

    $("#Send").on('click', function () {
        $("#SendMs").show();
        $("#Payments").hide();
    });

    $("#btVolver").on("click", function () {
        $("#SendMs").hide();
        $("#Payments").show();
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

    $("#btModi").on('click', function () {
        $("#lblTituloModal").text("Modify Payment");
        $("#NEWINVOICE").show();
        $("#btnConMod").show();
        $("#btBack").hide();
        $("#modBACK").hide();
        $("#btnClose").show();
        $("#btSavDrs").hide();
        $("#btGuardar").hide();
        $("#createBACK").hide();
        $("#NEWORDER").hide();
        $("#btnCon").hide();
        $("#btBackMod").hide();
    });

    $("#btnConMod").on('click', function () {
        $("#lblTituloModal").text("Modify Payment");
        $("#NEWORDER").show();
        $("#btBack").hide();
        $("#modBACK").show();
        $("#btBackMod").show();
        $("#btnClose").show();
        $("#btSavDrs").show();
        $("#btGuardar").show();
        $("#modBACK").show();
        $("#createBACK").hide();
        $("#btnCon").hide();
        $("#btnConMod").hide();
        $("#NEWINVOICE").hide();
        $("#btnCon").hide();
    });

    $("#modBACK").on('click', function () {
        $("#btBackMod").trigger("click");
    });

    $("#btBackMod").on('click', function () {
        $("#NEWORDER").hide();
        $("#btBackMod").hide();
        $("#NEWINVOICE").show();
        $("#btnClose").show();
        $("#btnCon").hide();
        $("#modBACK").hide();
        $("#btSavDrs").hide();
        $("#btGuardar").hide();
        $("#createBACK").hide();
        $("#btnConMod").show();
        $("#btBack").hide();
    });

    $("#btNewP").on('click', function () {
        $("#lblTituloModal").text("New Payment");
        $("#NEWINVOICE").show();
        $("#btnCon").show();
        $("#btBack").hide();
        $("#btnClose").show();
        $("#btSavDrs").hide();
        $("#modBACK").hide();
        $("#btGuardar").hide();
        $("#createBACK").hide();
        $("#NEWORDER").hide();
        $("#btnConMod").hide();
        $("#btBackMod").hide();
        $("#modBACK").hide();
    });

    $("#btnCon").on('click', function () {
        $("#lblTituloModal").text("New Payment");
        $("#NEWORDER").show();
        $("#btBack").show();
        $("#btnClose").show();
        $("#btSavDrs").show();
        $("#btGuardar").show();
        $("#createBACK").show();
        $("#modBACK").hide();
        $("#btnCon").hide();
        $("#NEWINVOICE").hide();
        $("#btnConMod").hide();
        $("#btBackMod").hide();
        $("#modBACK").hide();
    });

    $("#createBACK").on('click', function () {
        $("#btBack").trigger("click");
    });

    $("#btBack").on('click', function () {
        $("#NEWORDER").hide();
        $("#btBack").hide();
        $("#NEWINVOICE").show();
        $("#btnClose").show();
        $("#btnCon").show();
        $("#btSavDrs").hide();
        $("#btGuardar").hide();
        $("#modBACK").hide();
        $("#createBACK").hide();
        $("#btnConMod").hide();
        $("#btBackMod").hide();
        $("#modBACK").hide();
    });

});
$(function () {
    'use strict';

    $('#summernote').summernote({
        height: 150,
        tooltip: false
    })
});
