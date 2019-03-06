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
                llenarComboDoorStyle(listDoorP[i].DoorStyle.Id);
                llenarCombolMaterial(listDoorP[i].Material.Id);
                llenarCombRailThickness(listDoorP[i].RailThickness);
                $('#inBasePrice').val(listDoorP[i].BasePrice);
                $('#inAdditionalSFPrice').val(listDoorP[i].AdditionalSFPrice);
                llenarComboEstatus(listDoorP[i].Status.Id);
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

function soloAndNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789 ,";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

function Limpiar() {

    $('#inId').val(0);
    $('#inDoorStyle').removeClass("is-invalid");
    llenarComboDoorStyle(0);

    $('#inMaterial').removeClass("is-invalid");
    llenarCombolMaterial(0);

    $('#inRailThickness').removeClass("is-invalid");
    llenarCombRailThickness(0);

    $('#inBasePrice').removeClass("is-invalid");
    $('#inBasePrice').val("");

    $('#inAdditionalSFPrice').removeClass("is-invalid");
    $('#inAdditionalSFPrice').val("");

    $('#inStatus').removeClass("is-invalid");
    llenarComboEstatus(0);

    $('#inVerticalBase1FLPrice').removeClass("is-invalid");
    $('#inVerticalBase1FLPrice').val("");

    $('#inVerticalAdditionalInchPrice').removeClass("is-invalid");
    $('#inVerticalAdditionalInchPrice').val("");

    $('#inHorizontalBase1FLPrice').removeClass("is-invalid");
    $('#inHorizontalBase1FLPrice').val("");

    $('#inHorizontalAdditionalInchPrice').removeClass("is-invalid");
    $('#inHorizontalAdditionalInchPrice').val("");

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
                llenarTablaDoorsPrices();
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
                llenarTablaDoorsPrices();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

var allDoorStyle = '';
function llenarComboDoorStyle(pDoorStyle) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allDoorStyle.length; i++) {
        if (allDoorStyle[i].Status.Id == 1) {
            option += '<option value="' + allDoorStyle[i].Id + '">' + allDoorStyle[i].Description + '</option>';
        }


    }
    $("#inDoorStyle").empty().append(option);
    if (pDoorStyle != 0) {
        $("#inDoorStyle").val(pDoorStyle);
    }
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
                allDoorStyle = data;
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

var allMaterial = '';
function llenarCombolMaterial(pMaterial) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allMaterial.length; i++) {
        if (allMaterial[i].Status.Id == 1) {
            option += '<option value="' + allMaterial[i].Id + '">' + allMaterial[i].Description + '</option>';
        }


    }
    $("#inMaterial").empty().append(option);
    if (pMaterial != 0) {
        $("#inMaterial").val(pMaterial);
    }
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
                allMaterial = data;
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

var allEstatus = '';
function llenarComboEstatus(pStatus) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allEstatus.length; i++) {
        if (allEstatus[i].Group.Id == 1) {
            option += '<option value="' + allEstatus[i].Id + '">' + allEstatus[i].Description + '</option>';
        }


    }
    $("#inStatus").empty().append(option);
    if (pStatus != 0) {
        $("#inStatus").val(pStatus);
    }
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
                allEstatus = data;
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

var allRailThickness = '';
function llenarCombRailThickness(pRailThickness) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allRailThickness.length; i++) {
        if (allRailThickness[i].Status.Id == 1) {
            option += '<option value="' + allRailThickness[i].Id + '">' + allRailThickness[i].Description + '</option>';
        }


    }
    $("#inRailThickness").empty().append(option);
    if (pRailThickness != 0) {
        $("#inRailThickness").val(pRailThickness);
    }
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
                allRailThickness = data;
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

function llenarTablaDoorsPrices() {
    $.ajax({
        url: urlGetAllDoorsPrices,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                listDoorP = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<tr role="row" class="odd">';
                    option += '<td tabindex="0"  >' + data[i].Id + '</td>';
                    option += '<td>' + data[i].BasePrice + '</td>';
                    option += '<td>' + data[i].AdditionalSFPrice + '</td>';
                    option += '<td>' + data[i].VerticalAdditionalInchPrice + '</td>';
                    option += '<td>' + data[i].HorizontalBase1FLPrice + '</td>';
                    option += '<td>' + data[i].Status.Description + '</td>';
                    option += '<td>';
                    option += '<center>';
                    option += '<a href="#" data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" class="Modificar btn btn-primary btn-icon">';
                    option += '<div><i class="fa fa-edit"></i></div></a></center></td></tr>';

                }
                $("#datatable1 > tbody").empty().append(option);
                $("#modalInsert").modal("hide");
            }
            else {
                LlammarModal("Danger", "Error obtaining Type", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });

}