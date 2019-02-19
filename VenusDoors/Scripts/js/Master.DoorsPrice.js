$(document).ready(function () {
    GetAllDoorStyle();
    GetAllMaterial();
    GetAllStatus();
    GetAllRailThickness();

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
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btUpdateDoorPrice").hide();
        $("#btnInsertDP").show();
        Limpiar();
    });

    $(document).on('click', '.Modificar', function (event) {
        $("#btUpdateDoorPrice").show();
        $("#btnInsertDP").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
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

                $('#inId').val(listDoorP[i].Id);
                $('#inDoorStyle').val(listDoorP[i].DoorStyle.Id);
                $('#inMaterial').val(listDoorP[i].Material.Id);
                $('#inRailThickness').val(listDoorP[i].RailThickness);
                $('#inBasePrice').val(listDoorP[i].BasePrice);
                $('#inAdditionalSFPrice').val(listDoorP[i].AdditionalSFPrice);
                $('#inStatus').val(listDoorP[i].Status.Id);
                $('#inVerticalBase1FLPrice').val(listDoorP[i].VerticalBase1FLPrice);
                $('#inVerticalAdditionalInchPrice').val(listDoorP[i].VerticalAdditionalInchPrice);
                $('#inHorizontalBase1FLPrice').val(listDoorP[i].HorizontalBase1FLPrice);
                $('#inPicture').val(listDoorP[i].Picture);
                $('#inProfilePicture').val(listDoorP[i].ProfilePicture);
                $('#inHorizontalAdditionalInchPrice').val(listDoorP[i].HorizontalAdditionalInchPrice);
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

    $('#inId').val(0);
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
            Id: $("#inId").val(),
            DoorStyle: { Id: $("#inDoorStyle").val() },
            Matarial: { Id: $("#inMaterial").val() },
            RailThickness: { Id: $("#inRailThickness").val() },
            BasePrice: parseFloat($("#inBasePrice").val()),
            AdditinalSFPrice: parseFloat($("#inAdditionalSFPrice").val()),
            Status: { Id: $("#inStatus").val() },
            Picture: $("#inPicture").val(),
            ProfilePicture: $("#inProfilePicture").val(),
            VerticalBase1FLPrice: $("#inVerticalBase1FLPrice").val(),
            VerticalAdditionalInchPrice: $("#inVerticalAdditionalInchPrice").val(),
            HorizontalBase1FLPrice: $("#inHorizontalBase1FLPrice").val(),
            HorizontalAdditionalInchPrice: $("#inHorizontalAdditionalInchPrice").val(),

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

function GetAllDoorStyle() {
    $.ajax({
        url: urlGetAllDoorStyle,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inDoorStyle").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}
function GetAllMaterial() {
    $.ajax({
        url: urlGetAllMaterial,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inMaterial").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}
function GetAllStatus() {
    $.ajax({
        url: urlGetAllStatus,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inStatus").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}
function GetAllRailThickness() {
    $.ajax({
        url: urlGetAllRailThickness,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inRailThickness").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}