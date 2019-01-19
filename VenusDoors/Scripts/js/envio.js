$(document).ready(function () {

    $("#btn-continue").on("click", function () {
        Continuar();
    });

});

function Continuar() {
    var datos =
                    {
                        //itemID: $("#valitemID").val(),
                        //itemSub:$("#valitemSub").val(),
                        //itemQtt: $("#valitemQtt").val(),
                        itemOrder: $("#valitemIDOrder").val(),
                    }

    console.log(datos);
    $.ajax({
        type: 'POST',
        url: urlConfirmOrder,
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