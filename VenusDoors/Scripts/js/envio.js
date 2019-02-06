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
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
