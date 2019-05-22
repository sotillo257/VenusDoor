$(document).ready(function () {
    GetAllCustomerNames();
    GetAllSalesPerson();
    llenarComboMaterial(0);
    llenarComboIEP(0);
    llenarComboOEP(0);
    llenarComboDoorStyle(0);
    llenarComboRailWidth(0);
    llenarComboStileWidth(0);
    llenarComboDoorAssembly(0);
    llenarComboPanelStyle(0);
    llenarComboPanelMaterial(0, $("#cbDoorStyle").val());
    llenarComboVerticalDivisions(0);
    llenarComboHorizontalDivisions(0);
    llenarComboHingeDirection(0);
    llenarComboDoorType(0);
    llenarComboDoorOption(0);
    llenarComboDecimalW(0);
    llenarComboDecimalH(0);
    PrintDoorOverlay($("#cbDoorStyle").val()); 
    ChangeDoorStylePanel($("#cbDoorStyle").val());

    $(document).on('click', '#btnSAVE', function (event) {
        LlammarModal("ConfirmOrdenSummary", "Confirm", "Do you want to save this configuration?",
        '<button onclick="AgregarD();" class="Cursor btn btn-success tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Save</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });

    $(document).on('click', '#btConfSave', function (event) {
        LlammarModal("ConfirmOrdenSummary", "Do you want to save your new changes?", "The doors added to your order will suffer some changes. Do you want to proceed with this operation?.<br>(This could take a little time).",
        '<button onclick="NuevosCambiosDXU();" id="btnSaveChanges" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Confirm</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });

    $(document).on('click', '#btSaveChan', function (event) {
        AgregarDXO();
    });

    $(document).on('change', '#cbMaterial', function () {
        var pMaterial = $("#cbMaterial").val();
        var pDoorStyle = $("#cbPanel").val();
        llenarComboPanelMaterial(pMaterial, pDoorStyle);
    });

    $(document).on('change', '#cbPanel', function () {
        var pMaterial = $("#cbMaterial").val();
        var pDoorStyle = $("#cbPanel").val();
        changeDoorPicture();
        ChangeProfile();
        llenarComboPanelMaterial(pMaterial, pDoorStyle);

    });

    $(document).on('change', '.Profile', function () {
        ChangeProfile();
    });

    $(document).on('change', '.Doors', function () {
        changeDoorPicture();
    });

    $(document).on('change', '#cbDoorStyle', function () {
        ChangeDoorStylePanel($("#cbDoorStyle").val());
        GetInsideAndOutside($("#cbDoorStyle").val());
    });
});

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

function AgregarDXO() {
    if (ValidarCamposFront()) {
        InsertDoorsxOrder();
    } else {        
        LlammarModal("Danger", "You must fill all the fields.", " ");
    }
}

function ValidarCamposVacios() {
    var aux = true;

    if ($('#cbMaterial').val() == 0 || $('#cbMaterial').val() == null) {
        $('#select2-cbMaterial-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbMaterial-container').removeClass("cbError");
    }

    if ($('#cbDoorStyle').val() == 0 || $('#cbDoorStyle').val() == null) {
        $('#select2-cbDoorStyle-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorStyle-container').removeClass("cbError");
    }

    if ($('#cbRailWidth').val() == 0 || $('#cbRailWidth').val() == null) {
        $('#select2-cbRailWidth-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbRailWidth-container').removeClass("cbError");
    }

    if ($('#cbStileWidth').val() == 0 || $('#cbStileWidth').val() == null) {
        $('#select2-cbStileWidth-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbStileWidth-container').removeClass("cbError");
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
        $('#select2-cbisDrill-container').removeClass("cbError");
    }

    if ($('#cbPanel').val() == 0 || $('#cbPanel').val() == null) {
        // $('#cbPanel').addClass("cbError");

        $('#select2-cbPanel-container').addClass("cbError");
        aux = false;
    } else {
        // $('#cbPanel').addClass("cbError");
        $('#select2-cbPanel-container').removeClass("cbError");
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

function ValidarCamposFront() {
    var aux = true;

    if ($('#cbDecimalsW').val() == 0 || $('#cbDecimalsW').val() == null) {
        $('#cbDecimalsW').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDecimalsW').removeClass("is-invalid");
    }
    if ($('#cbDecimalsH').val() == 0 || $('#cbDecimalsH').val() == null) {
        $('#cbDecimalsH').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDecimalsH').removeClass("is-invalid");
    }

    if ($('#iptWidth').val() == "" || $('#iptWidth').val() == null) {
        $('#iptWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptWidth').removeClass("is-invalid");
    }

    if ($('#iptHeight').val() == "" || $('#iptHeight').val() == null) {
        $('#iptHeight').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptHeight').removeClass("is-invalid");
    }

    if ($('#CantidadFila').val() == "" || $('#CantidadFila').val() == null) {
        $('#CantidadFila').addClass("is-invalid");
        aux = false;
    } else {
        $('#CantidadFila').removeClass("is-invalid");
    }

    var drillingV = ($("#idDrill").val() == 1) ? false : true;
    if (drillingV == true) {
        if ($('#cbHingeDirection').val() == 0 || $('#cbHingeDirection').val() == null) {
            $('#select2-cbHingeDirection-container').addClass("cbError");
            aux = false;
        } else {
            $('#select2-cbHingeDirection-container').removeClass("cbError");
        }
    }

    if ($('#cbDoorType').val() == 0 || $('#cbDoorType').val() == null) {
        $('#select2-cbDoorType-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorType-container').removeClass("cbError");
    }
    if ($('#cbDoorOpt').val() == 0 || $('#cbDoorOpt').val() == null) {
        $('#select2-cbDoorOpt-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorOpt-container').removeClass("cbError");
    }
    return aux;
}

var _PanelMAterial = 0;
function GetAllCustomerNames() {
    $.ajax({
        url: urlGetAllUser,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allCustomerName = data;
                Costumer();
            }
            else {
                LlammarModal("Danger", "Error obtaining customer", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}

function GetAllSalesPerson() {
    $.ajax({
        url: urlGetAllUser,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allSalesPerson = data;
                Sales();
            }
            else {
                LlammarModal("Danger", "Error obtaining sales person", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}

function Sales() {
    var option = '<option value="0">Choose one (with searchbox)</option>';
    for (var i = 0; i < allSalesPerson.length; i++) {
        if (allSalesPerson[i].Type.Id == 1 || allSalesPerson[i].Type.Id == 2) {
            option += '<option value="' + allSalesPerson[i].Id + '">' + allSalesPerson[i].Person.Name + ' ' + allSalesPerson[i].Person.Lastname + '</option>';
        }
    }
    $("#cbSalesPerson").empty().append(option);
}

function Costumer() {
    var option = '<option value="0">Choose one (with searchbox)</option>';
    for (var i = 0; i < allCustomerName.length; i++) {
        if (allCustomerName[i].Type.Id == 3) {
            option += '<option value="' + allCustomerName[i].Id + '">' + allCustomerName[i].Person.Name + ' ' + allCustomerName[i].Person.Lastname + '</option>';
        }
    }
    $("#cbCustomerName").empty().append(option);
}

function ResetInvoice() {
    $("#idDoor").val("");
    $("#idOrder").val("");
    Sales();
    Costumer();
    $("#datepickerNoOfMonths").val("");
    $("#Terms").val(0);
    $("#duedate").val("");
    $("#CustomerNotes").val("");
    $("#TermsAndCond").val("");
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
    var pPanelStyle = $("#cbPanel").val();
    llenarComboPanelMaterial(pMaterial, pPanelStyle);
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

    switch (parseInt(Style))
    {
        case 1002:
            if ($('#cbDoorAssembly').val() != 2)
            {
                if (stile == 3 && rail == 3)
                {
                    DoorUrl = "Cabinet Vector-02.png";
                }
                else if (stile == 1 && rail == 1)
                {
                    DoorUrl = "Cabinet Vector-14.png";
                }
            }
            else
            {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1004:
            if ($('#cbDoorAssembly').val() != 2)
            {
                if (stile == 3 || rail == 3)
                {
                    DoorUrl = "Cabinet Vector-05.png";
                }
                else if (stile == 1 && rail == 1)
                {
                    DoorUrl = "Cabinet Vector-06.png";
                }
            }
            else
            {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1005:
            if ($('#cbDoorAssembly').val() == 1)
            {
                DoorUrl = "Cabinet Vector-03.png";
            }
            else
            {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1006:
            if ($('#cbDoorAssembly').val() == 1)
            {
                DoorUrl = "Cabinet Vector-03.png";
            }
            else
            {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1007:
            if ($('#cbDoorAssembly').val() == 1)
            {
                DoorUrl = "Cabinet Vector-03.png";
            }
            else
            {
                DoorUrl = "Cabinet Vector-08.png";
            }
            break;
        case 1008:
            if ($('#cbDoorAssembly').val() == 1)
            {
                DoorUrl = "Cabinet Vector-01.png";
            }
            else
            {
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

function InsertDoorsxUser() {
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

    var datos =
      {          
          Ord: {
              Id: IdOrderTEMP,
              Descuento: $("#descDXU").val(),
              DoorxUser: {
                  Id: IdDxuTEMP,
                  User: { Id: $("#cbCustomerName").val() },
                  Status: { Id: 1 },
                  Material: { Id: $("#cbMaterial").val() },
                  DoorStyle: { Id: $("#cbDoorStyle").val() },
                  TopRail: { Id: $("#cbRailWidth").val() },
                  BottomRail: { Id: $("#cbStileWidth").val() },
                  Preparation: { Id: 1 },
                  Panel: { Id: $("#cbPanel").val() },
                  PanelMaterial: { Id: $("#cbPanelMaterial").val() },
                  IsOpeningMeasurement: ($("#cbIsOpeningMeasurement").val() == 1) ? false : true,
                  Join: { Id: $("#cbDoorAssembly").val() },
                  OutsideEdgeProfile: { Id: $("#cbOutsideEdgeProfile").val() },
                  InsideEdgeProfile: { Id: $("#cbInsideEdgeProfile").val() },
                  VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
                  HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
                  Width: parseFloat($("#iptWidth").val()),
                  DecimalsWidth: { Id: $("#cbDecimalsW").val() },
                  Height: parseFloat($("#iptHeight").val()),
                  DecimalsHeight: { Id: $("#cbDecimalsH").val() },
                  isDrill: drillingV,
                  Quantity: DoorQuantity,
                  ItemCost: itemCost,
                  SubTotal: DoorSubTotal,
                  Picture: $('#DoorPicture').attr('src'),
                  ProfilePicture: $('#ProfilePicture').attr('src'),
                  DoorType: { Id: $("#cbDoorType").val() },
                  isOverlay: isOver,
                  isFingerPull: ($("#cbFingerPull").val() == 1) ? false : true,
              }
          }
      };
    _DxuConfiguration = datos;
    $.ajax({
        data: JSON.stringify(datos),
        url: urlInsertDoorsxUser,
        cache: false,
        type: 'POST',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result.Sucess = true) {               
                $('#modalConfirmOrderSummary').modal('hide');               
                IdDxuTEMP = result.Dxu;
                IdOrderTEMP = result.ordd;
                GetInvoiceTemp(IdOrderTEMP);
                DetailOrder();                
            } else {
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Danger", "Error", "An internal error occurred when inserting the door.");
            }
        },
        error: function (err) {
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "Error", "Check your internet connection and try again.");
        },

    });
}

function InsertDoorsxOrder() {    
    var DoorQuantity = $("#CantidadFila").val();
    var DoorOp = $("#cbDoorOpt").val();
    var HingeDirection = $("#cbHingeDirection").val();
    var HingePositions = "";
    var drillingV = ($("#idDrill").val() == 1) ? false : true;
    if (drillingV == true) {
        HingeDirection = $("#cbHingeDirection").val();
        HingePositions = 2;
    } else {
        HingeDirection = 3;
        HingePositions = 2;
    }

    var datos =
         {

             pDoorsxOrder: {
                 DoorsxUser: { Id: IdDxuTEMP},
                 Width: parseFloat($("#iptWidth").val()),
                 DecimalsWidth: { Id: $("#cbDecimalsW").val() },
                 Height: parseFloat($("#iptHeight").val()),
                 DecimalsHeight: { Id: $("#cbDecimalsH").val() },
                 Quantity: DoorQuantity,
                 ItemCost: 0,
                 SubTotal: 0,
                 Picture: '',
                 ProfilePicture: '',
                 DoorType: { Id: $("#cbDoorType").val() },
                 DoorOption: { Id: DoorOp },
                 User: { Id: $("#cbCustomerName").val() },
                 Status: { Id: 1 },
                 HingeDirection: { Id: HingeDirection },
                 HingePositions: { Id: HingePositions },
             }
         };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorsxOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {                           
                GetDXOTEMP(IdDxuTEMP);
                $("#btnCancelar").trigger("click");
            } else {              
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Danger", "Error in the process.", "An error occurred when creating the door.");
            }
        },
        error: function (err) {            
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}

