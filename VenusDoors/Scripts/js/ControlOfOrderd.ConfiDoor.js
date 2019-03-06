$(document).ready(function () {
    $(".btBuild").on('click', function () {
        $("#lblTitulo").text("Create a new door");
        $("#lblSubTitulo").text("Choose the the best door option that fit your needs.");
        $("#btConfSave").hide();
        $("#btxLeft").hide();
        $("#btXclose").show();
        $("#btConfAdd").show();
        $("#btModify").hide();

        $("select").prop('disabled', false);
        $("#iptQuantity").prop('disabled', false);
        $("#iptWidth").prop('disabled', false);
        $("#iptHeight").prop('disabled', false);
        $(".select2-selection").css('background-color', '#fff!important');
        LimpiarCombos();
    });

    $("#btModify").on('click', function () {
        $("#lblTitulo").text("Modifying the door");
        $("#lblSubTitulo").text("After you make your changes remember to press \"Save\" to confirm your changes");
        $("#btConfSave").show();
        $("#btxLeft").show();
        $("#btXclose").hide();
        $("#btConfAdd").hide();
        $("#btModify").hide();

        $("select").prop('disabled', false);
        $("#iptQuantity").prop('disabled', false);
        $("#iptWidth").prop('disabled', false);
        $("#iptHeight").prop('disabled', false);
        $("input[name=radioOption]").attr("disabled", false);
        $("input[name=radioOver]").attr("disabled", false);
        $(".select2-selection").css('background-color', '#fff!important');
    });
    $(document).on('click', '#Details', function (event) {
        $("#btModify").show();
        $("#btConfAdd").hide();
        $("#btConfSave").hide();
        $("#btxLeft").hide();
        $("#btXclose").show();
        $("#lblTitulo").text("Details of the door");
        //$("#lblSubTitulo").text("You can change the configuration of this door by clicking on the modify button");

        $("select").prop('disabled', true);
        $("#iptQuantity").prop('disabled', true);
        $("#iptWidth").prop('disabled', true);
        $("#iptHeight").prop('disabled', true);
        $("input[name=radioOption]").attr("disabled", true);
        $("input[name=radioOver]").attr("disabled", true);
        $(".select2-selection").css('background-color', '#eee!important');

        for (var i = 0; i < listDOOR.length; i++) {
            if (listDOOR[i].Id == $(this).attr('data-id')) {
                var aux = listDOOR[i].isFingerPull;

                $('#idDoor').val(listDOOR[i].Id);
                $("#idHingeP").val(listDOOR[i].HingePositions.Id),
                $('#iptWidth').val(listDOOR[i].Width);
                $('#iptHeight').val(listDOOR[i].Height);
                var HTMLImage =
                   ' <center> <img style="height: 100px;width: 235px;margin-top: 20px;" id="ProfilePicture" src="' + listDOOR[i].ProfilePicture + '">' +
                              '<img style="width: 230px;height: 230px;" id="DoorPicture" src="' + listDOOR[i].Picture + '">' +
                              '</center>';
                $('#Picture').html(HTMLImage);
                $('#iptQuantity').val(listDOOR[i].Quantity);
                $('#iptCost').val(listDOOR[i].ItemCost);
                var fingerPull = listDOOR[i].isFingerPull;
                if (fingerPull == false) {
                    fingerPull = 1;
                } else {
                    fingerPull = 2;
                }
                llenarComboFinger(fingerPull);

                var isDrill = listDOOR[i].isDrill;
                if (isDrill == false) {
                    isDrill = 1;
                    HingeCalculate();
                    HingeShow();
                } else {
                    isDrill = 2;
                    HingeCalculate();
                    HingeShow();
                }
                llenarComboIsDrill(isDrill);

                var isOpen = listDOOR[i].IsOpeningMeasurement;
                if (isOpen == false) {
                    isOpen = 1;
                } else {
                    isOpen = 2;
                }
                llenarComboIsOpen(isOpen);

                var isOver = listDOOR[i].isOverlay;
                if (isOver == false) {
                    isOver = 1;
                } else {
                    isOver = 2;
                }
                checkIsOverlay(isOver);
                checkDoorOption(listDOOR[i].DoorOption.Id);
                //llenarComboDecimales(listDOOR[i].Decimales.Id);
                llenarComboMaterial(listDOOR[i].Material.Id);
                llenarComboDoorStyle(listDOOR[i].DoorStyle.Id);
                llenarComboIEP(listDOOR[i].InsideEdgeProfile.Id);
                llenarComboOEP(listDOOR[i].OutsideEdgeProfile.Id);
                llenarComboStileWidth(listDOOR[i].BottomRail.Id);
                llenarComboRailWidth(listDOOR[i].TopRail.Id);
                llenarComboDoorAssembly(listDOOR[i].Join.Id);
                llenarComboPanelStyle(listDOOR[i].Panel.Id);
                llenarComboPanelMaterial(listDOOR[i].Material.Id);
                llenarComboVerticalDivisions(listDOOR[i].VerticalDivisions.Id);
                llenarComboHorizontalDivisions(listDOOR[i].HorizontalDivisions.Id);
                llenarComboHingeDirection(listDOOR[i].HingeDirection.Id);
                llenarComboDoorType(listDOOR[i].DoorType.Id);
                break;
            }
        }
    });
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
    for (var i = 0; i < allDoorOption.length; i++) {
        if (allDoorOption[i].Status.Id == 1) {
            option += '<option value="' + allDoorOption[i].Id + '">' + allDoorOption[i].Description + '</option>';
        }
    }
    $("#cbDoorType").empty().append(option);
    if (pOption != 0) {
        $("#cbDoorType").val(pOption);
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
    var lbl = '<label><input disabled style="margin-right: 8px;" type="radio" name="radioOver" data-id="1">Insert Door Type</label>';
    lbl += '<label style="margin-left: 10px;"><input disabled style="margin-right: 8px;" type="radio" name="radioOver" data-id="2">Overlay Door Type</label>';
    $("#isOverlay").html(lbl);
    if (pOverlay != 0) {
        $("input[name=radioOver][data-id='" + pOverlay + "']").prop("checked", true);
    }
}

function checkDoorOption(pDoorOp) {
    var radioButt = '';
    for (var i = 0; i < allDoorOption.length; i++) {
        if (allDoorOption[i].Status.Id == 1) {
            
            radioButt += '<label style="margin-left: 8px;">';
            radioButt += '<input disabled style="margin-right:5px" name="radioOption" type="radio" data-id="' + allDoorOption[i].Id + '"></input>' + allDoorOption[i].Description + '';
            radioButt += '</label>';
            $("#DivDoorOption").html(radioButt);
        }
    }
    if (pDoorOp != 0) {
        $("input[name=radioOption][data-id='" + pDoorOp + "']").prop("checked", true);
    }
}

function LimpiarCombos() {
    $('input').val("");
    $("input[name=radioOption]").prop("checked", false);
    $("input[name=radioOver]").prop("checked", false);
    //llenarComboDecimales(0);
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
    llenarComboHingeDirection(0);
    llenarComboDoorType(0);
    llenarComboDoorType(0);
    llenarComboFinger(0);
}
