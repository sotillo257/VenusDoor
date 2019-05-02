function LlammarModal(TipoModal, Titulo, Mensaje, boton) {
  
      
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
                $("#MensageLogin").html(Mensaje);
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

            if (TipoModal == "OrderSummary") {
                $("#TituloOS").html(Titulo);
                $("#MensageOS").html(Mensaje);
                $("#modalCompleteOrder").modal("show");
            }

            if (TipoModal == "ConfirmOrdenSummary") {
                $("#TituloeConfirmO").html(Titulo);
                $("#MensageConfirmO").html(Mensaje);
                $("#footer").html(boton);
                $("#modalConfirmOrderSummary").modal("show");
            }

            if (TipoModal == "ConfigM") {
                $("#TituloCM").html(Titulo);
                $("#MensageCM").html(Mensaje);
                $("#modalCongraCofigModal").modal("show");
            }

            if (TipoModal == "CongDelete") {
                $("#TituloCD").html(Titulo);
                $("#MensageCD").html(Mensaje);
                $("#modalcongreDelete").modal("show");
            }

            if (TipoModal == "modalConfim") {
                $("#btnTitleConfirm").html(Titulo);
                $("#btnSubConfirm").html(Mensaje);
                $("#btnFooter").html(boton);
                $("#modalConfim").modal("show");
            }

}