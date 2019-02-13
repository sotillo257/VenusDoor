$(document).ready(function () {

    $("#btInserTRHD").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertTopRailxHorizontalDivisions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btbUpdateTRHorizonatlDivi").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateTopRailxHorizontalDivisions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < listTRH.length; i++) {
            if (listTRH[i].Id == $(this).attr('value')) {
                var aux = listTRH[i].Id;
                var aux1 = listTRH[i].TopRail.Id;
                var aux2 = listTRH[i].HorizontalDivisions.Id;
                var aux3 = listTRH[i].Status.Id;
                $('#txtId').val(listTRH[i].Id);
                $('#cbTopRail').val(listTRH[i].TopRail.Id);
                $('#cbHorizontalDivisions').val(listTRH[i].HorizontalDivisions.Id);
                $('#IdStatus').val(listTRH[i].Status.Id);
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
    $('#inTopRail').removeClass("is-invalid");
    $('#inTopRail').val(0);

    $('#inHorizontalDivisions').removeClass("is-invalid");
    $('#inHorizontalDivisions').val(0);

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);

    $('#cbTopRail').removeClass("is-invalid");
    $('#cbTopRail').val(0);

    $('#cbHorizontalDivisions').removeClass("is-invalid");
    $('#cbHorizontalDivisions').val(0);

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


    if ($('#inTopRail').val() == 0) {
        $('#inTopRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTopRail').removeClass("is-invalid");
    }

    if ($('#cbTopRail').val() == 0) {
        $('#cbTopRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbTopRail').removeClass("is-invalid");
    }


    if ($('#inHorizontalDivisions').val() == 0) {
        $('#inHorizontalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHorizontalDivisions').removeClass("is-invalid");
    }

    if ($('#cbHorizontalDivisions').val() == 0) {
        $('#cbHorizontalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbHorizontalDivisions').removeClass("is-invalid");
    }

    return aux;
}

function InsertTopRailxHorizontalDivisions() {

    var datos =
    {
        pTopRailByHorizontalDivisions: {
            TopRail: { Id: $("#inTopRail").val() },
            HorizontalDivisions: { Id: $("#inHorizontalDivisions").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertTopRailxHorizontalDivisions,
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
function UpdateTopRailxHorizontalDivisions() {

    var datos =
    {
        uTopRailByHorizontalDivisions: {
            Id: $("#txtId").val(),
            TopRail: { Id: $("#cbTopRail").val() },
            HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateTopRailxHorizontalDivisions,
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