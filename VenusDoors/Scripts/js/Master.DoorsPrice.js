$(document).ready(function () {

    $("#btnInsertDP").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertDoorsPrices();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btUpdateDoorPrice").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateDoorPrice();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }       
    });
    $("#btInsert").on("click", function () {
        Limpiar();
    });

    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < listDoorP.length; i++) {
            if (listDoorP[i].Id == $(this).attr('value')) {
                var aux = listDoorP[i].Id;
                var aux1 = listDoorP[i].DoorStyle.Id;
                var aux2 = listDoorP[i].Material.Id;
                var aux3 = listDoorP[i].RailThickness;
                var aux4 = listDoorP[i].BasePrice;
                var aux5 = listDoorP[i].AdditionalSFPrice;
                var aux6 = listDoorP[i].Status.Id;
                var aux7 = listDoorP[i].VerticalBase1FLPrice;
                var aux8 = listDoorP[i].VerticalAdditionalInchPrice;
                var aux9 = listDoorP[i].HorizontalBase1FLPrice;
                var aux10 = listDoorP[i].Picture;
                var aux11 = listDoorP[i].ProfilePicture;
                var aux12 = listDoorP[i].HorizontalAdditionalInchPrice;

                $('#txtId').val(listDoorP[i].Id);
                $('#cbDoorStyle').val(listDoorP[i].DoorStyle.Id);
                $('#cbMaterial').val(listDoorP[i].Material.Id);
                $('#cbRailThickness').val(listDoorP[i].RailThickness);
                $('#txtBasePrice').val(listDoorP[i].BasePrice);
                $('#txtAdditinalSFPrice').val(listDoorP[i].AdditionalSFPrice);
                $('#IdStatus').val(listDoorP[i].Status.Id);
                $('#txtVerticalBase1FLPrice').val(listDoorP[i].VerticalBase1FLPrice);
                $('#txtVerticalAdditionalInchPrice').val(listDoorP[i].VerticalAdditionalInchPrice);
                $('#txtHorizontalBase1FLPrice').val(listDoorP[i].HorizontalBase1FLPrice);
                $('#txtPicture').val(listDoorP[i].Picture);
                $('#txtProfilePicture').val(listDoorP[i].ProfilePicture);
                $('#txtHorizontalAdditionalInchPrice').val(listDoorP[i].HorizontalAdditionalInchPrice);
            }
        }
    });
});
$(function () {
    'use strict';

    $('#datatable1').DataTable({
        responsive: true,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ items/page',
        }
    });

    $('#datatable2').DataTable({
        bLengthChange: false,
        searching: false,
        responsive: true
    });

    // Select2
    $('.dataTables_length select').select2({ minimumResultsForSearch: Infinity });

});

