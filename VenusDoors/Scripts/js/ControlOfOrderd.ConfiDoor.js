$(document).ready(function () {
    
    $("#editDXU").on('click', function () {
        $('#editBCK').removeClass("active");
        $("#editDXU").hide();
        $("#editBCK").show();
        $("#btnsave").show();
        $("#btnsaveDxO").hide();
        QuitarClaseErrorACombos();
    });

    $("#editBCK").on('click', function () {
        $("#editDXU").show();
        $("#editBCK").hide();
        $("#btnsave").hide();
        $("#btnsaveDxO").hide();
        $('#editDXU').removeClass("active");
        $('#dxoPanel').removeClass("active");  
    });

    $(document).on('click', '.editDoor', function (event) {
        var id = $(this).attr('data-id');        
        $("#editDXU").hide();
        $("#editBCK").show();
        $("#btnsave").hide();
        $('#editBCK').removeClass("active");
        $("#btnsaveDxO").show();
        QuitarClaseErrorACombos();


        for (var i = 0; i < DxOl.length; i++) {
            if (DxOl[i].Id == $(this).attr('data-id')) {
                
                var aux1 = DxOl[i].Id;
                var aux2 = DxOl[i].Width;
                var aux3 = DxOl[i].Panel.Id;
                var aux4 = DxOl[i].DoorType.Id;
                var aux5 = DxOl[i].DoorOption.Id;
                var aux6 = DxOl[i].DecimalsWidth.Id;
                var aux7 = DxOl[i].DecimalsHeight.Id;

                var PictureProfile = '<img style="height: 100px;width: 235px;margin-top: 20px;" id="ProfilePicture" src="' + DxOl[i].ProfilePicture + '">';
                var PicturePanel = '<img style="width: 230px;height: 230px;" id="DoorPicture" src="' + DxOl[i].Picture + '">';
                $('#PictureProfile').html(PictureProfile);
                $('#PicturePanel').html(PicturePanel);

                $('#idDxO').val(DxOl[i].Id);
                $('#descDXO').val(DxOl[i].Descuento.Id);
                $('#iptWidth').val(DxOl[i].Width);
                $('#iptHeight').val(DxOl[i].Height);
                $('#CantidadFila').val(DxOl[i].Quantity);
                //$('#descDXO').val(DxOl[i].Descuento);
                llenarComboPanelStyle(DxOl[i].Panel.Id);
                llenarComboDoorType(DxOl[i].DoorType.Id);
                selectDoorOption(DxOl[i].DoorOption.Id);
                llenarComboDecimalW(DxOl[i].DecimalsWidth.Id);
                llenarComboDecimalH(DxOl[i].DecimalsHeight.Id);

                break;
            }
        }
    });

    $(document).on('change', '.Profile', function () {
        ChangeProfile();
    });

    $(document).on('change', '.Doors', function () {
        changeDoorPicture();
    });

    $(document).on('change', '.form-control', function () {
        GetPrices();
    });

    $(document).on('change', '#iptWidth', function () {
        if ($('#iptWidth').val() < 5) {
            $('#iptWidth').addClass("is-invalid");
            $("#alertWidth").css('display', 'block');
            $("#alertWidth").text("Minimum is 5 inches.");
        } else if ($('#iptWidth').val() > 42) {
            $('#iptWidth').addClass("is-invalid");
            $("#alertWidth").css('display', 'block');
            $("#alertWidth").text("Maximum is 42 inches.");
        } else {
            $('#iptWidth').removeClass("is-invalid");
            $("#alertWidth").text("");
        }
    });

    $(document).on('change', '#iptHeight', function () {
        if ($('#iptHeight').val() < 5) {
            $('#iptHeight').addClass("is-invalid");
            $("#alertHeight").text("Minimum is 5 inches.");
        } else if ($('#iptHeight').val() > 100) {
            $('#iptHeight').addClass("is-invalid");
            $("#alertHeight").text("Maximum is 100 inches.");
        } else {
            $('#iptHeight').removeClass("is-invalid");
            $("#alertHeight").text("");
        }
    });

    $("#btnsave").on("click", function () {
        LlammarModal("ConfirmOrdenSummary", "Confirm", "Do you want to save this configuration?",
        '<button onclick="NuevosCambiosDXU();" class="Cursor btn btn-success tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Save</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });

    $("#btnsaveDxO").on("click", function () {
        LlammarModal("ConfirmOrdenSummary", "Confirm", "Do you want to save this configuration?",
        '<button onclick="NuevosCambiosDXO();" class="Cursor btn btn-success tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Save</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });
});

function NuevosCambiosDXU() {
    if (ValidarCamposVacios()) {
        InsertDoorsxUser();
    } else {
        $('#modalConfirmOrderSummary').modal('hide');
        LlammarModal("Danger", "You must fill all the fields.", " ");
    }
}

function NuevosCambiosDXO() {
    if (ValidarCamposVaciosDXO()) {
        UpdateDoorsxOrder();
    } else {
        $('#modalConfirmOrderSummary').modal('hide');
        LlammarModal("Danger", "You must fill all the fields.", " ");
    }
}

function GetPrices() {

    var TR = $("#cbTopRail").val();
    var BR = $("#cbBottomRail").val();
    var RT;
    var H = parseFloat($("#iptHeight").val()) + parseFloat($("#cbDecimalsH").val());
    var W = parseFloat($("#iptWidth").val()) + parseFloat($("#cbDecimalsW").val());
    $("#iptCost").val(!isNaN(getPriceDoor($("#cbMaterial").val(), $("#cbPanel").val(), H, W, TR, BR)) ? getPriceDoor($("#cbMaterial").val(), $("#cbPanel").val(), H, W, TR, BR) : '0.00');
}

$(document).on('change', '.eventChange', function () {    
    GetPrices();
});

var allMaterial = '';
function llenarComboMaterial(pMaterial) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < allMaterial.length; i++) {
        if (allMaterial[i].Status.Id == 1) {
            option += '<option value="' + allMaterial[i].Id + '">' + allMaterial[i].Description + '</option>';
        }
    }
    $("#cbMaterial").empty().append(option);
    if (pMaterial != 0) {
        $("#cbMaterial").val(pMaterial);
    }
}

var allDoorStyle = '';
function llenarComboDoorStyle(pDoorStyle) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < allDoorStyle.length; i++) {
        if (allDoorStyle[i].Status.Id == 1) {
            option += '<option value="' + allDoorStyle[i].Id + '">' + allDoorStyle[i].Description + '</option>';
        }
    }
    $("#cbDoorStyle").empty().append(option);
    if (pDoorStyle != 0) {
        $("#cbDoorStyle").val(pDoorStyle);
    }
}

var AllInsideEdgeProfile = '';
function llenarComboIEP(pIEP) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllInsideEdgeProfile.length; i++) {
        if (AllInsideEdgeProfile[i].Status.Id == 1) {
            option += '<option value="' + AllInsideEdgeProfile[i].Id + '">' + AllInsideEdgeProfile[i].Description + '</option>';
        }
    }
    $("#cbInsideEdgeProfile").empty().append(option);
    if (pIEP != 0) {
        $("#cbInsideEdgeProfile").val(pIEP);
    }
}

