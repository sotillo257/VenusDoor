﻿$(document).ready(function () {
    GetAllUser();
    GetAllStatus();
    GetAllType();

    $("#btInsertOrder").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertOrder();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateOrder").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateOrder();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateOrder").hide();
        $("#btInsertOrder").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateOrder").show();
        $("#btInsertOrder").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listORDER.length; i++) {
            if (listORDER[i].Id == $(this).attr('value')) {

                var aux = listORDER[i].Id;
                var aux1 = listORDER[i].User.Id;
                var aux2 = listORDER[i].Quantity;
                var aux3 = listORDER[i].Total;
                var aux4 = listORDER[i].Type.Id;
                var aux5 = listORDER[i].Status.Id;

                $('#inId').val(listORDER[i].Id);
                llenarComboUser(listORDER[i].User.Id);
                $('#inQuantity').val(listORDER[i].Quantity);
                $('#inTotal').val(listORDER[i].Total);
                llenarComboType(listORDER[i].Type.Id);
                llenarComboEstatus(listORDER[i].Status.Id);
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
    $('#inUser').removeClass("is-invalid");
    llenarComboUser(0);

    $('#inQuantity').removeClass("is-invalid");
    $('#inQuantity').val("");

    $('#inTotal').removeClass("is-invalid");
    $('#inTotal').val("");

    $('#inType').removeClass("is-invalid");
    llenarComboType(0);

    $('#inStatus').removeClass("is-invalid");
    llenarComboEstatus(0);

}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inUser').val() == 0) {
        $('#inUser').addClass("is-invalid");
        aux = false;
    } else {
        $('#inUser').removeClass("is-invalid");
    }

    if ($('#inQuantity').val() == "") {
        $('#inQuantity').addClass("is-invalid");
        aux = false;
    } else {
        $('#inQuantity').removeClass("is-invalid");
    }

    if ($('#inTotal').val() == "") {
        $('#inTotal').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTotal').removeClass("is-invalid");
    }

    if ($('#inType').val() == 0) {
        $('#inType').addClass("is-invalid");
        aux = false;
    } else {
        $('#inType').removeClass("is-invalid");
    }

    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    return aux;
}

function InsertOrder() {

    var datos =
    {
        pOrder: {
            User: { Id: $("#inUser").val() },
            Quantity: $("#inQuantity").val(),
            Total: $("#inTotal").val(),
            Type: { Id: $("#inType").val() },
            Status: { Id: $("#inStatus").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertOrder,
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
function UpdateOrder() {

    var datos =
    {
        uOrder: {
            Id: $("#inId").val(),
            User: { Id: $("#inUser").val() },
            Quantity: $("#inQuantity").val(),
            Total: $("#inTotal").val(),
            Type: { Id: $("#inType").val() },
            Status: { Id: $("#inStatus").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOrder,
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

var allEstatus = '';
function llenarComboEstatus(pStatus) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allEstatus.length; i++) {
        if (allEstatus[i].Group.Id == 1) {
            option += '<option value="' + allEstatus[i].Id + '">' + allEstatus[i].Description + '</option>';
        }


    }
    $("#inStatus").empty().append(option);
    if (pStatus != 0) {
        $("#inStatus").val(pStatus);
    }
}
function GetAllStatus() {
    $.ajax({
        url: urlGetAllStatus,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allEstatus = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inStatus").empty().append(option);

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

var allUser = '';
function llenarComboUser(pUser) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allUser.length; i++) {
        if (allUser[i].Status.Id == 1) {
            option += '<option value="' + allUser[i].Id + '">' + allUser[i].Email + '</option>';
        }


    }
    $("#inUser").empty().append(option);
    if (pUser != 0) {
        $("#inUser").val(pUser);
    }
}
function GetAllUser() {
    $.ajax({
        url: urlGetAllUser,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allUser = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Email + '</option>';
                }
                $("#inUser").empty().append(option);

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

var allType = '';
function llenarComboType(pType) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allType.length; i++) {
        if (allType[i].Group.Id == 1) {
            option += '<option value="' + allType[i].Id + '">' + allType[i].Description + '</option>';
        }


    }
    $("#inType").empty().append(option);
    if (pType != 0) {
        $("#inType").val(pType);
    }
}
function GetAllType() {
    $.ajax({
        url: urlGetAllType,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allType = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inType").empty().append(option);

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