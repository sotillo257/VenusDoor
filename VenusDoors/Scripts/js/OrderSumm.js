﻿$(document).ready(function () {

    $(".btnn-dele").click(function (e) {
        e.preventDefault();
        var id = $(this).parentsUntil('#id-table').find('.btnn-dele').attr('data-id');
        $('#modalDelete').modal('toggle');
        $('#deleteidhidden').val(id);
    });

    $("#btnDelete").click(function () {
        DltItem();
    });

    $("#button-cnt").click(function () {
        window.location.href = '/OrderStatus/Index';
    });

    $("#btnupp").on('click', function () {
        $("#File1").trigger('click');
    });

    $("#btn-continue").on("click", function () {
        LlammarModal("ConfirmOrdenSummary", "Confirm", "Do you want to process your order?",
        '<button onclick="ConfirmOrder();" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Confirm order</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });

});

function DltItem() {
    var datos =
                    {
                        itemID: $('#deleteidhidden').val(),
                        orderid: $("#idorder").val(),
                            
                     }
              
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlDeleteItem,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                llenarTablaOrderSumary();
                $('#modalDelete').modal('hide');
                LlammarModal("CongDelete", "Success! It has been removed correctly.", " ");
            } else {
                $('#modalDelete').modal('hide');
                LlammarModal("Danger", "Error! An error occurred while deleting..", " ");
            }
        },
        error: function (err) {
            $('#modalDelete').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },
    });
}

function ConfirmOrder() {

    var datos =
    {
        ord: {
            Id: $("#idorder").val(),
            Total: $("#idtotal").val(),
            Status: { Id: $("#idstatus").val() }
        },

    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlConfirmOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == true) {
                $('#modalInsert').modal('hide');
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Congratuletions", "Congratulations! Your order is being processed.", "At this time you will be redirected to the Order Status view. Check your email to see your order details.");
            } else {
                LlammarModal("Danger", "An error occurred during the process.", " ");
                $("#btn-continue").prop('disabled', false);
            }
        },
        error: function (err) {
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}