var AllOutsideEdgeProfile = '';
function llenarComboOEP(pOEP) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllOutsideEdgeProfile.length; i++) {
        if (AllOutsideEdgeProfile[i].Status.Id == 1) {
            option += '<option value="' + AllOutsideEdgeProfile[i].Id + '">' + AllOutsideEdgeProfile[i].Description + '</option>';
        }
    }
    $("#cbOutsideEdgeProfile").empty().append(option);
    if (pOEP != 0) {
        $("#cbOutsideEdgeProfile").val(pOEP);
    }
}

var AllStileWidth = '';
function llenarComboStileWidth(pStileWidth) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllStileWidth.length; i++) {
        if (AllStileWidth[i].Status.Id == 1) {
            option += '<option value="' + AllStileWidth[i].Id + '">' + AllStileWidth[i].Description + '</option>';
        }
    }
    $("#cbStileWidth").empty().append(option);
    if (pStileWidth != 0) {
        $("#cbStileWidth").val(pStileWidth);
    }
}

var AllRailWidth = '';
function llenarComboRailWidth(pRailWidth) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllRailWidth.length; i++) {
        if (AllRailWidth[i].Status.Id == 1) {
            option += '<option value="' + AllRailWidth[i].Id + '">' + AllRailWidth[i].Description + '</option>';
        }
    }
    $("#cbRailWidth").empty().append(option);
    if (pRailWidth != 0) {
        $("#cbRailWidth").val(pRailWidth);
    }
}

