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
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btUpdateHingeDirec").hide();
        $("#btInsertHingeDirection").show();
        Limpiar();
    });

    $(document).on('click', '.Modificar', function (event) {
        $("#btUpdateHingeDirec").show();
        $("#btInsertHingeDirection").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listHD.length; i++) {
            if (listHD[i].Id == $(this).attr('value')) {
                var aux = listHD[i].Id;
                var aux1 = listHD[i].Status.Id;
                var aux2 = listHD[i].Direction;
                $('#inId').val(listHD[i].Id);
                $('#inDirection').val(listHD[i].Direction);
                $('#inStatus').val(listHD[i].Status.Id);
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
    $('#inDirection').removeClass("is-invalid");
    $('#inDirection').val("");

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

    if ($('#inDirection').val() == "") {
        $('#inDirection').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDirection').removeClass("is-invalid");
    }

    return aux;
}

function InserHingeDirection() {

    var datos =
    {
        pHingeDirection: {
            Direction: $("#inDirection").val(),
            Status: { Id: $("#inStatus").val() },

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
            Id: $("#inId").val(),
            Direction: $("#inDirection").val(),
            Status: { Id: $("#inStatus").val() },

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