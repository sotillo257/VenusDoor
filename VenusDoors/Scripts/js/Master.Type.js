$(document).ready(function () {

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
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < listTy.length; i++) {
            if (listTy[i].Id == $(this).attr('value')) {
                var aux = listTy[i].Id;
                var aux1 = listTy[i].Description;
                var aux2 = listTy[i].Group.Id;
                $('#txtId').val(listTy[i].Id);
                $('#txtDescription').val(listTy[i].Description);
                $('#IdGroup').val(listTy[i].Group.Id);
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
    $('#inDescription').removeClass("is-invalid");
    $('#inDescription').val("");

    $('#inGroup').removeClass("is-invalid");
    $('#inGroup').val(0);

    $('#txtDescription').removeClass("is-invalid");
    $('#txtDescription').val("");

    $('#IdGroup').removeClass("is-invalid");
    $('#IdGroup').val(0);

}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inGroup').val() == 0) {
        $('#inGroup').addClass("is-invalid");
        aux = false;
    } else {
        $('#inGroup').removeClass("is-invalid");
    }

    if ($('#IdGroup').val() == 0) {
        $('#IdGroup').addClass("is-invalid");
        aux = false;
    } else {
        $('#IdGroup').removeClass("is-invalid");
    }

    if ($('#inDescription').val() == "") {
        $('#inDescription').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDescription').removeClass("is-invalid");
    }

    if ($('#txtDescription').val() == "") {
        $('#txtDescription').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtDescription').removeClass("is-invalid");
    }

    return aux;
}

function InsertType() {

    var datos =
    {
        pTypes: {
            Description: $("#inDescription").val(),
            Group: { Id: $("#inGroup").val() },
            CreatorUser: 6,
            ModificationUser: 6,

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
            Id: $("#txtId").val(),
            Description: $("#txtDescription").val(),
            Group: { Id: $("#IdGroup").val() },
            CreatorUser: 6,
            ModificationUser: 6,

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