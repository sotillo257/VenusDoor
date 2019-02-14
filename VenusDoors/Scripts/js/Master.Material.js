$(document).ready(function () {

    $("#btInsertMaterial").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertMaterial();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateMaterial").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateMaterial();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });

    $("#btInsert").on("click", function () {
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
            for (var i = 0; i < listMaterial.length; i++) {
                if (listMaterial[i].Id == $(this).attr('value')) {
                    var aux = listMaterial[i].Id;
                    var aux1 = listMaterial[i].Status.Id;
                    var aux2 = listMaterial[i].Description;
                    var aux3 = listMaterial[i].PriceFlatPanel;
                    var aux4 = listMaterial[i].PriceRaisedPanel;
                    $('#txtId').val(listMaterial[i].Id);
                    $('#IdStatus').val(listMaterial[i].Status.Id);
                    $('#txtDescription').val(listMaterial[i].Description);
                    $('#txtPriceFlatPanel').val(listMaterial[i].PriceFlatPanel);
                    $('#txtPriceRaisedPanel').val(listMaterial[i].PriceRaisedPanel);
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

    $('#inPriceFLatPanel').removeClass("is-invalid");
    $('#inPriceFLatPanel').val("");

    $('#inRaisedFLatPanel').removeClass("is-invalid");
    $('#inRaisedFLatPanel').val("");

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);

    $('#txtDescription').removeClass("is-invalid");
    $('#txtDescription').val("");

    $('#txtPriceFLatPanel').removeClass("is-invalid");
    $('#txtPriceFLatPanel').val("");

    $('#txtRaisedFLatPanel').removeClass("is-invalid");
    $('#txtRaisedFLatPanel').val("");

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

    if ($('#inPriceFLatPanel').val() == "") {
        $('#inPriceFLatPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPriceFLatPanel').removeClass("is-invalid");
    }

    if ($('#inRaisedFLatPanel').val() == "") {
        $('#inRaisedFLatPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#inRaisedFLatPanel').removeClass("is-invalid");
    }

    if ($('#txtPriceFLatPanel').val() == "") {
        $('#txtPriceFLatPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtPriceFLatPanel').removeClass("is-invalid");
    }

    if ($('#txtPriceRaisedPanel').val() == "") {
        $('#txtPriceRaisedPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtPriceRaisedPanel').removeClass("is-invalid");
    }

    return aux;
}

function InsertMaterial() {

    var datos =
    {
        pMaterial: {
            Description: $("#inDescription").val(),
            PriceFlatPanel: parseFloat($("#inPriceFLatPanel").val()),
            PriceRaisedPanel: parseFloat($("#inPriceRaisedPanel").val()),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertMaterial,
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
function UpdateMaterial() {

    var datos =
    {
        uMaterial: {
            Id: $("#txtId").val(),
            Description: $("#txtDescription").val(),
            PriceFlatPanel: parseFloat($("#txtPriceFLatPanel").val()),
            PriceRaisedPanel: parseFloat($("#txtPriceRaisedPanel").val()),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateMaterial,
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