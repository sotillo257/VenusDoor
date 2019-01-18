$(document).ready(function () {

    $("#btn-delete").on("click", function () {
        DltItem();
    });

});

function DltItem() {
    var datos =
                    {
                        itemID: $("#valitemID").val(),
                        //itemSub:$("#valitemSub").val(),
                        //itemQtt: $("#valitemQtt").val(),
                        //itemOrder: $("#valitemIDOrder").val(),
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
                alert("Delete complete");
            } else {
                alert("No");
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}