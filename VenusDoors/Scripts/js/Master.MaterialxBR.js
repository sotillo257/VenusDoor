$(document).ready(function () {
    GetAllStatus();
    GetAllBottomRail();
    GetAllMaterial();

    $("#btInsertMaterialxBR").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertMaterialxBottomRail();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateMaterialxBottom").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateMaterialxBottomRail();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateMaterialxBottom").hide();
        $("#btInsertMaterialxBR").show();
        Limpiar();
    });

    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateMaterialxBottom").show();
        $("#btInsertMaterialxBR").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listMBR.length; i++) {
            if (listMBR[i].Id == $(this).attr('value')) {
                var aux = listMBR[i].Id;
                var aux1 = listMBR[i].Status.Id;
                var aux2 = listMBR[i].BottomRail.Id;
                var aux3 = listMBR[i].Material.Id;
                $('#inId').val(listMBR[i].Id);
                $('#inMaterial').val(listMBR[i].Material.Id);
                $('#inBottomRail').val(listMBR[i].BottomRail.Id);
                $('#inStatus').val(listMBR[i].Status.Id);
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
    $('#inMaterial').removeClass("is-invalid");
    $('#inMaterial').val(0);

    $('#inBottomRail').removeClass("is-invalid");
    $('#inBottomRail').val(0);

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

    if ($('#inMaterial').val() == 0) {
        $('#inMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#inMaterial').removeClass("is-invalid");
    }

    if ($('#inBottomRail').val() == 0) {
        $('#inBottomRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inBottomRail').removeClass("is-invalid");
    }

    return aux;
}

function InsertMaterialxBottomRail() {

    var datos =
    {
        pMaterialxBottomRail: {
            Material: { Id: $("#inMaterial").val() },
            BottomRail: { Id: $("#inBottomRail").val() },
            Status: { Id: $("#inStatus").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertMaterialxBottomRail,
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
function UpdateMaterialxBottomRail() {

    var datos =
    {
        uMaterialxBottomRail: {
            Id: $("#inId").val(),
            Material: { Id: $("#inMaterial").val() },
            BottomRail: { Id: $("#inBottomRail").val() },
            Status: { Id: $("#inStatus").val() },

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateMaterialxBottomRail,
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
function GetAllBottomRail() {
    $.ajax({
        url: urlGetAllBottomRail,
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
                $("#inBottomRail").empty().append(option);

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
function GetAllMaterial() {
    $.ajax({
        url: urlGetAllMaterial,
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
                $("#inMaterial").empty().append(option);

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