var AllDoorAssembly = '';
function llenarComboDoorAssembly(pDoorAssembly) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllDoorAssembly.length; i++) {
        if (AllDoorAssembly[i].Status.Id == 1) {
            option += '<option value="' + AllDoorAssembly[i].Id + '">' + AllDoorAssembly[i].Description + '</option>';
        }
    }
    $("#cbDoorAssembly").empty().append(option);
    if (pDoorAssembly != 0) {
        $("#cbDoorAssembly").val(pDoorAssembly);
    }
}

var AllPanelType = '';
function llenarComboPanelStyle(pPanelStyle) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllPanelType.length; i++) {
        if (AllPanelType[i].Status.Id == 1) {
            option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
        }
    }
    $("#cbPanel").empty().append(option);
    if (pPanelStyle != 0) {
        $("#cbPanel").val(pPanelStyle);
    }
}

var AllPanelMaterial = '';
function llenarComboPanelMaterial(pMaterial) {

    var pPanelMaterial = 0;
    if (pMaterial == 1) {
        //knotty Alder
        pPanelMaterial = 6;

    } else if (pMaterial == 4) {
        //Maple
        pPanelMaterial = 7;
    }
    else if (pMaterial == 6) {
        //Poplar
        pPanelMaterial = 9;
    }
    else if (pMaterial == 7) {
        //Red oak
        pPanelMaterial = 11;
    }
    else if (pMaterial == 13) {
        //Beech
        pPanelMaterial = 3;
    }
    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllPanelMaterial.length; i++) {
        if (AllPanelMaterial[i].Status.Id == 1 && AllPanelMaterial[i].Id == pPanelMaterial) {
            option += '<option value="' + AllPanelMaterial[i].Id + '">' + AllPanelMaterial[i].Description + '</option>';

        }
        if (pMaterial == 6) {
            if (AllPanelMaterial[i].Status.Id == 1 && AllPanelMaterial[i].Id == 1) {
                option += '<option value="' + AllPanelMaterial[i].Id + '">' + AllPanelMaterial[i].Description + '</option>';
            }
        }
    }
    $("#cbPanelMaterial").empty().append(option);
    $("#cbPanelMaterial").val(pPanelMaterial);
}

var AllVerticalDivisions = '';
function llenarComboVerticalDivisions(pVerticalD) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllVerticalDivisions.length; i++) {
        if (AllVerticalDivisions[i].Status.Id == 1) {
            option += '<option value="' + AllVerticalDivisions[i].Id + '">' + AllVerticalDivisions[i].Quantity + '</option>';
        }
    }
    $("#cbVerticalDivisions").empty().append(option);
    if (pVerticalD != 0) {
        $("#cbVerticalDivisions").val(pVerticalD);
    }
}

var AllHorizontalDivisions = '';
function llenarComboHorizontalDivisions(pHorizontal) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllHorizontalDivisions.length; i++) {
        if (AllHorizontalDivisions[i].Status.Id == 1) {
            option += '<option value="' + AllHorizontalDivisions[i].Id + '">' + AllHorizontalDivisions[i].Quantity + '</option>';
        }
    }
    $("#cbHorizontalDivisions").empty().append(option);
    if (pHorizontal != 0) {
        $("#cbHorizontalDivisions").val(pHorizontal);
    }
}

var AllHingeDirection = '';
function llenarComboHingeDirection(pDirection) {

    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllHingeDirection.length; i++) {
        if (AllHingeDirection[i].Status.Id == 1) {
            option += '<option value="' + AllHingeDirection[i].Id + '">' + AllHingeDirection[i].Direction + '</option>';
        }
    }
    $("#cbHingeDirection").empty().append(option);
    if (pDirection != 0) {
        if (pDirection == 3) {
            pDirection = 0;
            $("#cbHingeDirection").val(pDirection);
        } else {
            $("#cbHingeDirection").val(pDirection);
        }
    }
}

var allDoorType = '';
function llenarComboDoorType(pdType) {
    var option = '<option value="0">Select</option>';
    for (var i = 0; i < allDoorType.length; i++) {
        if (allDoorType[i].Status.Id == 1) {
            option += '<option value="' + allDoorType[i].Id + '">' + allDoorType[i].Description + '</option>';
        }
    }
    $("#cbDoorType").empty().append(option);
    if (pdType != 0) {
        $("#cbDoorType").val(pdType);
    }
}

