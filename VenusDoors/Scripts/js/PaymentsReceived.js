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

});
$(function () {
    'use strict';

    $('#summernote').summernote({
        height: 150,
        tooltip: false
    })
});
