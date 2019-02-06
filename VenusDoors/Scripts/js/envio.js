$(document).ready(function () {

    $("#btn-continue").on("click", function () {
        ConfirmOrder();
    });
});

//function Continuar() {
//    var OrderSummary = $("#idOrderSummary").val();
//    console.log(datos);
//    $.ajax({
//        type: 'POST',
//        url: urlConfirmOrder,
//        success: function (result) {

//            if (result == true) {
//                $('#modalCongra').modal('toggle');
//            } else {
//                $('#modalError').modal('toggle');
//            }
//        },
//        error: function (err) {
//            alert("error");
//        },

//    });
//}

function ConfirmOrder() {

    var datos =
    {
        ord: {
            Id: $("#idorder").val(),
            Total: $("#idtotal").val(),
            Status:{Id: $("#idstatus").val()}

        }
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlConfirmOrder,
        //Envío de parámetros
        data: data,
        //Se ejecutó correctamente
        success: function (data) {
            if (data == true) {
                LlammarModal("Sing", "Congratulations! The creation of your order has been successful.", " ");
                            } else {
                LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
                            }
        },
        error: function (err) {
            alert("error");
        },

    });
}