var allDoorOption = '';
function selectDoorOption(pOption) {
    var option = '<option value="0">Select</option>';
    for (var i = 0; i < allDoorOption.length; i++) {
        if (allDoorOption[i].Status.Id == 1) {
            option += '<option value="' + allDoorOption[i].Id + '">' + allDoorOption[i].Description + '</option>';
        }
    }
    $("#cbDoorOpt").empty().append(option);
    if (pOption != 0) {
        $("#cbDoorOpt").val(pOption);
    }
}

function llenarComboFinger(pFinger) {

    var option = '<option value="0">Select</option>';
    option += '<option value="1">No</option>';
    option += '<option value="2">Yes</option>';
    $("#cbFingerPull").empty().append(option);
    if (pFinger != 0) {
        $("#cbFingerPull").val(pFinger);
    }
}

function llenarComboIsDrill(pDrill) {

    var option = '<option value="0">Select</option>';
    option += '<option value="1">No Drill</option>';
    option += '<option value="2">Drill</option>';
    $("#cbisDrill").empty().append(option);
    if (pDrill != 0) {
        $("#cbisDrill").val(pDrill);

    }
}

function llenarComboIsOpen(pOpen) {

    var option = '<option value="0">Select</option>';
    option += '<option value="1">No opening</option>';
    option += '<option value="2">Is opening</option>';
    $("#cbIsOpeningMeasurement").empty().append(option);
    if (pOpen != 0) {
        $("#cbIsOpeningMeasurement").val(pOpen);
    }
}

function checkIsOverlay(pOverlay) {
    var lbl = '<label><input style="margin-right: 8px;" type="radio" name="radioOver" data-id="1">Inset Door Type</label>';
    lbl += '<label style="margin-left: 10px;"><input style="margin-right: 8px;" type="radio" name="radioOver" data-id="2">Overlay Door Type</label>';
    $("#isOverlay").html(lbl);
    if (pOverlay != 0) {
        $("input[name=radioOver][data-id='" + pOverlay + "']").prop("checked", true);
    }
}

var allDecimals = '';
function llenarComboDecimalW(pDecimalW) {

    var option = '';
    for (var i = 0; i < allDecimals.length; i++) {
        if (allDecimals[i].Status.Id == 1) {
            option += '<option value="' + allDecimals[i].Id + '">' + allDecimals[i].Description + '</option>';
        }
    }
    $("#cbDecimalsW").empty().append(option);
    if (pDecimalW != 0) {
        $("#cbDecimalsW").val(pDecimalW);
    }
}

function llenarComboDecimalH(pDecimalH) {

    var option = '';
    for (var i = 0; i < allDecimals.length; i++) {
        if (allDecimals[i].Status.Id == 1) {
            option += '<option value="' + allDecimals[i].Id + '">' + allDecimals[i].Description + '</option>';
        }
    }
    $("#cbDecimalsH").empty().append(option);
    if (pDecimalH != 0) {
        $("#cbDecimalsH").val(pDecimalH);
    }
}

