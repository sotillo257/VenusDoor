$(document).ready(function () {

    $("#btnInsertDS").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertDoorStyle();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateDoorStyle").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateDoorStyle();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        Limpiar();
    });

    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < ListDoorsStyle.length; i++) {
            if (ListDoorsStyle[i].Id == $(this).attr('value')) {

                var aux = ListDoorsStyle[i].Id;
                var aux1 = ListDoorsStyle[i].Status.Id;
                var aux2 = ListDoorsStyle[i].Description;
                $('#txtId').val(ListDoorsStyle[i].Id);
                $('#txtDescription').val(ListDoorsStyle[i].Description);
                $('#IdStatus').val(ListDoorsStyle[i].Status.Id);
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

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);

    $('#txtDescription').removeClass("is-invalid");
    $('#txtDescription').val("");

    $('#IdStatus').removeClass("is-invalid");
    $('#IdStatus').val(0);

}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    if ($('#IdStatus').val() == 0) {
        $('#IdStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#IdStatus').removeClass("is-invalid");
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

function InsertDoorStyle() {

    var datos =
    {
        pDoorStyle: {
            Description: $("#inDescription").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorStyle,
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
function UpdateDoorStyle() {

    var datos =
    {
        uDoorStyle: {
            Id: $("#txtId").val(),
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,
        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoorStyle,
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