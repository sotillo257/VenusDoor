﻿$(document).ready(function () {

    $("#btnInsertStatus").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertStatus();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateStatus").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateStatus();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateStatus").hide();
        $("#btnInsertStatus").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateStatus").show();
        $("#btnInsertStatus").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listSTS.length; i++) {
            if (listSTS[i].Id == $(this).attr('value')) {

                var aux = listSTS[i].Id;
                var aux1 = listSTS[i].Group.Id;
                var aux2 = listSTS[i].Description;

                $('#inId').val(listSTS[i].Id);
                $('#inGroup').val(listSTS[i].Group.Id);
                $('#inDescription').val(listSTS[i].Description);
            }
        }
    });
});
$(function () {
    'use strict';

    $('#datatable1').DataTable({
        responsive: true,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ items/page',
        }
    });

    $('#datatable2').DataTable({
        bLengthChange: false,
        searching: false,
        responsive: true
    });

    // Select2
    $('.dataTables_length select').select2({ minimumResultsForSearch: Infinity });

});

function Limpiar() {
    $('#inId').val(0);
    $('#inDescription').removeClass("is-invalid");
    $('#inDescription').val("");

    $('#inGroup').removeClass("is-invalid");
    $('#inGroup').val(0);

}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inGroup').val() == 0) {
        $('#inGroup').addClass("is-invalid");
        aux = false;
    } else {
        $('#inGroup').removeClass("is-invalid");
    }

    if ($('#inDescription').val() == "") {
        $('#inDescription').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDescription').removeClass("is-invalid");
    }

    return aux;
}

function InsertStatus() {

    var datos =
    {
        pStatus: {
            Description: $("#inDescription").val(),
            Group: { Id: $("#inGroup").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateStatus() {

    var datos =
    {
        uStatus: {
            Id: $("#inId").val(),
            Description: $("#inDescription").val(),
            Group: { Id: $("#inGroup").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}