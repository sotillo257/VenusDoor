$(document).ready(function () {

    $(document).on("click", ".btnn-dele", function (e) {
       // e.preventDefault();
        var id = $(this).parentsUntil('#id-table').find('.btnn-dele').attr('data-id');
        $('#modalDelete').modal('toggle');
        $('#deleteidhidden').val(id);
    });

    $(document).on("click", "#btnDelete", function () {
        DltItem();
    });

    $(document).on("click", "#button-cnt", function () {
        window.location.href = '/OrderStatus/Index';
    });

    $(document).on('click', "#btnupp", function () {
        $("#File1").trigger('click');
    });

    $(document).on("click", "#btn-continue", function () {
        LlammarModal("ConfirmOrdenSummary", "Confirm", "Do you want to process your order?",
        '<button onclick="SendOrder();" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Confirm order</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });
    
});

function SendOrder() {
    if (ValidarShipping()) {
        ConfirmOrder();
    } else {
        LlammarModal("Danger", "Select the shipping address or add a new one.", " ");
    }
}

function DltItem() {
    var datos =
                    {
                        itemID: $('#deleteidhidden').val(),
                        orderid: $("#idorder").val(),                            
                     }
              
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlDeleteItem,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                //llenarTablaOrderSumary();
                //llenarheaderOrder();
                $('#modalDelete').modal('hide');
                LlammarModal("CongDelete", "Success! It has been removed correctly.", " ");
                llenarTablaOrderSumary();
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
            Status: { Id: $("#idstatus").val() },
            Observations: $("#inObservations").val(),
            ShippingAddress: { Id: $("#cbShippingAddress").val()}
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
                $('#modalConfirmOrderSummary').modal('hide');
            }
        },
        error: function (err) {
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}

function ValidarShipping() {
    var aux = true;
    if ($('#cbShippingAddress').val() == 0) {
        $('#cbShippingAddress').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbShippingAddress').removeClass("is-invalid");
    }

    return aux;
}