function InsertDoorsxUser() {
    var idDxUorder = $('#idDxUorder').val();
    var itemCost = parseFloat($("#iptCost").val());
    var DoorQuantity = $("#iptQuantity").val();
    var DoorSubTotal = itemCost * DoorQuantity;
    var OrdSubTotal = DoorSubTotal;
    var Tx = parseFloat(0.0825);
    var Taxes = (parseFloat(OrdSubTotal) * Tx).toFixed(2);
    var OrdTotal = (parseFloat(OrdSubTotal) + parseFloat(Taxes)).toFixed(2);
    var DoorOp = $('input[name=radioOption]:checked').attr("data-id");
    var isOver = ($('input[name=radioOver]:checked').attr("data-id") == 1) ? false : true;
    var drillingV = ($("#cbisDrill").val() == 1) ? false : true;
    var HingeDirection = $("#cbHingeDirection").val();
    var HingePositions;
    if (drillingV == true) {
        HingeDirection = $("#cbHingeDirection").val();
        HingePositions = 0;
    } else {
        HingeDirection = 3;
        HingePositions = 2;
    }
    var datos =
         {
             Ord: {
                 Id: _IdOrderModificar,
                 Descuento: $("#descDXU").val(),
                 DoorxUser: {
                     User: { Id: 0 },
                     Order: { Id: _IdOrderModificar},
                     Status: { Id: 1 },
                     Material: { Id: $("#cbMaterial").val() },
                     DoorStyle: { Id: $("#cbDoorStyle").val() },
                     TopRail: { Id: $("#cbRailWidth").val() },
                     BottomRail: { Id: $("#cbStileWidth").val() },
                     Preparation: { Id: 1 },
                     Panel: { Id: 1 },
                     PanelMaterial: { Id: $("#cbPanelMaterial").val() },
                     IsOpeningMeasurement: ($("#cbIsOpeningMeasurement").val() == 1) ? false : true,
                     Join: { Id: $("#cbDoorAssembly").val() },
                     OutsideEdgeProfile: { Id: $("#cbOutsideEdgeProfile").val() },
                     InsideEdgeProfile: { Id: $("#cbInsideEdgeProfile").val() },
                     VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
                     HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
                     Width: parseFloat($("#iptWidth").val()),
                     DecimalsWidth: { Id: 2 },
                     Height: parseFloat($("#iptHeight").val()),
                     DecimalsHeight: { Id: 2 },
                     Quantity: DoorQuantity,
                     ItemCost: itemCost,
                     SubTotal: DoorSubTotal,
                     Picture: '',
                     ProfilePicture: '',
                     isDrill: drillingV,
                     HingeDirection: { Id: HingeDirection },
                     HingePositions: { Id: HingePositions },
                     DoorType: { Id: 1 },
                     DoorOption: { Id: 1 },
                     isOverlay: isOver,
                     isFingerPull: ($("#cbFingerPull").val() == 1) ? false : true,
                 },
             }
         };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorsxUser,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result != null) {              
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("ConfigM", "General configuration of doors successfully saved!", "");
                GetDoorsByOrder(idDxUorder);
                changeDoorStyle();
                $("#editBCK").trigger("click");
                llenarTablaOrderControl();                

            } else {                
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Danger", "Error in the process.", "An error occurred when saving the general settings.");
            }
        },
        error: function (err) {            
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}

function UpdateDoorsxOrder() {
    var itemCost = parseFloat($("#iptCost").val());
    var DoorQuantity = $("#CantidadFila").val();
    var DoorOp = $("#cbDoorOpt").val();

    var datos =
         {

             pDoorsxOrder: {
                 DoorsxUser: CodigoDoorxUser,
                 Width: parseFloat($("#iptWidth").val()),
                 DecimalsWidth: { Id: $("#cbDecimalsW").val() },
                 Height: parseFloat($("#iptHeight").val()),
                 DecimalsHeight: { Id: $("#cbDecimalsH").val() },
                 Quantity: DoorQuantity,
                 ItemCost: 0,
                 SubTotal: 0,
                 Picture: '',
                 ProfilePicture: '',
                 Panel: { Id: $("#cbPanel").val() },
                 DoorType: { Id: $("#cbDoorType").val() },
                 DoorOption: { Id: DoorOp },
                 User: { Id: 0 },
                 Status: { Id: 1 },
                 Descuento: $("#descDXO").val()
             }
         };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoorsxOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("ConfigM", "The door has been created successfully!", "");
                llenarTablaOrderSumary();
                LimpiarCamposRapidos();
                llenarheaderOrder();
            } else {
                $('#modalInsert').modal('hide');
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Danger", "Error in the process.", "An error occurred when creating the door.");
            }
        },
        error: function (err) {
            $('#modalInsert').modal('hide');
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}

