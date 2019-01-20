$(document).ready(function () {

    $("#btn-continue").on("click", function () {
        Continuar();
    });
});

function Continuar() {
    var datos = $("#idOrderSummary").val();
    console.log(datos);
    $.ajax({
        type: 'POST',
        url: urlConfirmOrder,
        success: function (result) {

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