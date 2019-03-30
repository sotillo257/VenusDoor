$(document).ready(function () {
    GetAllPanel();
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
        QuitarClaseErrorACombos();
    });

    $(document).on('click', '.Remove', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Warning!", "You are about to delete an article. What would you like to do?",
        '<button onclick="UpdateStatus3(id)" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });

    $(document).on('click', '.Modificar', function (event) {
        $("#btUpdateDoorPrice").show();
        $("#btnInsertDP").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        QuitarClaseErrorACombos();
        for (var i = 0; i < listDoorP.length; i++) {
            if (listDoorP[i].Id == $(this).attr('value')) {
                var aux = listDoorP[i].Id;
                var aux1 = listDoorP[i].PanelType.Id;
                var aux2 = listDoorP[i].Material.Id;
                var aux3 = listDoorP[i].RailThickness.Id;
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
                llenarComboPanel(listDoorP[i].PanelType.Id);
                llenarCombolMaterial(listDoorP[i].Material.Id);
                llenarCombRailThickness(listDoorP[i].RailThickness.Id);
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
    llenarComboPanel(0);

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

function QuitarClaseErrorACombos() {
    $('#select2-inStatus-container').removeClass("cbError");
    $('#select2-inDoorStyle-container').removeClass("cbError");
    $('#select2-inMaterial-container').removeClass("cbError");
    $('#select2-inRailThickness-container').removeClass("cbError");
}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inDoorStyle').val() == 0 || $('#inDoorStyle').val() == null) {
        $('#select2-inDoorStyle-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inDoorStyle-container').removeClass("cbError");
    }

    if ($('#inMaterial').val() == 0 || $('#inMaterial').val() == null) {
        $('#select2-inMaterial-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inMaterial-container').removeClass("cbError");
    }

    if ($('#inRailThickness').val() == 0 || $('#inRailThickness').val() == null) {
        $('#select2-inRailThickness-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inRailThickness-container').removeClass("cbError");
    }

    if ($('#inBasePrice').val() == "") {
        $('#inBasePrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inBasePrice').removeClass("is-invalid");
    }

    if ($('#inAdditionalSFPrice').val() == "") {
        $('#inAdditionalSFPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inAdditionalSFPrice').removeClass("is-invalid");
    }

    if ($('#inStatus').val() == 0 || $('#inStatus').val() == null) {
        $('#select2-inStatus-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inStatus-container').removeClass("cbError");
    }

    if ($('#inVerticalBase1FLPrice').val() == "") {
        $('#inVerticalBase1FLPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inVerticalBase1FLPrice').removeClass("is-invalid");
    }

    if ($('#inVerticalAdditionalInchPrice').val() == "") {
        $('#inVerticalAdditionalInchPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inVerticalAdditionalInchPrice').removeClass("is-invalid");
    }

    if ($('#inHorizontalBase1FLPrice').val() == "") {
        $('#inHorizontalBase1FLPrice').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHorizontalBase1FLPrice').removeClass("is-invalid");
    }

    if ($('#inHorizontalAdditionalInchPrice').val() == "") {
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
            PanelType: { Id: $("#inDoorStyle").val() },
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
            PanelType: { Id: $("#inDoorStyle").val() },
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

function UpdateStatus3(id) {
    var status = 3;
    var datos =
    {
        moddp: {
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOrderStatus,
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

var allPanelType = '';
function llenarComboPanel(pPanelType) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allPanelType.length; i++) {
        if (allPanelType[i].Status.Id == 1) {
            option += '<option value="' + allPanelType[i].Id + '">' + allPanelType[i].Description + '</option>';
        }


    }
    $("#inDoorStyle").empty().append(option);
    if (pPanelType != 0) {
        $("#inDoorStyle").val(pPanelType);
    }
}
function GetAllPanel() {
    $.ajax({
        url: urlGetAllPanel,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allPanelType = data;
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
                
                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);

                for (var i = 0; i < data.length; i++) {
                    var Botones = '<center><button data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" style="width: 25px;height: 25px; margin-left: 10px;" class="Modificar btn btn-primary btn-icon"><i class="fa fa-edit"></i></button>' +
                        '<button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button>' +
                        '</center>';

                    t.row.add([
                        data[i].Id,
                        data[i].BasePrice,
                        data[i].AdditionalSFPrice,
                        data[i].VerticalAdditionalInchPrice,
                        data[i].HorizontalBase1FLPrice,
                        data[i].Status.Description,
                       Botones
                    ]).draw(false);
                }
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