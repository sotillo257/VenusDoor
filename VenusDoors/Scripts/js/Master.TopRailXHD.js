$(document).ready(function () {
    GetAllStatus();
    GetAllHorizontalDivisions();
    GetAllTopRail();

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
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btbUpdateTRHorizonatlDivi").hide();
        $("#btInserTRHD").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btbUpdateTRHorizonatlDivi").show();
        $("#btInserTRHD").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listTRH.length; i++) {
            if (listTRH[i].Id == $(this).attr('value')) {
                var aux = listTRH[i].Id;
                var aux1 = listTRH[i].TopRail.Id;
                var aux2 = listTRH[i].HorizontalDivisions.Id;
                var aux3 = listTRH[i].Status.Id;
                $('#inId').val(listTRH[i].Id);
                $('#inTopRail').val(listTRH[i].TopRail.Id);
                $('#inHorizontalDivisions').val(listTRH[i].HorizontalDivisions.Id);
                $('#inStatus').val(listTRH[i].Status.Id);
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
    $('#inTopRail').removeClass("is-invalid");
    $('#inTopRail').val(0);

    $('#inHorizontalDivisions').removeClass("is-invalid");
    $('#inHorizontalDivisions').val(0);

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

    if ($('#inTopRail').val() == 0) {
        $('#inTopRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTopRail').removeClass("is-invalid");
    }

    if ($('#inHorizontalDivisions').val() == 0) {
        $('#inHorizontalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHorizontalDivisions').removeClass("is-invalid");
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
            Id: $("#inId").val(),
            TopRail: { Id: $("#inTopRail").val() },
            HorizontalDivisions: { Id: $("#inHorizontalDivisions").val() },
            Status: { Id: $("#inStatus").val() },

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
function GetAllHorizontalDivisions() {
    $.ajax({
        url: urlGetAllHorizontalDivisions,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';
                }
                $("#inHorizontalDivisions").empty().append(option);

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
function GetAllTopRail() {
    $.ajax({
        url: urlGetAllTopRail,
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
                $("#inTopRail").empty().append(option);

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