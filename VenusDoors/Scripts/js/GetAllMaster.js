var allMaterial = "";
var AllInsideEdgeProfile = "";
var AllOutsideEdgeProfile = "";
var allDoorStyle = '';
var AllRailWidth = '';
var AllStileWidth = '';
var AllDoorAssembly = '';
var AllPanelType = '';
var AllPanelMaterial = '';
var AllVerticalDivisions = '';
var AllHorizontalDivisions = '';
var AllHingeDirection = '';
var allDoorType = '';
var allDoorOption = '';
var allDecimals = '';
var Inicio = 0;
$(document).ready(function () {
    $(document).on('change', '.Doors', function () {
        changeDoorPicture();
    });

    $(document).on('change', '#cbDoorStyle', function () {
        ChangeDoorStylePanel($("#cbDoorStyle").val());
        GetInsideAndOutside($("#cbDoorStyle").val());
    });

    $(document).on('change', '.Profile', function () {
        ChangeProfile();
    });

    $(document).on('change', '#cbPanel', function () {
        changeDoorPicture();
        ChangeProfile();
    });

    $(document).on('change', '#cbMaterial', function () {
        var pMaterial = $("#cbMaterial").val();
        var pDoorStyle = $("#cbDoorStyle").val();
        llenarComboPanelMaterial(pMaterial, pDoorStyle);
    });
});
function GetAllMaterial() {
    var lisDate = [];
   var lisDate = [];$.ajax({
        url: urlGetAllMaterial,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining Material", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
    return lisDate;
}
function llenarComboMaterial(pMaterial) {
    if (allMaterial == '') {
        allMaterial = GetAllMaterial();
    }

    var option = '';
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

function GetAllInsideEdgeProfile() {
   var lisDate = [];$.ajax({
        url: urlGetAllInsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining Inside Edge Profile", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
   return lisDate;
}
function llenarComboIEP(pIEP) {
    if (AllInsideEdgeProfile == '') {
        AllInsideEdgeProfile = GetAllInsideEdgeProfile();
    }

    var option = '';
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

function GetAllOutsideEdgeProfile() {
   var lisDate = [];$.ajax({
        url: urlGetAllOutsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining Outside Edge Profile", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
   return lisDate;
}
function llenarComboOEP(pOEP) {
    if (AllOutsideEdgeProfile == '') {
        AllOutsideEdgeProfile = GetAllOutsideEdgeProfile();
    }

    var option = '';
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

function GetAllDoorStyle() {
   var lisDate = [];$.ajax({
        url: urlGetAllDoorStyle,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining Door Style", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
return lisDate;
}
function llenarComboDoorStyle(pDoorStyle) {
    if (allDoorStyle == '') {
        allDoorStyle = GetAllDoorStyle();
    }
    var option = '';
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

function GetAllBottomRail() {
   var lisDate = [];$.ajax({
        url: urlGetAllBottomRail,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining Bottom Rail", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
return lisDate;
}
function llenarComboRailWidth(pRailWidth) {
    if (AllRailWidth == '') {
        AllRailWidth = GetAllTopRail();
    }
    var option = '';
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

function GetAllTopRail() {
   var lisDate = [];$.ajax({
        url: urlGetAllTopRail,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;

            }
            else {
                LlammarModal("Danger", "Error obtaining Top Rail", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
   return lisDate;
}
function llenarComboStileWidth(pStileWidth) {
    if (AllStileWidth == '') {
        AllStileWidth = GetAllBottomRail();
    }
    var option = '';
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

function GetAllJoin() {
   var lisDate = [];$.ajax({
        url: urlGetAllJoin,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
             lisDate =  data;
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
   return lisDate;
}
function llenarComboDoorAssembly(pDoorAssembly) {
    if (AllDoorAssembly == '') {
        AllDoorAssembly = GetAllJoin();
    }
    var option = '';
    for (var i = 0; i < AllDoorAssembly.length; i++) {
        if (AllDoorAssembly[i].Status.Id == 1) {
            option += '<option value="' + AllDoorAssembly[i].Id + '">' + AllDoorAssembly[i].Description + '</option>';
        }
    }
    $("#cbDoorAssembly").empty().append(option);
    if (pDoorAssembly != 0 && pDoorAssembly != 7) {
        $("#cbDoorAssembly").val(pDoorAssembly);
    }
}

function GetAllPanel() {
   var lisDate = [];$.ajax({
        url: urlGetAllPanel,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;

            }
            else {
                LlammarModal("Danger", "Error obtaining Panel", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
     return lisDate;
}
function llenarComboPanelStyle(pPanelStyle) {
    if (AllPanelType == '') {
        AllPanelType = GetAllPanel();
    }
    var option = '';
    for (var i = 0; i < AllPanelType.length; i++) {
        if (AllPanelType[i].Status.Id == 1) {
            option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
        }
    }
    $("#cbPanel").empty().append(option);
    if (pPanelStyle != 0 && pPanelStyle != 3) {
        $("#cbPanel").val(pPanelStyle);
    }
}

function GetAllPanelMaterial() {
   var lisDate = [];$.ajax({
        url: urlGetAllPanelMaterial,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining Panel Material", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
   return lisDate;
}
function llenarComboPanelMaterial(pMaterial, pPanelStyle) {
    if (AllPanelMaterial == '') {
        AllPanelMaterial = GetAllPanelMaterial();
    }
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
    var option = '';
    var bandera = true;
    var item1 = 0;
    var item2 = 0;
    for (var i = 0; i < AllPanelMaterial.length; i++) {
        if (AllPanelMaterial[i].Status.Id == 1 && AllPanelMaterial[i].Id == pPanelMaterial) {
            option += '<option value="' + AllPanelMaterial[i].Id + '">' + AllPanelMaterial[i].Description + '</option>';
            item1 = AllPanelMaterial[i].Id;
        }
        if (pMaterial == 6) {
            if (pPanelStyle == 1003) {
                if (AllPanelMaterial[i].Status.Id == 1 && AllPanelMaterial[i].Id == 1) {
                    option += '<option value="' + AllPanelMaterial[i].Id + '">' + AllPanelMaterial[i].Description + '</option>';
                    bandera = false;
                    item2 = AllPanelMaterial[i].Id;
                }
            } else if (pPanelStyle == 1002 ){
                if (AllPanelMaterial[i].Status.Id == 1 && AllPanelMaterial[i].Id == 5) {
                    option += '<option value="' + AllPanelMaterial[i].Id + '">' + AllPanelMaterial[i].Description + '</option>';
                    bandera = false;
                    item2 = AllPanelMaterial[i].Id;
                }
            }
        }   
    }
        $("#cbPanelMaterial").empty().append(option);
    if (bandera) {
        $("#cbPanelMaterial").val(pPanelMaterial);
    } else {
       
        if (item2 == _PanelMAterial || item1 == _PanelMAterial) {
            $("#cbPanelMaterial").val(_PanelMAterial);
        }  else {
            
            $("#cbPanelMaterial").val(pPanelMaterial);
        }
      
       
    }
}

function GetAllVerticalDivisions() {
   var lisDate = [];$.ajax({
        url: urlGetAllVerticalDivisions,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining Vertical Divisions", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
   return lisDate;
}
function llenarComboVerticalDivisions(pVerticalD) {
    if (AllVerticalDivisions == '') {
        AllVerticalDivisions = GetAllVerticalDivisions();
    }
    var option = '';
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

function GetAllHorizontalDivisions() {
   var lisDate = [];$.ajax({
        url: urlGetAllHorizontalDivisions,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining Horizontal Divisions", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
     return lisDate;
}
function llenarComboHorizontalDivisions(pHorizontal) {
    if (AllHorizontalDivisions == '') {
        AllHorizontalDivisions = GetAllHorizontalDivisions();
    }
    var option = '';
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

function GetAllHingeDirection() {
   var lisDate = [];$.ajax({
        url: urlGetAllHingeDirection,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            AllHingeDirection = data;
            if (data != null) {
                 lisDate =  data;
            }
            else {
                MensajeModal("Error al obtener Hinge Direction", 5);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
   return lisDate;
}
function llenarComboHingeDirection(pDirection) {
    if (AllHingeDirection == '') {
        AllHingeDirection = GetAllHingeDirection();
    }
    var option = '';
    for (var i = 0; i < AllHingeDirection.length; i++) {
        if (AllHingeDirection[i].Id != 3) {
            option += '<option value="' + AllHingeDirection[i].Id + '">' + AllHingeDirection[i].Direction + '</option>';
        }
    }
    $("#cbHingeDirection").empty().append(option);
    if (pDirection != 0) {
        if (pDirection == 3) {
            $("#cbHingeDirection").val(0);
        } else {
            $("#cbHingeDirection").val(pDirection);
        }
    }
}

function GetAllDoorType() {
   var lisDate = [];$.ajax({
        url: urlGetAllDoorType,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining DoorType", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
   return lisDate;
}
function llenarComboDoorType(pdType) {
    if (allDoorType == '') {
        allDoorType = GetAllDoorType();
    }
    var option = '';
    for (var i = 0; i < allDoorType.length; i++) {
        if (allDoorType[i].Status.Id == 1) {
            option += '<option value="' + allDoorType[i].Id + '">' + allDoorType[i].Description + '</option>';
        }
    }
    $("#cbDoorType").empty().append(option);
    if (pdType != 0) {
        $("#cbDoorType").val(pdType);
    } else {
        $("#cbDoorType").val(2);
    }
}

function GetAllDoorOption() {
   var lisDate = [];$.ajax({
        url: urlGetAllDoorOption,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining DoorOption", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
return lisDate;
}
function llenarComboDoorOption(pDoorOp) {
    if (allDoorOption == '') {
        allDoorOption = GetAllDoorOption();
    }
    var option = '';
    for (var i = 0; i < allDoorOption.length; i++) {
        if (allDoorOption[i].Status.Id == 1) {
            option += '<option value="' + allDoorOption[i].Id + '">' + allDoorOption[i].Description + '</option>';
        }
    }
    $("#cbDoorOpt").empty().append(option);
    if (pDoorOp != 0) {
        $("#cbDoorOpt").val(pDoorOp);
    } else {
        $("#cbDoorOpt").val(1);
    }
}

function GetAllDecimals() {
   var lisDate = [];$.ajax({
        url: urlGetAllDecimals,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                 lisDate =  data;
            }
            else {
                LlammarModal("Danger", "Error obtaining Decimals");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
   });
   return lisDate;
}
function llenarComboDecimalW(pDecimalW) {
    if (allDecimals == '') {
        allDecimals = GetAllDecimals();
    }
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
    if (allDecimals == '') {
        allDecimals = GetAllDecimals();
    }
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

function PrintDoorOverlay(pOverlay) {
    var lbl = '<label><input style="margin-right: 8px;" type="radio" name="radioOver" data-id="1">Inset Door Type</label>';
    lbl += '<label style="margin-left: 10px;"><input style="margin-right: 8px;" checked type="radio" name="radioOver" data-id="2">Overlay Door Type</label>';
    $("#isOverlay").html(lbl);
}

function llenarComboFinger(pFinger) {

    var option = '';
    option += '<option value="1">No</option>';
    option += '<option value="2">Yes</option>';
    $("#cbFingerPull").empty().append(option);
    if (pFinger != 0) {
        $("#cbFingerPull").val(pFinger);
    }
}

function llenarComboIsDrill(pDrill) {

    var option = '';
    option += '<option value="1">No</option>';
    option += '<option value="2">Yes</option>';
    $("#cbisDrill").empty().append(option);
    if (pDrill != 0) {
        $("#cbisDrill").val(pDrill);
    }
}

function llenarComboIsOpen(pOpen) {

    var option = '';
    option += '<option value="1">No opening</option>';
    option += '<option value="2">Opening</option>';
    $("#cbIsOpeningMeasurement").empty().append(option);
    if (pOpen != 0) {
        $("#cbIsOpeningMeasurement").val(pOpen);
    }
}

function GetInsideAndOutside(pDoorStyle) {

    var datos =
    {
        pDoorStyle: pDoorStyle
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlGetInsideAndOutside,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result.Success) {

                var inside = $("#cbInsideEdgeProfile").val();
                var outside = $("#cbOutsideEdgeProfile").val();
                var option = '';
                for (var i = 0; i < result.listInside.length; i++) {
                    option += '<option value="' + result.listInside[i].Id + '">' + result.listInside[i].Description + '</option>';

                }
                $("#cbInsideEdgeProfile").empty().append(option);
                option = '';
                for (var i = 0; i < result.listOutside.length; i++) {
                    option += '<option value="' + result.listOutside[i].Id + '">' + result.listOutside[i].Description + '</option>';

                }
                $("#cbOutsideEdgeProfile").empty().append(option);
            } else {
                LlammarModal("Danger", "Error", result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "while deleting");
        },

    });

}

function checkIsOverlay(pOverlay) {
    var lbl = '<label><input disabled style="margin-right: 8px;" type="radio" name="radioOver" data-id="1">Inset Door Type</label>';
    lbl += '<label style="margin-left: 10px;"><input disabled style="margin-right: 8px;" type="radio" name="radioOver" data-id="2">Overlay Door Type</label>';
    $("#isOverlay").html(lbl);
    if (pOverlay != 0) {
        $("input[name=radioOver][data-id='" + pOverlay + "']").prop("checked", true);
    }
}

function LimpiarCombos() {
    $('input').val("");
    $('#iptCost').val("0.00");
    llenarComboDoorOption(0);
    $("input[name=radioOver]").prop("checked", false);
    llenarComboMaterial(0);
    llenarComboDoorStyle(0);
    llenarComboIEP(0);
    llenarComboOEP(0);
    llenarComboStileWidth(0);
    llenarComboRailWidth(0);
    llenarComboDoorAssembly(0);
    llenarComboPanelStyle(0);
    llenarComboPanelMaterial(0);
    llenarComboIsOpen(0);
    llenarComboVerticalDivisions(0);
    llenarComboHorizontalDivisions(0);
    llenarComboIsDrill(0);
    llenarComboDoorType(0);
    llenarComboFinger(0);
    llenarComboDecimalW(0);
    llenarComboDecimalH(0);
}

function changeDoorStyle() {
    var bandera = true;

    if ($("#cbDoorStyle").val() == 1002) {
        var panelType = $("#cbPanel").val();
        option = '<option value="0">Select</option>';
        for (var i = 0; i < AllPanelType.length; i++) {
            if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id != 2) {
                option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
            }
        }
        $("#cbPanel").empty().append(option);

        if (panelType != 2) {
            $("#cbPanel").val(panelType);
        } else {
            $("#cbPanel").val(0);
        }


    } else if ($("#cbDoorStyle").val() == 1003) {

        var panelType = $("#cbPanel").val();
        var option = '<option value="0">Select</option>';
        for (var i = 0; i < AllPanelType.length; i++) {
            if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id == 2) {
                option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
            }
        }
        $("#cbPanel").empty().append(option);
        $("#cbPanel").val(2);
    } else if ($("#cbDoorStyle").val() == 1004) {

        llenarComboPanelStyle(0);
    } else if ($("#cbDoorStyle").val() == 1005) {
        llenarComboPanelStyle(0);
    }
    else if ($("#cbDoorStyle").val() == 1006) {
        llenarComboPanelStyle(0);
    } else if ($("#cbDoorStyle").val() == 1007) {
        llenarComboPanelStyle(0);
    } else if ($("#cbDoorStyle").val() == 1008) {
        llenarComboPanelStyle(0);
    } else if ($("#cbDoorStyle").val() == 1009) {

        var option = '<option value="0">Select</option>';
        for (var i = 0; i < AllPanelType.length; i++) {
            if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id == 5) {
                option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
            }
        }
        $("#cbPanel").empty().append(option);
        $("#cbPanel").val(5);
    } else if ($("#cbDoorStyle").val() == 1010) {
        // 
        //var option = '<option value="slab">Slab</option>';
        //$("#cbPanel").empty().append(option);
        //$("#cbInsideEdgeProfile").empty().append(option);
        //$("#cbOutsideEdgeProfile").empty().append(option);
        //$("#cbDoorAssembly").empty().append(option);
        //$('#DoorPicture').attr('src', "/Content/img/Doors/slab.png");
        //$('#ProfilePicture').attr('src', "/Content/img/Profile/slab.png");
        //bandera = false;
    }
    if (bandera) {
        //changeDoorPicture();
        //ChangeProfile();
    }

}

function HingeShow(Drills) {
    if (Drills == true) {
        $("#HingeDirectionDiv").css('display', 'block');
        HingeCalculate();
    } else {
        $("#HingeDirectionDiv").css('display', 'none');
    }
}

function HingeCalculate() {
    var Height = parseFloat($(".iptHeight").val())
    if (Height >= 5 && Height < 37) {

        var ip1 = 3.5;
        var ip2 = Height - 3.5;

        $(".hp1").css('display', 'block');
        $(".hp2").css('display', 'block');
        $(".hp3").css('display', 'none');
        $(".hp4").css('display', 'none');
        $(".hp5").css('display', 'none');
        $("#HingePositionsDiv").removeClass("col-md-4").addClass("col-md-3");
        $("#HingePositionsDiv").removeClass("col-md-5");
        $("#HingePositionsDiv").removeClass("col-md-6");

        $('.HPinpt1').val(ip1);
        $('.HPinpt2').val(ip2);
        $('.HPinpt3').val("No hinge");
        $('.HPinpt4').val("No hinge");
        $('.HPinpt5').val("No hinge");

    }
    else if (Height >= 37 && Height < 61) {

        var ip1 = 3.5;
        var ip2 = Height / 2;
        var ip3 = Height - 3.5;

        $(".hp1").css('display', 'block');
        $(".hp2").css('display', 'block');
        $(".hp3").css('display', 'block');
        $(".hp4").css('display', 'none');
        $(".hp5").css('display', 'none');
        $("#HingePositionsDiv").removeClass("col-md-3").addClass("col-md-4");
        $("#HingePositionsDiv").removeClass("col-md-5");
        $("#HingePositionsDiv").removeClass("col-md-6");

        $('.HPinpt1').val(ip1);
        $('.HPinpt2').val(ip2);
        $('.HPinpt3').val(ip3);
        $('.HPinpt4').val("No hinge");
        $('.HPinpt5').val("No hinge");

    }
    else if (Height >= 61 && Height < 81) {

        var ip1 = 3.5;
        var ip2 = ((Height - 7) / 3) + 3.5;
        var ip3 = Height - (((Height - 7) / 3) + 3.5);
        var ip4 = Height - 3.5;

        $(".hp1").css('display', 'block');
        $(".hp2").css('display', 'block');
        $(".hp3").css('display', 'block');
        $(".hp4").css('display', 'block');
        $(".hp5").css('display', 'none');
        $("#HingePositionsDiv").removeClass("col-md-4").addClass("col-md-5");
        $("#HingePositionsDiv").removeClass("col-md-3");
        $("#HingePositionsDiv").removeClass("col-md-6");

        $('.HPinpt1').val(ip1);
        $('.HPinpt2').val(ip2);
        $('.HPinpt3').val(ip3);
        $('.HPinpt4').val(ip4);
        $('.HPinpt5').val("No hinge");

    }
    else if (Height >= 81 && Height < 101) {

        var ip1 = 3.5;
        var ip2 = 3.5 + (((Height / 2) - 3.5) / 2);
        var ip3 = Height / 2;
        var ip4 = Height - (3.5 + (((Height / 2) - 3.5) / 2));
        var ip5 = Height - 3.5;

        $(".hp1").css('display', 'block');
        $(".hp2").css('display', 'block');
        $(".hp3").css('display', 'block');
        $(".hp4").css('display', 'block');
        $(".hp5").css('display', 'block');
        $("#HingePositionsDiv").removeClass("col-md-5").addClass("col-md-6");
        $("#HingePositionsDiv").removeClass("col-md-3");
        $("#HingePositionsDiv").removeClass("col-md-4");

        $('.HPinpt1').val(ip1);
        $('.HPinpt2').val(ip2);
        $('.HPinpt3').val(ip3);
        $('.HPinpt4').val(ip4);
        $('.HPinpt5').val(ip5);

    }
}

var _PanelType = 0;
function ChangeDoorStylePanel(pIdDoorStyle) {
    var bandera = true;
    var panelType = $("#cbPanel").val();
    if (panelType == 3) {
        panelType = 0;
    }
    llenarComboDoorAssembly($("#cbDoorAssembly").val());
    llenarComboPanelStyle(panelType);
    if (pIdDoorStyle == 1002) {

        option = '';
        for (var i = 0; i < AllPanelType.length; i++) {
            if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id != 2) {
                option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
            }
        }
        $("#cbPanel").empty().append(option);

        if (panelType != 2) {
            $("#cbPanel").val(panelType);
        }


    } else if (pIdDoorStyle == 1003) {

        var option = '<option value="0">Select</option>';
        for (var i = 0; i < AllPanelType.length; i++) {
            if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id == 2) {
                option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
            }
        }
        $("#cbPanel").empty().append(option);
        $("#cbPanel").val(2);

    } else if (pIdDoorStyle == 1009) {

        var option = '<option value="0">Select</option>';
        for (var i = 0; i < AllPanelType.length; i++) {
            if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id == 5) {
                option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
            }
        }
        $("#cbPanel").empty().append(option);
        $("#cbPanel").val(5);
    } else if (pIdDoorStyle == 1010) {

        var option = '<option value="3">Slab</option>';
        $("#cbPanel").empty().append(option);
        $("#cbPanel").hide();
        option = '<option value="1">Slab</option>';
        $("#cbInsideEdgeProfile").empty().append(option);
        $("#cbInsideEdgeProfile").hide();
        $("#cbOutsideEdgeProfile").empty().append(option);
        $("#cbOutsideEdgeProfile").hide();
        option = '<option value="7">Slab</option>';
        $("#cbDoorAssembly").empty().append(option);
        $("#cbDoorAssembly").hide();
        $('#DoorPicture').attr('src', "/Content/img/Doors/slab.png");
        $('#ProfilePicture').attr('src', "/Content/img/Profile/slab.png");
        bandera = false;
    }
    if (bandera) {
        changeDoorPicture();
        ChangeProfile();
    }
    var pMaterial = $("#cbMaterial").val();
    var pPanelStyle = $("#cbDoorStyle").val();
    llenarComboPanelMaterial(pMaterial, pPanelStyle);
}

//Change Picture Door and Profile
function ChangeProfile() {
    var Outside = $('#cbOutsideEdgeProfile').val();
    var Inside = $('#cbInsideEdgeProfile').val();
    var Panel = $('#cbPanel').val();

    if (Panel == 5) {
        FlatPanel(Outside, Inside);
    }
    if (Panel == 6) {
        FlatPanelBeaded(Outside, Inside);
    }
    if (Panel == 2) {
        RaisedPanel(Outside, Inside);
    }

}

function FlatPanel(Outside, Inside) {
    var ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel.png";
    var urlFolder = "/Content/img/Profile/";
    if (Outside == 13) {
        if (Inside == 4) {
            ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Double_Roman_Ogee_Reba_flat_panel.png";
        } else if (Inside == 3 || Inside == 13) {
            ProfileUrl = "-Double_Roman_Ogee_Shaker_22_flat_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Double_Roman_Ogee_shaker_goove_flatpanel.png";
        }
    }
    if (Outside == 2) {
        if (Inside == 4) {
            ProfileUrl = "-Fingerpull_ogee_flat_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Fingerpull_Reba_flat_panel.png";
        } else if (Inside == 3 || Inside == 13) {
            ProfileUrl = "-Fingerpull_Shaker22_flat_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Finger_pull_shaker_goove_flat_panel.png";
        }
    }
    if (Outside == 17) {
        if (Inside == 4) {
            ProfileUrl = "-Half_Reba_ogee_flat_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Half_Reba_Reba_flat_panel.png";
        } else if (Inside == 3 || Inside == 13) {
            ProfileUrl = "-Half_Reba_Shaker_22_flat_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Half_Reba_shaker_goove_flat_panel.png";
        }
    }
    if (Outside == 11) {

        if (Inside == 4) {
            ProfileUrl = "-Little_bone_ogee_flat_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Little_bone_Reba_flat_panel.png";
        } else if (Inside == 3 || Inside == 13) {
            ProfileUrl = "-Little_bone_Shaker_22_flat_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Little_bone_shaker_goove_flat_panel.png";
        }
    }
    if (Outside == 5) {
        if (Inside == 4) {
            ProfileUrl = "-Reba_ogee_flat_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Reba_Reba_flat_panel.png";
        } else if (Inside == 3 || Inside == 13) {
            //  ProfileUrl = "-Reba_Shaker_22_flat_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Reba_shaker_goove_flat_panel.png";
        }
    }
    if (Outside == 6) {
        if (Inside == 4) {
            ProfileUrl = "-Shaker_ogee_flat_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Shaker_Reba_flat_panel.png";
        } else if (Inside == 3 || Inside == 13) {
            ProfileUrl = "-Shaker_Shaker_22_flat_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Shaker_shaker_goove_flat_panel.png";
        }
    }
    $('#ProfilePicture').attr('src', urlFolder + ProfileUrl);
}

function FlatPanelBeaded(Outside, Inside) {
    var ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel.png";
    var urlFolder = "/Content/img/Profile/";
    if (Outside == 13) {
        if (Inside == 4) {
            ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel_beaded.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Double_Roman_Ogee_Reba_flat_panel_beaded.png";
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
            ProfileUrl = "-Shaker_Shaker_22_flat_panel_beaded.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Shaker_shaker_goove_flat_panel_beaded.png";
        }
    }
    $('#ProfilePicture').attr('src', urlFolder + ProfileUrl);
}

function RaisedPanel(Outside, Inside) {
    var ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel.png";
    var urlFolder = "/Content/img/Profile/";
    if (Outside == 13) {
        if (Inside == 4) {
            ProfileUrl = "-Double_Roman_Ogee_ogee_raised_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Double_Roman_Ogee_Reba_raised_panel.png";
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
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
        } else if (Inside == 3 || Inside == 13) {
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
    var respuesta = "/Content/img/Doors/Cabinet Vector-01.png";
    if (Panel == 5) {
        respuesta = FlatPanelDoor(Style);
    }
    if (Panel == 6) {
        if (Style == 1010) {
            respuesta = "/Content/img/Doors/slab.png";
        }
        else {
            respuesta = "/Content/img/Doors/Cabinet Vector-17.png";
        }

    }
    if (Panel == 2) {
        respuesta = RaisedPanelDoor(Style);
    }
    if (Panel == 3) {
        respuesta = "/Content/img/Doors/slab.png";
    }

    $('#DoorPicture').attr('src', respuesta);
}

function FlatPanelDoor(Style) {
    var stile = $('#cbRailWidth').val();
    var rail = $('#cbStileWidth').val();
    var DoorUrl = "Cabinet Vector-01.png";
    var urlFolder = "/Content/img/Doors/";

    switch (parseInt(Style)) {
        case 1002:
            if ($('#cbDoorAssembly').val() != 2) {
                if (stile == 3 && rail == 3) {
                    DoorUrl = "Cabinet Vector-02.png";
                }
                else if (stile == 1 && rail == 1) {
                    DoorUrl = "Cabinet Vector-14.png";
                }
            }
            else {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1004:
            if ($('#cbDoorAssembly').val() != 2) {
                if (stile == 3 || rail == 3) {
                    DoorUrl = "Cabinet Vector-05.png";
                }
                else if (stile == 1 && rail == 1) {
                    DoorUrl = "Cabinet Vector-06.png";
                }
            }
            else {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1005:
            if ($('#cbDoorAssembly').val() == 1) {
                DoorUrl = "Cabinet Vector-03.png";
            }
            else {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1006:
            if ($('#cbDoorAssembly').val() == 1) {
                DoorUrl = "Cabinet Vector-03.png";
            }
            else {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1007:
            if ($('#cbDoorAssembly').val() == 1) {
                DoorUrl = "Cabinet Vector-03.png";
            }
            else {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1008:
            if ($('#cbDoorAssembly').val() == 1) {
                DoorUrl = "Cabinet Vector-01.png";
            }
            else {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1009:
            DoorUrl = "Cabinet Vector-13.png";
            break;
        case 1010:
            DoorUrl = "slab.png";

            break;
        default:
            DoorUrl = "Cabinet Vector-03.png";
            break;
    }

    return urlFolder + DoorUrl;

}

function RaisedPanelDoor(Style) {
    var stile = $('#cbRailWidth').val();
    var rail = $('#cbStileWidth').val();
    var DoorUrl = "Cabinet Vector-07.png";
    var urlFolder = "/Content/img/Doors/";

    switch (parseInt(Style)) {
        case 1003:
            if ($('#cbDoorAssembly').val() != 2) {
                if (stile == 3 && rail == 3) {
                    DoorUrl = "Cabinet Vector-11.png";
                }
                else if (stile == 1 && rail == 1) {
                    DoorUrl = "Cabinet Vector-16.png";
                }
            }
            else {
                DoorUrl = "Cabinet Vector-07.png";
            }
            break;
        case 1004:
            if ($('#cbDoorAssembly').val() != 2) {
                DoorUrl = "Cabinet Vector-11.png";

            }
            else {
                DoorUrl = "Cabinet Vector-07.png";
            }
            break;
        case 1005:
            if ($('#cbDoorAssembly').val() == 1) {
                DoorUrl = "Cabinet Vector-16.png";
            }
            else {
                DoorUrl = "Cabinet Vector-07.png";
            }
            break;
        case 1006:
            if ($('#cbDoorAssembly').val() == 1) {
                DoorUrl = "Cabinet Vector-16.png";
            }
            else {
                DoorUrl = "Cabinet Vector-07.png";
            }
            break;
        case 1007:
            if ($('#cbDoorAssembly').val() == 1) {
                DoorUrl = "Cabinet Vector-16.png";
            }
            else {
                DoorUrl = "Cabinet Vector-07.png";
            }
            break;
        case 1008:
            if ($('#cbDoorAssembly').val() == 1) {
                DoorUrl = "Cabinet Vector-09.png";
            }
            else {
                DoorUrl = "Cabinet Vector-07.png";
            }
            break;
        case 1009:
            DoorUrl = "Cabinet Vector-13.png";
            break;
        case 1010:
            DoorUrl = "slab.png";

            break;
        default:
            DoorUrl = "Cabinet Vector-11.png";
            break;
    }

    return urlFolder + DoorUrl;

}
//Change Picture Door and Profile