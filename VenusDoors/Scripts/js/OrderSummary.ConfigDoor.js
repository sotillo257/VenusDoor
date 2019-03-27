$(document).ready(function () {
    $(".btBuild").on('click', function () {
        $("#lblTitulo").text("Config Door");
        $("#lblSubTitulo").text("Choose the the best door option that fit your needs.");
        $("#btConfSave").hide();
        $("#btxLeft").hide();
        $("#btXclose").show();
        $("#btConfAdd").show();
        $("#btModify").hide();
        QuitarClaseErrorACombos();
        $("select").prop('disabled', false);
        $("#iptQuantity").prop('disabled', false);
        $("#iptWidth").prop('disabled', false);
        $("#iptHeight").prop('disabled', false);
        $("input[name=radioOption]").attr("disabled", false);
        $("input[name=radioOver]").attr("disabled", false);
        $(".select2-selection").css('background-color', '#fff!important');       
        HingeShow();
        //LimpiarCombos();
    });

    $("#btModify").on('click', function () {
        $("#lblTitulo").text("Modifying the door options");
        $("#lblSubTitulo").text("After you make your changes remember to press \"Save\" to confirm your changes");
        $("#btConfSave").show();
        $("#btxLeft").show();
        $("#btXclose").hide();
        $("#btConfAdd").hide();
        $("#btModify").hide();
        HingeShow();

              
        $("input[name=radioOver]").attr("disabled", false);
        $(".selectModal").prop('disabled', false);
        $(".selectModal > .select2-selection").css('background-color', '#fff!important');
    });

    $("#btnSaveShip").on('click', function () {       
        if (ValidarCamposModalShipping()) {           
            AddNewShippingAddress();       
        } else {
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });

    $(document).on('click', '.ModDoorxUser', function (event) {
        GetDoorxUser();
        QuitarClaseErrorACombos();
        $("#btModify").show();
        $("#btConfAdd").hide();
        $("#btConfSave").hide();
        $("#btxLeft").hide();
        $("#btXclose").show();
        $("#lblTitulo").text("General config");
        $("#lblSubTitulo").text("You can change the general settings by clicking on the Modify button.");
        

        $(".selectModal").prop('disabled', true);                     
        $("input[name=radioOver]").attr("disabled", true);
        $(".selectModal > .select2-selection").css('background-color', '#eee!important');
              
    });

    $("#btConfAdd").on("click", function () {
        LlammarModal("ConfirmOrdenSummary", "Confirm", "Do you want to save this configuration?",
        '<button onclick="AgregarD();" class="Cursor btn btn-success tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Save</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });

    $("#btConfSave").on("click", function () {
        LlammarModal("ConfirmOrdenSummary", "Do you want to save your new changes?", "The doors added to your order will undergo changes. Do you want to proceed with this operation?.<br>(This could take a little time).",
        '<button onclick="NuevosCambiosDXU();" id="btnSaveChanges" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Confirm</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });

        SearchDoor(DoorDashboard);



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
            $("#alertHeight").css('display', 'block');
            $("#alertHeight").text("Minimum is 5 inches.");
        } else if ($('#iptHeight').val() > 100) {
            $('#iptHeight').addClass("is-invalid");
            $("#alertHeight").css('display', 'block');
            $("#alertHeight").text("Maximum is 100 inches.");
        } else {
            $('#iptHeight').removeClass("is-invalid");
            $("#alertHeight").text("");
        }
    });
    GetAllShippingAddress();

    $(".btnModalSA").on('click', function () {
        limpiarInputsShipping();
    });
});

function SearchDoor(data) {

    if (DoorDashboard != '' && listDOOR == '') {
        $('#modalInsert').modal('show');
        $("#btModify").hide();
        $("#btConfAdd").show();
        $("#btConfSave").hide();
        $("#btxLeft").hide();
        $("#btXclose").show();
        $("#lblTitulo").text("Config Door");
        $("#lblSubTitulo").text("Choose the the best door option that fit your needs.");
        if (listDOOR == '') {
        var fingerPull = data.isFingerPull;
        if (fingerPull == false) {
            fingerPull = 1;
        } else {
            fingerPull = 2;
        }
        llenarComboFinger(fingerPull);

        var isDrill = data.isDrill;
        if (isDrill == false) {
            isDrill = 1;
        } else {
            isDrill = 2;
        }
        llenarComboIsDrill(isDrill);
        HingeCalculate();
        HingeShow();

        var isOpen = data.IsOpeningMeasurement;
        if (isOpen == false) {
            isOpen = 1;
        } else {
            isOpen = 2;
        }
        llenarComboIsOpen(isOpen);

        var isOver = data.isOverlay;
        if (isOver == false) {
            isOver = 1;
        } else {
            isOver = 2;
        }
        checkIsOverlay(isOver);
       // checkDoorOption(data.DoorOption.Id);
        llenarComboMaterial(data.Material.Id);
       
        llenarComboIEP(data.InsideEdgeProfile.Id);
        llenarComboOEP(data.OutsideEdgeProfile.Id);
        llenarComboStileWidth(data.BottomRail.Id);
        llenarComboRailWidth(data.TopRail.Id);
        llenarComboDoorAssembly(data.Join.Id);
        llenarComboPanelMaterial(data.Material.Id);
        llenarComboVerticalDivisions(data.VerticalDivisions.Id);
        llenarComboHorizontalDivisions(data.HorizontalDivisions.Id);
        llenarComboHingeDirection(data.HingeDirection.Id);
        if (data.DoorStyle.Id == 1010) {
            llenarComboDoorStyle(data.DoorStyle.Id);
            var option = '<option value="3">Slab</option>';
            $("#cbPanel").empty().append(option);
            $("#cbPanel").hide();
            option = '<option value="1">Slab</option>';
            $("#cbInsideEdgeProfile").empty().append(option);
            $("#cbOutsideEdgeProfile").empty().append(option);
            option = '<option value="7">Slab</option>';
            $("#cbDoorAssembly").empty().append(option);
            $("#cbDoorAssembly").hide();
            $('#DoorPicture').attr('src', "/Content/img/Doors/slab.png");
            $('#ProfilePicture').attr('src', "/Content/img/Profile/slab.png");

        } else {
            llenarComboDoorStyle(data.DoorStyle.Id);
        }
        //$("#iptCost").val(data.ItemCost);
        $("input[name=radioOver]").attr("disabled", false);
        window.history.replaceState({}, document.title, "/" + "../OrderSummary");
        }
     
    } else {

    }

}

function AgregarD() {
    if (ValidarCamposVacios()) {
            InsertDoorsxUser();
    } else {
        $('#modalConfirmOrderSummary').modal('hide');
        LlammarModal("Danger", "You must fill all the fields.", " ");
    }
}

function NuevosCambiosDXU() {
    if (ValidarCamposVacios()) {
        InsertDoorsxUser();
    } else {
        $('#modalConfirmOrderSummary').modal('hide');
        LlammarModal("Danger", "You must fill all the fields.", " ");
    }
}

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

var AllOutsideEdgeProfile = '';
function llenarComboOEP(pOEP) {

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

var AllStileWidth = '';
function llenarComboStileWidth(pStileWidth) {

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

var AllRailWidth = '';
function llenarComboRailWidth(pRailWidth) {

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

var AllDoorAssembly = '';
function llenarComboDoorAssembly(pDoorAssembly) {

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

var AllHorizontalDivisions = '';
function llenarComboHorizontalDivisions(pHorizontal) {

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

var AllHingeDirection = '';
function llenarComboHingeDirection(pDirection) {

    var option = '<option value="0">Select</option>';
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

var allDoorOption= '';
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
    option += '<option value="1">No Drill</option>';
    option += '<option value="2">Drill</option>';
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

function checkIsOverlay(pOverlay) {
    var lbl = '<label><input disabled style="margin-right: 8px;" type="radio" name="radioOver" data-id="1">Inset Door Type</label>';
    lbl += '<label style="margin-left: 10px;"><input disabled style="margin-right: 8px;" type="radio" name="radioOver" data-id="2">Overlay Door Type</label>';
    $("#isOverlay").html(lbl);
    if (pOverlay != 0) {
        $("input[name=radioOver][data-id='" + pOverlay + "']").prop("checked", true);
    }
}

var allDoorOption = '';
function llenarComboDoorOption(pDoorOp) {
    var option = '<option value="0">Select</option>';
    for (var i = 0; i < allDoorOption.length; i++) {
        if (allDoorOption[i].Status.Id == 1) {           
            option += '<option value="' + allDoorOption[i].Id + '">' + allDoorOption[i].Description + '</option>';
        }
    }
    $("#cbDoorOpt").empty().append(option);
    if (pDoorOp != 0) {
        $("#cbDoorOpt").val(pDoorOp);
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
    llenarComboHingeDirection(0);
    llenarComboDoorType(0);    
    llenarComboFinger(0);
    llenarComboDecimalW(0);
    llenarComboDecimalH(0);
}

function QuitarClaseErrorACombos() {
    $('#select2-cbMaterial-container').removeClass("cbError");
    $('#select2-cbDoorStyle-container').removeClass("cbError");
    $('#select2-cbTopRail-container').removeClass("cbError");
    $('#select2-cbBottomRail-container').removeClass("cbError");
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
}

function ValidarCamposVacios() {
    var aux = true;

    if ($('#cbMaterial').val() == 0 || $('#cbMaterial').val() == null) {
        $('#select2-cbMaterial-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbMaterial-container').removeClass("cbError");
    }

    if ($('#cbDoorStyle').val() == 0 || $('#cbDoorStyle').val() == null){
        $('#select2-cbDoorStyle-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorStyle-container').removeClass("cbError");
    }

    if ($('#cbTopRail').val() == 0 || $('#cbTopRail').val() == null) {
        $('#select2-cbTopRail-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbTopRail-container').removeClass("cbError");
    }

    if ($('#cbBottomRail').val() == 0 || $('#cbBottomRail').val() == null) {
        $('#select2-cbBottomRail-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbBottomRail-container').removeClass("cbError");
    }

    if ($('#cbPreparation').val() == 0 || $('#cbPreparation').val() == null) {
        $('#select2-cbPreparation-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbPreparation-container').removeClass("cbError");
    }


    if ($('#cbPanelMaterial').val() == 0 || $('#cbPanelMaterial').val() == null) {
        $('#select2-cbPanelMaterial-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbPanelMaterial-container').removeClass("cbError");
    }

    if ($('#cbIsOpeningMeasurement').val() == 0 || $('#cbIsOpeningMeasurement').val() == null) {
        $('#select2-cbIsOpeningMeasurement-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbIsOpeningMeasurement-container').removeClass("cbError");
    }

    if ($('#cbDoorAssembly').val() == 0 || $('#cbDoorAssembly').val() == null) {
        $('#select2-cbDoorAssembly-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorAssembly-container').removeClass("cbError");
    }
    var xsx = $('#cbOutsideEdgeProfile').val();
    if ($('#cbOutsideEdgeProfile').val() == 0 || $('#cbOutsideEdgeProfile').val() == null) {
        $('#select2-cbOutsideEdgeProfile-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbOutsideEdgeProfile-container').removeClass("cbError");
    }

    if ($('#cbInsideEdgeProfile').val() == 0 || $('#cbInsideEdgeProfile').val() == null) {
        $('#select2-cbInsideEdgeProfile-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbInsideEdgeProfile-container').removeClass("cbError");
    }

    if ($('#cbVerticalDivisions').val() == 0 || $('#cbVerticalDivisions').val() == null) {
        $('#select2-cbVerticalDivisions-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbVerticalDivisions-container').removeClass("cbError");
    }

    if ($('#cbHorizontalDivisions').val() == 0 || $('#cbHorizontalDivisions').val() == null) {
        $('#select2-cbHorizontalDivisions-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbHorizontalDivisions-container').removeClass("cbError");
    }


    if ($('#cbisDrill').val() == 0 || $('#cbisDrill').val() == null) {
        $('#select2-cbisDrill-container').addClass("cbError");
        aux = false;
    } else {
        if ($('#cbisDrill').val() == 2) {
            if ($('#cbHingeDirection').val() == 0 || $('#cbHingeDirection').val() == null) {
                $('#select2-cbHingeDirection-container').addClass("cbError");
                aux = false;
            } else {
                $('#select2-cbHingeDirection-container').removeClass("cbError");
            }
        }
        $('#select2-cbisDrill-container').removeClass("cbError");
    }

    if ($('#cbFingerPull').val() == 0 || $('#cbFingerPull').val() == null) {
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

function ValidadWH() {
    var aux = true;
    if ($('#iptWidth').val() < 5 || $('#iptWidth').val() > 42) {
        $('#iptWidth').addClass("is-invalid");       
        aux = false;
    } else {
        $('#iptWidth').removeClass("is-invalid");
    }
    if ($('#iptHeight').val() < 5 || $('#iptHeight').val() > 100) {
        $('#iptHeight').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptHeight').removeClass("is-invalid");
    }
    return aux;
}

function GetAllShippingAddress() {
    $.ajax({
        url: urlGetAllShippingAddress,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allShippingAddress = data;
                var option = '<option value="0">No shipping</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                    }
                }
                $("#cbShippingAddress").empty().append(option);
            }
            else {
                LlammarModal("Danger", "Error obtaining Shipping Address", " ");
            }
        },
        //error: function (err) {
        //    LlammarModal("Danger", "Error.", " ");
        //}
    });
}

function llenarComboShipping(pShipping) {
    var option = '<option value="0">No shipping</option>';
    for (var i = 0; i < allShippingAddress.length; i++) {
        if (allShippingAddress[i].Status.Id == 1) {
            option += '<option value="' + allShippingAddress[i].Id + '">' + allShippingAddress[i].Name + '</option>';
        }
    }
    $("#cbShippingAddress").empty().append(option);
    if (pShipping != 0) {
        $("#cbShippingAddress").val(pShipping);
    }
}

function AddNewShippingAddress() {

    var datos =
        {
            ShippingData: {
                Name: $('#inName').val(),
                Contact: $('#inContact').val(),
                Residence: $('#inResidence').val(),
                Address: $('#inAddress').val(),
                City: $('#inCity').val(),
                St: $('#inStreet').val(),
                ZipCode: $('#inZipCode').val(),
                Status: { Id: 1 },                
            },          
        };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertShipping,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result != null) {
                $('#ModalAddSA').modal('hide');
                LlammarModal("ConfigM", "Congratulations, your new shipping address has been added successfully!");
                GetAllShippingAddress();
                var pShipping = result;
                llenarComboShipping(pShipping);
            } else {
                LlammarModal("Danger", "An error occurred during the process.");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}

function limpiarInputsShipping() {
    $('#inName').val(""),
    $('#inContact').val(""),
    $('#inResidence').val(""),
    $('#inAddress').val(""),
    $('#inCity').val(""),
    $('#inStreet').val(""),
    $('#inZipCode').val("")
}

function ValidarCamposModalShipping() {
    var aux = true;
    if ($('#inName').val() == "") {
        $('#inName').addClass("is-invalid");
        aux = false;
    } else {
        $('#inName').removeClass("is-invalid");
    }

    if ($('#inContact').val() == "") {
        $('#inContact').addClass("is-invalid");
        aux = false;
    } else {
        $('#inContact').removeClass("is-invalid");
    }

    if ($('#inResidence').val() == "") {
        $('#inResidence').addClass("is-invalid");
        aux = false;
    } else {
        $('#inResidence').removeClass("is-invalid");
    }

    if ($('#inAddress').val() == "") {
        $('#inAddress').addClass("is-invalid");
        aux = false;
    } else {
        $('#inAddress').removeClass("is-invalid");
    }

    if ($('#inCity').val() == "") {
        $('#inCity').addClass("is-invalid");
        aux = false;
    } else {
        $('#inCity').removeClass("is-invalid");
    }

    if ($('#inStreet').val() == "") {
        $('#inStreet').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStreet').removeClass("is-invalid");
    }

    if ($('#inZipCode').val() == "") {
        $('#inZipCode').addClass("is-invalid");
        aux = false;
    } else {
        $('#inZipCode').removeClass("is-invalid");
    }

    return aux;
}

function GetDoorxUser() {
    $.ajax({
        url: urlGetLastDoor,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.LastDoor != null) {               
                
                $('#idDoor').val(data.LastDoor.Id);
                //var HTMLImage =                       
                //   ' <center> <img style="height: 100px;width: 235px;margin-top: 20px;" id="ProfilePicture" src="' + data.LastDoor[i].ProfilePicture + '">' +
                //              '<img style="width: 230px;height: 230px;" id="DoorPicture" src="' + data.LastDoor[i].Picture + '">' +
                //              '</center>';
                //$('#Picture').html(HTMLImage);
                var fingerPull = data.LastDoor.isFingerPull;
                if (fingerPull == false) {
                    fingerPull = 1;
                } else {
                    fingerPull = 2;
                }
                llenarComboFinger(fingerPull);

                var isDrill = data.LastDoor.isDrill;
                if (isDrill == false) {
                    isDrill = 1;
                } else {
                    isDrill = 2;
                }
                llenarComboIsDrill(isDrill);
                HingeCalculate();
                HingeShow();

                var isOpen = data.LastDoor.IsOpeningMeasurement;
                if (isOpen == false) {
                    isOpen = 1;
                } else {
                    isOpen = 2;
                }
                llenarComboIsOpen(isOpen);

                var isOver = data.LastDoor.isOverlay;
                if (isOver == false) {
                    isOver = 1;
                } else {
                    isOver = 2;
                }
                checkIsOverlay(isOver);
                //llenarComboDecimales(data.LastDoor.Decimales.Id);
                llenarComboMaterial(data.LastDoor.Material.Id);
               
                
                llenarComboIEP(data.LastDoor.InsideEdgeProfile.Id);
                llenarComboOEP(data.LastDoor.OutsideEdgeProfile.Id);
                llenarComboStileWidth(data.LastDoor.BottomRail.Id);
                llenarComboRailWidth(data.LastDoor.TopRail.Id);
                llenarComboDoorAssembly(data.LastDoor.Join.Id);
                llenarComboPanelMaterial(data.LastDoor.Material.Id);
                llenarComboVerticalDivisions(data.LastDoor.VerticalDivisions.Id);
                llenarComboHorizontalDivisions(data.LastDoor.HorizontalDivisions.Id);
                llenarComboHingeDirection(data.LastDoor.HingeDirection.Id);
                if (data.LastDoor.DoorStyle.Id == 1010) {
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
                } else {
                    llenarComboDoorStyle(data.LastDoor.DoorStyle.Id);
                }
            }
            else {
                LlammarModal("Danger", "Error obtaining your general configuration", " ");
            }
        },
        //error: function (err) {
        //    LlammarModal("Danger", "Error.", " ");
        //}
    });
}