function FlatPanelBeaded(Outside, Inside) {
    var ProfileUrl = "img11.png";
    var urlFolder = "/Content/img/Profile/";
    if (Outside == 13) {
        if (Inside == 4) {
            ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel_beaded.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Double_Roman_Ogee_Reba_flat_panel_beaded.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Double_Roman_Ogee_Shaker_22_flat_panel_beaded.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Double_Roman_Ogee_shaker_goove_flat_panel_beaded.png";
        }
    }
    if (Outside == 2) {
        if (Inside == 4) {
            ProfileUrl = "-Fingerpull_ogee_flat_panel_beaded.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Fingerpull_Reba_flat_panel_beaded.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Fingerpull_Shaker22_flat_panel_beaded.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Finger_pull_shaker_goove_flat_panel_beaded.png";
        }
    }
    if (Outside == 17) {
        if (Inside == 4) {
            ProfileUrl = "-Half_Reba_ogee_flat_panel_beaded.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Half_Reba_Reba_flat_panel_beaded.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Half_Reba_Shaker_22_flat_panel_beaded.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Half_Reba_shaker_goove_flat_panel_beaded.png";
        }
    }
    if (Outside == 4) {

        if (Inside == 4) {
            ProfileUrl = "-Little_bone_ogee_flat_panel_beaded.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Little_bone_Reba_flat_panel_beaded.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Little_bone_Shaker_22_flat_panel_beaded.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Little_bone_shaker_goove_flat_panel_beaded.png";
        }
    }
    if (Outside == 5) {
        if (Inside == 4) {
            ProfileUrl = "-Reba_ogee_flat_panel_beaded.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Reba_Reba_flat_panel_beaded.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Reba_Shaker_22_flat_panel_beaded.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Reba_shaker_goove_flat_panel_beaded.png";
        }
    }
    if (Outside == 6) {
        if (Inside == 4) {
            ProfileUrl = "-Shaker_ogee_flat_panel_beaded.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Shaker_Reba_flat_panel_beaded.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Shaker_Shaker_22_flat_panel_beaded.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Shaker_shaker_goove_flat_panel_beaded.png";
        }
    }
    $('#ProfilePicture').attr('src', urlFolder + ProfileUrl);
}

function RaisedPanel(Outside, Inside) {
    var ProfileUrl = "img11.png";
    var urlFolder = "/Content/img/Profile/";
    if (Outside == 13) {
        if (Inside == 4) {
            ProfileUrl = "-Double_Roman_Ogee_ogee_raised_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Double_Roman_Ogee_Reba_raised_panel.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Double_Roman_Ogee_Shaker_22_raised_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Double_Roman_Ogee_shaker_goove_raised_panel.png";
        }
    }
    if (Outside == 2) {
        if (Inside == 4) {
            ProfileUrl = "-Fingerpull_ogee_raised_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Fingerpull_Reba_raised_panel.png";
        } else if (Inside == 3) {
            ProfileUrl = "-FingerPull-Shaker22-RaisedPanel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Finger-pull-shaker-goove-raised-panel.png";
        }
    }
    if (Outside == 17) {
        if (Inside == 4) {
            ProfileUrl = "-Half_Reba_ogee_raised_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Half_Reba_Reba_raised_panel.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Half_Reba_Shaker_22_raised_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Half_Reba_shaker_goove_raised_panel.png";
        }
    }
    if (Outside == 11) {

        if (Inside == 4) {
            ProfileUrl = "-Little_bone_ogee_raised_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Little_bone_Reba_raised_panel.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Little_bone_Shaker_22_raised_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Little_bone_shaker_goove_raised_panel.png";
        }
    }
    if (Outside == 5) {
        if (Inside == 4) {
            ProfileUrl = "-Reba_ogee_raised_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Reba_Reba_raised_panel.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Reba_Shaker_22_raised_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Reba_shaker_goove_raised_panel.png";
        }
    }
    if (Outside == 6) {
        if (Inside == 4) {
            ProfileUrl = "-Shaker_ogee_raised_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Shaker_Reba_raised_panel.png";
        } else if (Inside == 3) {
            ProfileUrl = "-Shaker_Shaker_22_raised_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Shaker_shaker_goove_raised_panel.png";
        }
    }
    $('#ProfilePicture').attr('src', urlFolder + ProfileUrl);
}

function changeDoorPicture() {
    var Style = $('#cbDoorStyle').val();
    var Panel = $('#cbPanel').val();

    if (Panel == 5) {
        FlatPanelDoor(Style);
    } else if (Panel == 6) {
        $('#DoorPicture').attr('src', "/Content/img/Doors/Cabinet Vector-17.png");
    } else
        if (Panel == 2) {
            RaisedPanelDoor(Style);
        } else {
            $('#DoorPicture').attr('src', "/Content/img/Doors/img11.png");
        }
}

