$(document).ready(function () {
    var listDoors = JSON.parse('@Html.Raw(ViewBag.ListDoor)');
    $(document).on('click', '.Door', function (event) {
        SearchDoor(listDoors, $(this).attr('value'));
    });
})

function LlammarModal(TipoModal, Mensaje) {
  
      
            if (TipoModal == "Succes") {
                $("#MensajeSucces").html(Mensaje);
                $("#ModalSuccess").modal("show");
            }
            if (TipoModal == "Danger") {
                $("#MensageDanger").html(Mensaje);
                $("#modalMaximo").modal("show");
            }
            
   

}