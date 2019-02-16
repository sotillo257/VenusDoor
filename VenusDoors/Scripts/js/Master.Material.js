﻿$(document).ready(function () {

    $("#btInsertMaterial").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertMaterial();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateMaterial").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateMaterial();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });

    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateMaterial").hide();
        $("#btInsertMaterial").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateMaterial").show();
        $("#btInsertMaterial").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
            for (var i = 0; i < listMaterial.length; i++) {
                if (listMaterial[i].Id == $(this).attr('value')) {
                    var aux = listMaterial[i].Id;
                    var aux1 = listMaterial[i].Status.Id;
                    var aux2 = listMaterial[i].Description;
                    var aux3 = listMaterial[i].PriceFlatPanel;
                    var aux4 = listMaterial[i].PriceRaisedPanel;
                    $('#inId').val(listMaterial[i].Id);
                    $('#inStatus').val(listMaterial[i].Status.Id);
                    $('#inDescription').val(listMaterial[i].Description);
                    $('#inPriceFlatPanel').val(listMaterial[i].PriceFlatPanel);
                    $('#inPriceRaisedPanel').val(listMaterial[i].PriceRaisedPanel);
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

    $('#inPriceFLatPanel').removeClass("is-invalid");
    $('#inPriceFLatPanel').val("");

    $('#inRaisedFLatPanel').removeClass("is-invalid");
    $('#inRaisedFLatPanel').val("");

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);
}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    if ($('#inDescription').val() == "") {
        $('#inDescription').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDescription').removeClass("is-invalid");
    }

    if ($('#inPriceFLatPanel').val() == "") {
        $('#inPriceFLatPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPriceFLatPanel').removeClass("is-invalid");
    }

    if ($('#inRaisedFLatPanel').val() == "") {
        $('#inRaisedFLatPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#inRaisedFLatPanel').removeClass("is-invalid");
    }
    return aux;
}

function InsertMaterial() {

    var datos =
    {
        pMaterial: {
            Description: $("#inDescription").val(),
            PriceFlatPanel: parseFloat($("#inPriceFLatPanel").val()),
            PriceRaisedPanel: parseFloat($("#inPriceRaisedPanel").val()),
            Status: { Id: $("#inStatus").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertMaterial,
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
function UpdateMaterial() {

    var datos =
    {
        uMaterial: {
            Id: $("#inId").val(),
            Description: $("#inDescription").val(),
            PriceFlatPanel: parseFloat($("#inPriceFlatPanel").val()),
            PriceRaisedPanel: parseFloat($("#inPriceRaisedPanel").val()),
            Status: { Id: $("#inStatus").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateMaterial,
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