$(document).ready(function () {

    $("#btn-continue").on("click", function () {
        ConfirmOrder();
    });
});


function ConfirmOrder() {
    
    var datos =
    {
        ord: {
            Id: $("#idorder").val(),
            Total: $("#idtotal").val(),
            Status:{Id: $("#idstatus").val()}
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
                LlammarModal("Congratuletions", "Congratulations! Your order is being processed.", "At this time you will be redirected to the Order Status view. Check your email to see your order details.");               
                            } else {
                LlammarModal("Danger", "An error occurred during the process.", " ");
                $("#btn-continue").prop('disabled', false);
                            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}