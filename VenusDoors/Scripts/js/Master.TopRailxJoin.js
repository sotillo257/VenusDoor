$(document).ready(function () {

    $("#btnInsertTopRJ").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertTopRailByJoin();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateTRJoin").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateTopRailByJoin();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < listTRJ.length; i++) {
            if (listTRJ[i].Id == $(this).attr('value')) {
                var aux = listTRJ[i].Id;
                var aux1 = listTRJ[i].TopRail.Id;
                var aux2 = listTRJ[i].Join.Id;
                var aux3 = listTRJ[i].Status.Id;
                $('#txtId').val(listTRJ[i].Id);
                $('#cbTopRail').val(listTRJ[i].TopRail.Id);
                $('#cbJoin').val(listTRJ[i].Join.Id);
                $('#IdStatus').val(listTRJ[i].Status.Id);
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

    $('#inJoin').removeClass("is-invalid");
    $('#inJoin').val(0);

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);

    $('#cbTopRail').removeClass("is-invalid");
    $('#cbTopRail').val(0);

    $('#cbJoin').removeClass("is-invalid");
    $('#cbJoin').val(0);

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


    if ($('#inJoin').val() == 0) {
        $('#inJoin').addClass("is-invalid");
        aux = false;
    } else {
        $('#inJoin').removeClass("is-invalid");
    }

    if ($('#cbJoin').val() == 0) {
        $('#cbJoin').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbJoin').removeClass("is-invalid");
    }

    return aux;
}

function InsertTopRailByJoin() {

    var datos =
    {
        pTopRailByJoin: {
            TopRail: { Id: $("#inTopRail").val() },
            Join: { Id: $("#inJoin").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertTopRailByJoin,
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
function UpdateTopRailByJoin() {

    var datos =
    {
        uTopRailByJoin: {
            Id: $("#txtId").val(),
            TopRail: { Id: $("#cbTopRail").val() },
            Join: { Id: $("#cbJoin").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateTopRailByJoin,
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