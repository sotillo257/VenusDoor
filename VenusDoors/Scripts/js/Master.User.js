﻿$(document).ready(function () {
    GetAllStatus();
    GetAllType();
    GetAllPerson();

    $("#btnInsertUser").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertUser();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btUpdateUser").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateUser();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btUpdateUser").hide();
        $("#btnInsertUser").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btUpdateUser").show();
        $("#btnInsertUser").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < ListUsuario.length; i++) {
            if (ListUsuario[i].Id == $(this).attr('value')) {
                var aux = ListUsuario[i].Id;
                var aux1 = ListUsuario[i].Email;
                var aux2 = ListUsuario[i].Password;
                var aux3 = ListUsuario[i].Type.Id;
                var aux4 = ListUsuario[i].Person.Id;
                var aux5 = ListUsuario[i].Status.Id;
                $('#inId').val(ListUsuario[i].Id);
                $('#inEmail').val(ListUsuario[i].Email);
                $('#inPassword').val(ListUsuario[i].Password);
                $('#inType').val(ListUsuario[i].Type.Id);
                $('#inPerson').val(ListUsuario[i].Person.Id);
                $('#inStatus').val(ListUsuario[i].Status.Id);
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
    $('#inEmail').removeClass("is-invalid");
    $('#inEmail').val(" ");

    $('#inPassword').removeClass("is-invalid");
    $('#inPassword').val(" ");

    $('#inType').removeClass("is-invalid");
    $('#inType').val(0);

    $('#inPerson').removeClass("is-invalid");
    $('#inPerson').val(0);

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

    if ($('#inEmail').val() == " ") {
        $('#inEmail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inEmail').removeClass("is-invalid");
    }

    if ($('#inPassword').val() == " ") {
        $('#inPassword').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPassword').removeClass("is-invalid");
    }

    if ($('#inType').val() == 0) {
        $('#inType').addClass("is-invalid");
        aux = false;
    } else {
        $('#inType').removeClass("is-invalid");
    }

    if ($('#inPerson').val() == 0) {
        $('#inPerson').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPerson').removeClass("is-invalid");
    }

    return aux;
}

function InsertUser() {

    var datos =
    {
        pUser: {
            Email: $("#inEmail").val(),
            Password: $("#inPassword").val(),
            Type: { Id: $("#inType").val() },
            Person: { Id: $("#inPerson").val() },
            Status: { Id: $("#inStatus").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertUser,
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
function UpdateUser() {

    var datos =
    {
        uUser: {
            Id: $("#inId").val(),
            Email: $("#inEmail").val(),
            Password: $("#inPassword").val(),
            Type: { Id: $("#inType").val() },
            Person: { Id: $("#inPerson").val() },
            Status: { Id: $("#inStatus").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateUser,
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

function GetAllStatus() {
    $.ajax({
        url: urlGetAllStatus,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
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
function GetAllType() {
    $.ajax({
        url: urlGetAllType,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
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
function GetAllPerson() {
    $.ajax({
        url: urlGetAllPerson,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                }
                $("#inPerson").empty().append(option);

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