﻿$(document).ready(function () {

    $(".btnn-dele").click(function (e) {
        e.preventDefault();
        var id = $(this).parentsUntil('#id-table').find('.btnn-dele').attr('data-id');
        $('#modalDelete').modal('toggle');
        $('#deleteidhidden').val(id);
    });

    $("#btnDelete").click(function () {
        DltItem();
    });  
});

function DltItem() {
    var datos =
                    {
                        itemID: $('#deleteidhidden').val(),
                        ord: {
                            Id: $("#idorder").val(),
                            Status: { Id: $("#idstatus").val() },
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
                LlammarModal("Sing", "Success! It has been removed correctly.", " ");
                location.reload();
            } else {
                LlammarModal("Danger", "Error! An error occurred while deleting..", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}
