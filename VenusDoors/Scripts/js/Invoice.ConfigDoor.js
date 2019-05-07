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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Type.Id == 3) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Person.Name + '</option>';
                    }
                }
                $("#cbCustomerName").empty().append(option);
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Type.Id == 1 || data[i].Type.Id == 2) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Person.Name + '</option>';
                    }
                }
                $("#cbSalesPerson").empty().append(option);
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