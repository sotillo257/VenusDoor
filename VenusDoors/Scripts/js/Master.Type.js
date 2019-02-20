﻿$(document).ready(function () {
    GetAllGroup();

    $("#btInsertType").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertType();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateType").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateType();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateType").hide();
        $("#btInsertType").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateType").show();
        $("#btInsertType").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listTy.length; i++) {
            if (listTy[i].Id == $(this).attr('value')) {
                var aux = listTy[i].Id;
                var aux1 = listTy[i].Description;
                var aux2 = listTy[i].Group.Id;
                $('#intId').val(listTy[i].Id);
                $('#inDescription').val(listTy[i].Description);
                llenarComboGroup(listTy[i].Group.Id);
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
    $('#intId').val(0);
    $('#inDescription').removeClass("is-invalid");
    $('#inDescription').val("");

    $('#inGroup').removeClass("is-invalid");
    llenarComboGroup(0);

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

function InsertType() {

    var datos =
    {
        pTypes: {
            Description: $("#inDescription").val(),
            Group: { Id: $("#inGroup").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertType,
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
function UpdateType() {

    var datos =
    {
        uTypes: {
            Id: $("#intId").val(),
            Description: $("#inDescription").val(),
            Group: { Id: $("#inGroup").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateType,
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

var allGroup = '';
function llenarComboGroup(pGroup) {

    var option = '<option id="">Select</option>';
    for (var i = 0; i < allGroup.length; i++) {
        option += '<option value="' + allGroup[i].Id + '">' + allGroup[i].Description + '</option>';
        
    }
    $("#inGroup").empty().append(option);
    if (pGroup != 0) {
        $("#inGroup").val(pGroup);
    }
}
function GetAllGroup() {
    $.ajax({
        url: urlGetAllGroup,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allGroup = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inGroup").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}