function FlatPanelDoor(Style) {
    var stile = $('#cbTopRail').val();
    var rail = $('#cbBottomRail').val();
    var DoorUrl = "Cabinet Vector-02.png";
    var urlFolder = "/Content/img/Doors/";




    if ($('#cbJoin').val() == 2) {
        if (Style == 1009) {

            DoorUrl = "Cabinet Vector-13.png";

        } else if (Style == 1008) {


        } else {
            DoorUrl = "Cabinet Vector-08.png";
        }
    } else if (Style == 1008) {

        DoorUrl = "Cabinet Vector-01.png";


    } else if (Style == 1002) {
        if (stile == 3 && rail == 3) {
            DoorUrl = "Cabinet Vector-02.png";
        } else if (stile == 1 && rail == 1) {
            DoorUrl = "Cabinet Vector-14.png";
        }
    } else if (Style == 1004) {
        if (stile == 3 && rail == 3) {
            DoorUrl = "Cabinet Vector-05.png";
        } else if (stile == 1 && rail == 1) {
            DoorUrl = "Cabinet Vector-06.png";
        }
    } else if (Style == 1009) {

        DoorUrl = "Cabinet Vector-13.png";

    } else if (Style == 1010) {

        DoorUrl = "Cabinet Vector-13.png";

    } else {
        DoorUrl = "Cabinet Vector-02.png";
    }
    $('#DoorPicture').attr('src', urlFolder + DoorUrl);

}

function RaisedPanelDoor(Style) {
    var stile = $('#cbTopRail').val();
    var rail = $('#cbBottomRail').val();
    var DoorUrl = "Cabinet Vector-07.png";
    var urlFolder = "/Content/img/Doors/";

    if (stile == 3 && rail == 3) {
        if (Style == 1008) {

            var inside = $("#cbInsideEdgeProfile").val();
            var outside = $("#cbOutsideEdgeProfile").val();
            if (outside != 6 && inside != 3 && inside != 7) {
                DoorUrl = "Cabinet Vector-09.png";
            } else if (outside == 6 && (inside == 3 || inside == 7)) {
                DoorUrl = "Cabinet Vector-10.png";
            }

        } else if (Style == 1009) {
            DoorUrl = "Cabinet Vector-13.png";
        } else {
            DoorUrl = "Cabinet Vector-16.png";
        }

    } else if (stile == 1 && rail == 1) {
        if (Style == 1009) {

        } else if (Style == 1008) {

            var inside = $("#cbInsideEdgeProfile").val();
            var outside = $("#cbOutsideEdgeProfile").val();
            if (outside != 6 && inside != 3 && inside != 7) {
                DoorUrl = "Cabinet Vector-09.png";
            } else if (outside == 6 && (inside == 3 || inside == 7)) {
                DoorUrl = "Cabinet Vector-10.png";
            }

        } else {
            DoorUrl = "Cabinet Vector-10.png";
        }
    }


    if ($('#cbJoin').val() == 2) {
        if (Style == 1009) {

        } else if (Style == 1008) {

        } else {
            DoorUrl = "Cabinet Vector-07.png";
        }

    }
    $('#DoorPicture').attr('src', urlFolder + DoorUrl);
}

