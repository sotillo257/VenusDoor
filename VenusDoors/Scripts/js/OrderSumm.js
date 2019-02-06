$(document).ready(function () {

    $(".btnn-dele").click(function (e) {
        e.preventDefault();
        var id = $(this).parentsUntil('#id-table').find('.btnn-dele').attr('data-id');
        Id: id
        DltItem(id);
    });
});

function DltItem(id) {
    var datos =
                    {
                        itemID: id,
                        ord: {
                            Id: $("#idorder").val(),
                        }
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
                location.reload();
            } else {
                alert("Failed");
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
