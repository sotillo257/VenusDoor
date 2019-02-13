$(document).ready(function () {

    $("#btnInsertTopVD").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertTopRailByVerticalDivisions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btUpdateTRVDivi").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateTopRailByVerticalDivisions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < listTRV.length; i++) {
            if (listTRV[i].Id == $(this).attr('value')) {
                var aux = listTRV[i].Id;
                var aux1 = listTRV[i].TopRail.Id;
                var aux2 = listTRV[i].VerticalDivisions.Id;
                var aux3 = listTRV[i].Status.Id;
                $('#txtId').val(listTRV[i].Id);
                $('#cbTopRail').val(listTRV[i].TopRail.Id);
                $('#cbVerticalDivisions').val(listTRV[i].VerticalDivisions.Id);
                $('#IdStatus').val(listTRV[i].Status.Id);
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

    $('#inVerticalDivisions').removeClass("is-invalid");
    $('#inVerticalDivisions').val(0);

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);

    $('#cbTopRail').removeClass("is-invalid");
    $('#cbTopRail').val(0);

    $('#cbVerticalDivisions').removeClass("is-invalid");
    $('#cbVerticalDivisions').val(0);

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


    if ($('#inVerticalDivisions').val() == 0) {
        $('#inVerticalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#inVerticalDivisions').removeClass("is-invalid");
    }

    if ($('#cbVerticalDivisions').val() == 0) {
        $('#cbVerticalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbVerticalDivisions').removeClass("is-invalid");
    }

    return aux;
}

function InsertTopRailByVerticalDivisions() {

    var datos =
    {
        pTopRailByVerticalDivisions: {
            TopRail: { Id: $("#inTopRail").val() },
            VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertTopRailByVerticalDivisions,
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
function UpdateTopRailByVerticalDivisions() {

    var datos =
    {
        uTopRailByVerticalDivisions: {
            Id: $("#txtId").val(),
            TopRail: { Id: $("#cbTopRail").val() },
            VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateTopRailByVerticalDivisions,
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