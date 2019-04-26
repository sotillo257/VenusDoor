var allMaterial = [];
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
    if (allMaterial.length == 0) {
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
        AllRailWidth = GetAllBottomRail();
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
        AllStileWidth = GetAllTopRail();
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
    for (var i = 0; i < AllPanelMaterial.length; i++) {
        if (AllPanelMaterial[i].Status.Id == 1 && AllPanelMaterial[i].Id == pPanelMaterial) {
            option += '<option value="' + AllPanelMaterial[i].Id + '">' + AllPanelMaterial[i].Description + '</option>';

        }
        if (pMaterial == 6) {
            if (pPanelStyle == 2) {
                if (AllPanelMaterial[i].Status.Id == 1 && AllPanelMaterial[i].Id == 1) {
                    option += '<option value="' + AllPanelMaterial[i].Id + '">' + AllPanelMaterial[i].Description + '</option>';

                }
            } else if (pPanelStyle == 5 || pPanelStyle == 6){
                if (AllPanelMaterial[i].Status.Id == 1 && AllPanelMaterial[i].Id == 5) {
                    option += '<option value="' + AllPanelMaterial[i].Id + '">' + AllPanelMaterial[i].Description + '</option>';

                }
            }

        }
    
    $("#cbPanelMaterial").empty().append(option);
    $("#cbPanelMaterial").val(pPanelMaterial);
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
    lbl += '<label style="margin-left: 10px;"><input style="margin-right: 8px;" type="radio" name="radioOver" data-id="2">Overlay Door Type</label>';
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