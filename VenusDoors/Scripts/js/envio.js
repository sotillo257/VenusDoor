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
                $('#modalCongra').modal('toggle');
                            } else {
                $('#modalError').modal('toggle');
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