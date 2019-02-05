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
    ConverExcel('idOrderSummary', 'W3C Example Table');
    var OrderSummary = $("#idOrderSummary").val();

    var data = new FormData();
    data.append("idOrderSummary", idOrderSummary);

    //Llamado ajax
    $.ajax({
        //Controlador - Método
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
        //Configuraciones adicionales internas para ajax
        processData: false,
        contentType: false,
        type: "POST",
        datatype: "json",
        error: function (xhr, ajaxOptions, thrownError) {
            console.log(xhr.status);
            console.log(thrownError);
            console.log(xhr.responseText);
        }
    });
}