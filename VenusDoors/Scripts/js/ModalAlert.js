$(document).ready(function () {
    var listDoors = JSON.parse('@Html.Raw(ViewBag.ListDoor)');
    $(document).on('click', '.Door', function (event) {
        SearchDoor(listDoors, $(this).attr('value'));
    });
})

function LlammarModal(TipoModal, Mensaje, Titulo) {
  
      
    if (TipoModal == "Succes") {
                $("#TituloSucces").html(Titulo);
                $("#MensajeSucces").html(Mensaje);
                $("#ModalSuccess").modal("show");
            }
            if (TipoModal == "Danger") {
                $("#TituloDanger").html(Titulo);
                $("#MensageDanger").html(Mensaje);
                $("#modalError").modal("show");
            }

            if (TipoModal == "Login") {
                $("#TituloLogin").html(Titulo);
                $("#ModalLogin").modal("show");
            }

}