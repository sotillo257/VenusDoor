$(document).ready(function () {

    $("#btInsertOrder").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertOrder();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateOrder").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateOrder();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < listORDER.length; i++) {
            if (listORDER[i].Id == $(this).attr('value')) {

                var aux = listORDER[i].Id;
                var aux1 = listORDER[i].User.Id;
                var aux2 = listORDER[i].Quantity;
                var aux3 = listORDER[i].Total;
                var aux4 = listORDER[i].Type.Id;
                var aux5 = listORDER[i].Status.Id;

                $('#txtId').val(listORDER[i].Id);
                $('#cbUser').val(listORDER[i].User.Id);
                $('#txtQuantity').val(listORDER[i].Quantity);
                $('#txtTotal').val(listORDER[i].Total);
                $('#IdType').val(listORDER[i].Type.Id);
                $('#IdStatus').val(listORDER[i].Status.Id);
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
    
    $('#inUser').removeClass("is-invalid");
    $('#inUser').val(0);

    $('#inQuantity').removeClass("is-invalid");
    $('#inQuantity').val("");

    $('#inTotal').removeClass("is-invalid");
    $('#inTotal').val("");

    $('#inType').removeClass("is-invalid");
    $('#inType').val(0);

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);


    $('#cbUser').removeClass("is-invalid");
    $('#cbUser').val(0);

    $('#txtQuantity').removeClass("is-invalid");
    $('#txtQuantity').val("");

    $('#txtTotal').removeClass("is-invalid");
    $('#txtTotal').val("");

    $('#IdType').removeClass("is-invalid");
    $('#IdType').val(0);

    $('#IdStatus').removeClass("is-invalid");
    $('#IdStatus').val(0);

}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inUser').val() == 0) {
        $('#inUser').addClass("is-invalid");
        aux = false;
    } else {
        $('#inUser').removeClass("is-invalid");
    }

    if ($('#cbUser').val() == 0) {
        $('#cbUser').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbUser').removeClass("is-invalid");
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

    if ($('#inTotal').val() == "") {
        $('#inTotal').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTotal').removeClass("is-invalid");
    }

    if ($('#txtTotal').val() == "") {
        $('#txtTotal').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtTotal').removeClass("is-invalid");
    }

    if ($('#inType').val() == 0) {
        $('#inType').addClass("is-invalid");
        aux = false;
    } else {
        $('#inType').removeClass("is-invalid");
    }

    if ($('#IdType').val() == 0) {
        $('#IdType').addClass("is-invalid");
        aux = false;
    } else {
        $('#IdType').removeClass("is-invalid");
    }

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

    return aux;
}

function InsertOrder() {

    var datos =
    {
        pOrder: {
            User: { Id: $("#inUser").val() },
            Quantity: $("#inQuantity").val(),
            Total: $("#inTotal").val(),
            Type: { Id: $("#inType").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertOrder,
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
function UpdateOrder() {

    var datos =
    {
        uOrder: {
            Id: $("#txtId").val(),
            User: { Id: $("#cbUser").val() },
            Quantity: $("#txtQuantity").val(),
            Total: $("#txtTotal").val(),
            Type: { Id: $("#IdType").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOrder,
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