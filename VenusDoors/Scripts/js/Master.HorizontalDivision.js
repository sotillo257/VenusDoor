$(document).ready(function () {

    $("#btnInsertHD").on("click", function () {
        if (ValidarCamposVacios()) {
            InserHorizontalDivisions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateHorizontalDivi").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateHorizontalDivisions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        Limpiar();
    });

    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < listHoDi.length; i++) {
            if (listHoDi[i].Id == $(this).attr('value')) {

                var aux = listHoDi[i].Id;
                var aux1 = listHoDi[i].Status.Id;
                var aux2 = listHoDi[i].Quantity;
                $('#txtId').val(listHoDi[i].Id);
                $('#IdStatus').val(listHoDi[i].Status.Id);
                $('#txtQuantity').val(listHoDi[i].Quantity);
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
    $('#inQuantity').removeClass("is-invalid");
    $('#inQuantity').val("");

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);

    $('#txtQuantity').removeClass("is-invalid");
    $('#txtQuantity').val("");

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

    if ($('#inQuantity').val() == "") {
        $('#inQuantity').addClass("is-invalid");
        aux = false;
    } else {
        $('#inQuantity').removeClass("is-invalid");
    }

    if ($('#txtQuantity').val() == "") {
        $('#txtQuantity').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtQuantity').removeClass("is-invalid");
    }

    return aux;
}

function InserHorizontalDivisions() {

    var datos =
    {
        pHorizontalDivisions: {
            Quantity: $("#inQuantity").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInserHorizontalDivisions,
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
function UpdateHorizontalDivisions() {

    var datos =
    {
        uHorizontalDivisions: {
            Id: $("#txtId").val(),
            Quantity: $("#txtQuantity").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateHorizontalDivisions,
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