function Limpiar() {
    $('#inDoorStyle').removeClass("is-invalid");
    $('#inDoorStyle').val(0);

    $('#inMaterial').removeClass("is-invalid");
    $('#inMaterial').val(0);

    $('#inRailThickness').removeClass("is-invalid");
    $('#inRailThickness').val(0);

    $('#inBasePrice').removeClass("is-invalid");
    $('#inBasePrice').val(0);

    $('#inAdditionalSFPrice').removeClass("is-invalid");
    $('#inAdditionalSFPrice').val(0);

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val("");

    $('#inVerticalBase1FLPrice').removeClass("is-invalid");
    $('#inVerticalBase1FLPrice').val(0);

    $('#inVerticalAdditionalInchPrice').removeClass("is-invalid");
    $('#inVerticalAdditionalInchPrice').val(0);

    $('#inHorizontalBase1FLPrice').removeClass("is-invalid");
    $('#inHorizontalBase1FLPrice').val(0);

    $('#inHorizontalAdditionalInchPrice').removeClass("is-invalid");
    $('#inHorizontalAdditionalInchPrice').val(0);


    $('#cbDoorStyle').removeClass("is-invalid");
    $('#cbDoorStyle').val(0);

    $('#cbMaterial').removeClass("is-invalid");
    $('#cbMaterial').val(0);

    $('#cbRailThickness').removeClass("is-invalid");
    $('#cbRailThickness').val(0);

    $('#txtBasePrice').removeClass("is-invalid");
    $('#txtBasePrice').val(0);

    $('#txtAdditinalSFPrice').removeClass("is-invalid");
    $('#txtAdditinalSFPrice').val(0);

    $('#IdStatus').removeClass("is-invalid");
    $('#IdStatus').val("");

    $('#txtVerticalBase1FLPrice').removeClass("is-invalid");
    $('#txtVerticalBase1FLPrice').val(0);

    $('#txtVerticalAdditionalInchPrice').removeClass("is-invalid");
    $('#txtVerticalAdditionalInchPrice').val(0);

    $('#txtHorizontalBase1FLPrice').removeClass("is-invalid");
    $('#txtHorizontalBase1FLPrice').val(0);

    $('#txtHorizontalAdditionalInchPrice').removeClass("is-invalid");
    $('#txtHorizontalAdditionalInchPrice').val(0);
}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inDoorStyle').val() == 0) {
        $('#inDoorStyle').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDoorStyle').removeClass("is-invalid");
    }

    if ($('#inMaterial').val() == 0) {
        $('#inMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#inMaterial').removeClass("is-invalid");
    }

    if ($('#inRailThickness').val() == 0) {
        $('#inRailThickness').addClass("is-invalid");
        aux = false;
    } else {
        $('#inRailThickness').removeClass("is-invalid");
    }

    if ($('#inBasePrice').val() == " ") {
        $('#inBasePrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inBasePrice').removeClass("is-invalid");
    }

    if ($('#inAdditionalSFPrice').val() == " ") {
        $('#inAdditionalSFPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inAdditionalSFPrice').removeClass("is-invalid");
    }

    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    if ($('#inVerticalBase1FLPrice').val() == " ") {
        $('#inVerticalBase1FLPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inVerticalBase1FLPrice').removeClass("is-invalid");
    }

    if ($('#inVerticalAdditionalInchPrice').val() == " ") {
        $('#inVerticalAdditionalInchPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inVerticalAdditionalInchPrice').removeClass("is-invalid");
    }

    if ($('#inHorizontalBase1FLPrice').val() == " ") {
        $('#inHorizontalBase1FLPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHorizontalBase1FLPrice').removeClass("is-invalid");
    }

    if ($('#inHorizontalAdditionalInchPrice').val() == " ") {
        $('#inHorizontalAdditionalInchPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHorizontalAdditionalInchPrice').removeClass("is-invalid");
    }


    if ($('#cbDoorStyle').val() == 0) {
        $('#cbDoorStyle').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDoorStyle').removeClass("is-invalid");
    }

    if ($('#cbMatarial').val() == 0) {
        $('#cbMatarial').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbMatarial').removeClass("is-invalid");
    }

    if ($('#cbRailThickness').val() == 0) {
        $('#cbRailThickness').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbRailThickness').removeClass("is-invalid");
    }

    if ($('#txtBasePrice').val() == " ") {
        $('#txtBasePrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtBasePrice').removeClass("is-invalid");
    }

    if ($('#txtAdditinalSFPrice').val() == " ") {
        $('#txtAdditinalSFPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtAdditinalSFPrice').removeClass("is-invalid");
    }

    if ($('#IdStatus').val() == 0) {
        $('#IdStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#IdStatus').removeClass("is-invalid");
    }

    if ($('#txtVerticalBase1FLPrice').val() == " ") {
        $('#txtVerticalBase1FLPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtVerticalBase1FLPrice').removeClass("is-invalid");
    }

    if ($('#txtVerticalAdditionalInchPrice').val() == " ") {
        $('#txtVerticalAdditionalInchPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtVerticalAdditionalInchPrice').removeClass("is-invalid");
    }

    if ($('#txtHorizontalBase1FLPrice').val() == " ") {
        $('#txtHorizontalBase1FLPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtHorizontalBase1FLPrice').removeClass("is-invalid");
    }

    if ($('#txtHorizontalAdditionalInchPrice').val() == " ") {
        $('#txtHorizontalAdditionalInchPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtHorizontalAdditionalInchPrice').removeClass("is-invalid");
    }
    return aux;
}

function InsertDoorsPrices() {

    var datos =
    {
        pDoorsPrices: {
            DoorStyle: { Id: $("#inDoorStyle").val() },
            Material: { Id: $("#inMaterial").val() },
            RailThickness: { Id: $("#inRailThickness").val() },
            BasePrice: parseFloat($("#inBasePrice").val()),
            AdditionalSFPrice: parseFloat($("#inAdditionalSFPrice").val()),
            Status: { Id: $("#inStatus").val() },
            Picture: $("#inPicture").val(),
            ProfilePicture: $("#inProfilePicture").val(),
            VerticalBase1FLPrice: $("#inVerticalBase1FLPrice").val(),
            VerticalAdditionalInchPrice: $("#inVerticalAdditionalInchPrice").val(),
            HorizontalBase1FLPrice: $("#inHorizontalBase1FLPrice").val(),
            HorizontalAdditionalInchPrice: $("#inHorizontalAdditionalInchPrice").val(),
            CreatorUser: 6,
            ModificationUser: 6,
        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorsPrices,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateDoorPrice() {

    var datos =
    {
        uDoorPrice: {
            Id: $("#txtId").val(),
            DoorStyle: { Id: $("#cbDoorStyle").val() },
            Matarial: { Id: $("#cbMatarial").val() },
            RailThickness: { Id: $("#cbRailThickness").val() },
            BasePrice: parseFloat($("#txtBasePrice").val()),
            AdditinalSFPrice: parseFloat($("#txtAdditinalSFPrice").val()),
            Status: { Id: $("#IdStatus").val() },
            Picture: $("#txtPicture").val(),
            ProfilePicture: $("#txtProfilePicture").val(),
            VerticalBase1FLPrice: $("#txtVerticalBase1FLPrice").val(),
            VerticalAdditionalInchPrice: $("#txtVerticalAdditionalInchPrice").val(),
            HorizontalBase1FLPrice: $("#txtHorizontalBase1FLPrice").val(),
            HorizontalAdditionalInchPrice: $("#txtHorizontalAdditionalInchPrice").val(),
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoorPrice,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}