$(document).ready(function () {

    $("#btInsertHingeDirection").on("click", function () {
        if (ValidarCamposVacios()) {
            InserHingeDirection();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btUpdateHingeDirec").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateHingeDirection();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });

    $("#btInsert").on("click", function () {
        Limpiar();
    });

    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < listHD.length; i++) {
            if (listHD[i].Id == $(this).attr('value')) {
                var aux = listHD[i].Id;
                var aux1 = listHD[i].Status.Id;
                var aux2 = listHD[i].Direction;
                $('#txtId').val(listHD[i].Id);
                $('#txtDirection').val(listHD[i].Direction);
                $('#IdStatus').val(listHD[i].Status.Id);
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
    $('#inDirection').removeClass("is-invalid");
    $('#inDirection').val("");

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);

    $('#txtDirection').removeClass("is-invalid");
    $('#txtDirection').val("");

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

    if ($('#inDirection').val() == "") {
        $('#inDirection').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDirection').removeClass("is-invalid");
    }

    if ($('#txtDirection').val() == "") {
        $('#txtDirection').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtDirection').removeClass("is-invalid");
    }

    return aux;
}

function InserHingeDirection() {

    var datos =
    {
        pHingeDirection: {
            Direction: $("#inDirection").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInserHingeDirection,
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
function UpdateHingeDirection() {

    var datos =
    {
        uHingeDirection: {
            Id: $("#txtId").val(),
            Direction: $("#txtDirection").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateHingeDirection,
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