$(document).ready(function () {
    var listDoors = JSON.parse('@Html.Raw(ViewBag.ListDoor)');
    $(document).on('click', '.Door', function (event) {
        SearchDoor(listDoors, $(this).attr('value'));
    });
})

function LlammarModal(TipoModal, Titulo, Mensaje) {
  
      
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

            if (TipoModal == "MLogin") {
                $("#TituloLogin").html(Titulo);
                $("#ModalLogin").modal("show");
            }

            if (TipoModal == "Sing") {
                $("#TituloSing").html(Titulo);
                $("#MensageSing").html(Mensaje);
                $("#modalCongraSing").modal("show");
            }

            if (TipoModal == "Congratuletions") {
                $("#TituloCongratuletions").html(Titulo);
                $("#MensageCongratuletions").html(Mensaje);
                $("#modalCongra").modal("show");
            }

}