function ValidarCamposVacios() {
    var aux = true;

    if ($('#cbMaterial').val() == 0) {
        $('#select2-cbMaterial-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbMaterial-container').removeClass("cbError");
    }

    if ($('#cbDoorStyle').val() == 0) {
        $('#select2-cbDoorStyle-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorStyle-container').removeClass("cbError");
    }

    if ($('#cbStileWidth').val() == 0) {
        $('#select2-cbStileWidth-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbStileWidth-container').removeClass("cbError");
    }

    if ($('#cbRailWidth').val() == 0) {
        $('#select2-cbRailWidth-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbRailWidth-container').removeClass("cbError");
    }

    if ($('#cbPreparation').val() == 0) {
        $('#select2-cbPreparation-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbPreparation-container').removeClass("cbError");
    }


    if ($('#cbPanelMaterial').val() == 0) {
        $('#select2-cbPanelMaterial-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbPanelMaterial-container').removeClass("cbError");
    }

    if ($('#cbIsOpeningMeasurement').val() == 0) {
        $('#select2-cbIsOpeningMeasurement-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbIsOpeningMeasurement-container').removeClass("cbError");
    }

    if ($('#cbDoorAssembly').val() == 0) {
        $('#select2-cbDoorAssembly-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorAssembly-container').removeClass("cbError");
    }

    if ($('#cbOutsideEdgeProfile').val() == 0) {
        $('#select2-cbOutsideEdgeProfile-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbOutsideEdgeProfile-container').removeClass("cbError");
    }

    if ($('#cbInsideEdgeProfile').val() == 0) {
        $('#select2-cbInsideEdgeProfile-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbInsideEdgeProfile-container').removeClass("cbError");
    }

    if ($('#cbVerticalDivisions').val() == 0) {
        $('#select2-cbVerticalDivisions-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbVerticalDivisions-container').removeClass("cbError");
    }

    if ($('#cbHorizontalDivisions').val() == 0) {
        $('#select2-cbHorizontalDivisions-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbHorizontalDivisions-container').removeClass("cbError");
    }


    if ($('#cbisDrill').val() == 0) {
        $('#select2-cbisDrill-container').addClass("cbError");
        aux = false;
    } else {
        if ($('#cbisDrill').val() == 2) {
            if ($('#cbHingeDirection').val() == 0) {
                $('#select2-cbHingeDirection-container').addClass("cbError");
                aux = false;
            } else {
                $('#select2-cbHingeDirection-container').removeClass("cbError");
            }
        }
        $('#select2-cbisDrill-container').removeClass("cbError");
    }

    if ($('#cbFingerPull').val() == 0) {
        $('#select2-cbFingerPull-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbFingerPull-container').removeClass("cbError");
    }



    if ($("input[name=radioOver]").is(':checked')) {
        $("input[name=radioOver]").removeClass("is-invalid");

    } else {
        $("input[name=radioOver]").addClass("is-invalid");
        aux = false;
    }

    return aux;
}

function ValidarCamposVaciosDXO() {
    var aux = true;

    if ($('#cbPanel').val() == 0) {
        $('#select2-cbPanel-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbPanel-container').removeClass("cbError");
    }

    if ($('#cbDoorType').val() == 0) {
        $('#select2-cbDoorType-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorType-container').removeClass("cbError");
    }

    if ($('#cbDoorOpt').val() == 0) {
        $('#select2-cbDoorOpt-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorOpt-container').removeClass("cbError");
    }
    if ($('#iptWidth').val() == "" || $('#iptWidth').val() == 0) {
        $('#iptWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptWidth').removeClass("is-invalid");
    }

    if ($('#iptHeight').val() == "" || $('#iptHeight').val() == 0) {
        $('#iptHeight').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptHeight').removeClass("is-invalid");
    }

    if ($('#CantidadFila').val() == "" || $('#CantidadFila').val() == 0) {
        $('#CantidadFila').addClass("is-invalid");
        aux = false;
    } else {
        $('#CantidadFila').removeClass("is-invalid");
    }

    return aux;
}

function QuitarClaseErrorACombos() {
    $('#select2-cbMaterial-container').removeClass("cbError");
    $('#select2-cbDoorStyle-container').removeClass("cbError");
    $('#select2-cbStileWidth-container').removeClass("cbError");
    $('#select2-cbRailWidth-container').removeClass("cbError");
    $('#select2-cbPreparation-container').removeClass("cbError");
    $('#select2-cbPanelMaterial-container').removeClass("cbError");
    $('#select2-cbIsOpeningMeasurement-container').removeClass("cbError");
    $('#select2-cbDoorAssembly-container').removeClass("cbError");
    $('#select2-cbOutsideEdgeProfile-container').removeClass("cbError");
    $('#select2-cbInsideEdgeProfile-container').removeClass("cbError");
    $('#select2-cbVerticalDivisions-container').removeClass("cbError");
    $('#select2-cbHorizontalDivisions-container').removeClass("cbError");
    $('#select2-cbHingeDirection-container').removeClass("cbError");
    $('#select2-cbisDrill-container').removeClass("cbError");
    $('#select2-cbFingerPull-container').removeClass("cbError");    
    $('#CantidadFila').removeClass("is-invalid");
    $('#iptHeight').removeClass("is-invalid");
    $('#iptWidth').removeClass("is-invalid");
    $('#select2-cbPanel-container').removeClass("cbError");
    $('#select2-cbDoorType-container').removeClass("cbError");
    $('#select2-cbDoorOpt-container').removeClass("cbError");
}
