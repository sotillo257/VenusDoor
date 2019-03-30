﻿$(document).ready(function () {
    GetAllStatus();
    GetAllMaterial();
    GetAllInsideEdgeProfile();
    GetAllOutsideEdgeProfile();
    GetAllDoorStyle();
    GetAllBottomRail();
    GetAllTopRail();
    GetAllJoin();
    GetAllPanel();
    GetAllPanelMaterial();
    GetAllVerticalDivisions();
    GetAllHorizontalDivisions();
   
    PrintDoorOverlay();
    $("#btInsertDoors").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertDoors();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateDoors").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateDoors();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
        
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateDoors").hide();
        $("#btInsertDoors").show();
        Limpiar();
    });

    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateDoors").show();
        $("#btInsertDoors").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
            for (var i = 0; i < ListDoors.length; i++) {
                if (ListDoors[i].Id == $(this).attr('value')) {

                    var HTMLImage =
                    ' <center>' +
                               '<img style="width: 230px;height: 230px;" id="DoorPicture" src="' + ListDoors[i].Picture + '">' +
                               '</center>';
                    $('#Picture').html(HTMLImage);
                    
                    $('#inId').val(ListDoors[i].Id);
                    llenarComboDoorStyle(ListDoors[i].DoorStyle.Id);
                    llenarComboMaterial(ListDoors[i].Material.Id);
                    llenarComboTopRail(ListDoors[i].TopRail.Id);
                    llenarComboBottomRail(ListDoors[i].BottomRail.Id);
                    llenarComboDoorAssembly(ListDoors[i].Join.Id);
                    llenarComboOutsideEdgeProfile(ListDoors[i].OutsideEdgeProfile.Id);
                    llenarComboInsideEdgeProfile(ListDoors[i].InsideEdgeProfile.Id);
                    llenarComboVerticalDivisions(ListDoors[i].VerticalDivisions.Id);
                    llenarComboHorizontalDivisions(ListDoors[i].HorizontalDivisions.Id);
                    llenarComboHingeDirection(ListDoors[i].HingeDirection.Id);
                    $('#inHingePositions').val(ListDoors[i].HingePositions.Id);
                    llenarComboPanel(ListDoors[i].Panel.Id);
                    llenarComboPanelMaterial(ListDoors[i].PanelMaterial.Id);
                    $('#cbDrill').val(ListDoors[i].isDrill);
                    $('#cbWidth').val(ListDoors[i].Width);
                    $('#cbHeight').val(ListDoors[i].Height);
                    $('#cbOpeningMeasurement').val(ListDoors[i].IsOpeningMeasurement);
                    $('#inPicture').val(ListDoors[i].Picture);
                    $('#inProfilePicture').val(ListDoors[i].ProfilePicture);
                    llenarComboStatus(ListDoors[i].Status.Id);
                }
            }
    });

    $(document).on('change', '.Profile', function () {
        ChangeProfile();
    });

    $(document).on('change', '.Doors', function () {
        changeDoorPicture();
    });

    $(document).on('change', '#cbDoorStyle', function () {
        ChangeDoorStylePanel($("#cbDoorStyle").val());
    });

    $(document).on('change', '#cbMaterial', function () {
        var pMaterial = $("#cbMaterial").val()
        llenarComboPanelMaterial(pMaterial)
    });
});

function ChangeDoorStylePanel(pIdDoorStyle) {
    var bandera = true;
    llenarComboDoorAssembly($("#cbDoorAssembly").val());
    if (pIdDoorStyle == 1002) {
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

        llenarComboInsideAndOutside();
    } else if (pIdDoorStyle == 1003) {

        var panelType = $("#cbPanel").val();
        var option = '<option value="0">Select</option>';
        for (var i = 0; i < AllPanelType.length; i++) {
            if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id == 2) {
                option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
            }
        }
        $("#cbPanel").empty().append(option);
        $("#cbPanel").val(2);
        llenarComboInsideAndOutside();
    } else if (pIdDoorStyle == 1004) {
        var inside = $("#cbInsideEdgeProfile").val();
        var outside = $("#cbOutsideEdgeProfile").val();
        var option = '<option value="0">Select</option>';
        for (var i = 0; i < AllInsideEdgeProfile.length; i++) {
            if (AllInsideEdgeProfile[i].Status.Id == 1 && (AllInsideEdgeProfile[i].Id == 3 || AllInsideEdgeProfile[i].Id == 7)) {
                option += '<option value="' + AllInsideEdgeProfile[i].Id + '">' + AllInsideEdgeProfile[i].Description + '</option>';
            }
        }
        $("#cbInsideEdgeProfile").empty().append(option);
        if (inside == 3 || inside == 7) {
            $("#cbInsideEdgeProfile").val(inside);
        } else {
            $("#cbInsideEdgeProfile").val(0);
        }
        option = '<option value="0">Select</option>';
        for (var i = 0; i < AllOutsideEdgeProfile.length; i++) {
            if (AllOutsideEdgeProfile[i].Status.Id == 1 && AllOutsideEdgeProfile[i].Id == 6) {
                option += '<option value="' + AllOutsideEdgeProfile[i].Id + '">' + AllOutsideEdgeProfile[i].Description + '</option>';
                break;
            }
        }
        $("#cbOutsideEdgeProfile").empty().append(option);
        $("#cbOutsideEdgeProfile").val(6);
        llenarComboPanel();
    } else if (pIdDoorStyle == 1005) {
        llenarInsideAndOutsideEspecificos(3, 6);
        llenarComboPanel();
    }
    else if (pIdDoorStyle == 1006) {
        llenarInsideAndOutsideEspecificos(5, 5);
        llenarComboPanel();
    } else if (pIdDoorStyle == 1007) {
        llenarInsideAndOutsideEspecificos(4, 11);
        llenarComboPanel();
    } else if (pIdDoorStyle == 1008) {
        llenarComboInsideAndOutside();
        llenarComboPanel();
    } else if (pIdDoorStyle == 1009) {
        llenarComboInsideAndOutside();
        var option = '<option value="0">Select</option>';
        for (var i = 0; i < AllPanelType.length; i++) {
            if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id == 5) {
                option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
            }
        }
        $("#cbPanel").empty().append(option);
        $("#cbPanel").val(5);
    } else if ($("#cbDoorStyle").val() == 1010) {
        llenarComboInsideAndOutside();
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

}

function llenarInsideAndOutsideEspecificos(pInside, pOutside) {
    var inside = $("#cbInsideEdgeProfile").val();
    var outside = $("#cbOutsideEdgeProfile").val();
    var option = '';
    for (var i = 0; i < AllInsideEdgeProfile.length; i++) {
        if (AllInsideEdgeProfile[i].Status.Id == 1 && AllInsideEdgeProfile[i].Id == pInside) {
            option += '<option value="' + AllInsideEdgeProfile[i].Id + '">' + AllInsideEdgeProfile[i].Description + '</option>';
            break;
        }
    }
    $("#cbInsideEdgeProfile").empty().append(option);
    $("#cbInsideEdgeProfile").val(pInside);
    option = '';
    for (var i = 0; i < AllOutsideEdgeProfile.length; i++) {
        if (AllOutsideEdgeProfile[i].Status.Id == 1 && AllOutsideEdgeProfile[i].Id == pOutside) {
            option += '<option value="' + AllOutsideEdgeProfile[i].Id + '">' + AllOutsideEdgeProfile[i].Description + '</option>';
            break;
        }
    }
    $("#cbOutsideEdgeProfile").empty().append(option);
    $("#cbOutsideEdgeProfile").val(pOutside);
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

        llenarComboInsideAndOutside();
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

        llenarComboPanel();
    } else if ($("#cbDoorStyle").val() == 1005) {
        llenarComboPanel();
    }
    else if ($("#cbDoorStyle").val() == 1006) {
        llenarComboPanel();
    } else if ($("#cbDoorStyle").val() == 1007) {
        llenarComboPanel();
    } else if ($("#cbDoorStyle").val() == 1008) {
        llenarComboPanel();
    } else if ($("#cbDoorStyle").val() == 1009) {
        llenarComboInsideAndOutside();
        var option = '<option value="0">Select</option>';
        for (var i = 0; i < AllPanelType.length; i++) {
            if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id == 5) {
                option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
            }
        }
        $("#cbPanel").empty().append(option);
        $("#cbPanel").val(5);
    } else if ($("#cbDoorStyle").val() == 1010) {
        //llenarComboInsideAndOutside();
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

    function llenarComboInsideAndOutside() {

        var inside = $("#cbInsideEdgeProfile").val();
        var outside = $("#cbOutsideEdgeProfile").val();
        var option = '<option value="0">Select</option>';
        for (var i = 0; i < AllInsideEdgeProfile.length; i++) {
            if (AllInsideEdgeProfile[i].Status.Id == 1) {
                option += '<option value="' + AllInsideEdgeProfile[i].Id + '">' + AllInsideEdgeProfile[i].Description + '</option>';
            }
        }
        $("#cbInsideEdgeProfile").empty().append(option);

        if (inside != 1) {
            $("#cbInsideEdgeProfile").val(inside);
        }

        option = '<option value="0">Select</option>';
        for (var i = 0; i < AllOutsideEdgeProfile.length; i++) {
            if (AllOutsideEdgeProfile[i].Status.Id == 1) {
                option += '<option value="' + AllOutsideEdgeProfile[i].Id + '">' + AllOutsideEdgeProfile[i].Description + '</option>';
            }
        }
        $("#cbOutsideEdgeProfile").empty().append(option);
        if (outside != 1) {

            $("#cbOutsideEdgeProfile").val(outside);
        }
    }

    function Limpiar() {

        $('#inId').val(0);
        $('#cbDoorStyle').removeClass("is-invalid");
        llenarComboDoorStyle(0);

        $('#cbMaterial').removeClass("is-invalid");
        llenarComboMaterial(0);

        $('#cbStileWidth').removeClass("is-invalid");
        llenarComboBottomRail(0);

        $('#cbDoorAssembly').removeClass("is-invalid");
        llenarComboDoorAssembly(0);

        $('#cbOutsideEdgeProfile').removeClass("is-invalid");
        llenarComboOutsideEdgeProfile(0);

        $('#cbInsideEdgeProfile').removeClass("is-invalid");
        llenarComboInsideEdgeProfile(0);

        $('#cbVerticalDivisions').removeClass("is-invalid");
        llenarCombVerticalDivisions(0);

        $('#cbHorizontalDivisions').removeClass("is-invalid");
        llenarComboHorizontalDivisions(0);

        $('#cbPanel').removeClass("is-invalid");
        llenarComboPanel(0);

        $('#cbPanelMaterial').removeClass("is-invalid");
        llenarComboPanelMaterial(0);
    
        $('#cbStatus').removeClass("is-invalid");
        llenarComboStatus(0);

        $('#cbRailWidth').removeClass("is-invalid");
        llenarComboTopRail(0);

        var HTMLImage ='<center>' +
                               '<img style="width: 230px;height: 230px;" id="DoorPicture" src="/Content/img/Doors/img11.png">' +
                               '</center>';
        $('#Picture').html(HTMLImage);

    }

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

function ValidarCamposVacios() {
    var aux = true;
    if ($('#cbDoorStyle').val() == 0) {
        $('#cbDoorStyle').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDoorStyle').removeClass("is-invalid");
    }

    if ($('#cbMaterial').val() == 0) {
        $('#cbMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbMaterial').removeClass("is-invalid");
    }

    if ($('#cbRailWidth').val() == 0) {
        $('#cbRailWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbRailWidth').removeClass("is-invalid");
    }

    if ($('#cbStileWidth').val() == 0) {
        $('#cbStileWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbStileWidth').removeClass("is-invalid");
    } 

    if ($('#cbDoorAssembly').val() == 0) {
        $('#cbDoorAssembly').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDoorAssembly').removeClass("is-invalid");
    }

    if ($('#cbOutsideEdgeProfile').val() == 0) {
        $('#cbOutsideEdgeProfile').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbOutsideEdgeProfile').removeClass("is-invalid");
    }

    if ($('#cbInsideEdgeProfile').val() == 0) {
        $('#cbInsideEdgeProfile').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbInsideEdgeProfile').removeClass("is-invalid");
    }

    if ($('#cbVerticalDivisions').val() == 0) {
        $('#cbVerticalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbVerticalDivisions').removeClass("is-invalid");
    }

    if ($('#cbHorizontalDivisions').val() == 0) {
        $('#cbHorizontalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbHorizontalDivisions').removeClass("is-invalid");
    } 

    if ($('#cbPanel').val() == 0) {
        $('#cbPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbPanel').removeClass("is-invalid");
    }

    if ($('#cbPanelMaterial').val() == 0) {
        $('#cbPanelMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbPanelMaterial').removeClass("is-invalid");
    }

    if ($('#cbStatus').val() == 0) {
        $('#cbStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbStatus').removeClass("is-invalid");
    }

    if ($('#cbOpeningMeasurement').val() == 0) {
        $('#cbOpeningMeasurement').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbOpeningMeasurement').removeClass("is-invalid");
    }
   
    return aux;
}

function InsertDoors() { 
    var isOver = ($('input[name=radioOver]:checked').attr("data-id") == 1) ? false : true;
    var datos =
      {
          pDoors: {

              DoorStyle: { Id: $("#cbDoorStyle").val() },
              Material: { Id: $("#cbMaterial").val() },
              TopRail: { Id: $("#cbRailWidth").val() },
              BottomRail: { Id: $("#cbStileWidth").val() },
              Preparation: { Id: 1},
              Join: { Id: $("#cbDoorAssembly").val() },
              OutsideEdgeProfile: { Id: $("#cbOutsideEdgeProfile").val() },
              InsideEdgeProfile: { Id: $("#cbInsideEdgeProfile").val() },
              VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
              HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
              HingeDirection: { Id: 3 },
              HingePositions: { Id: 2 },
              Panel: { Id: $("#cbPanel").val() },
              PanelMaterial: { Id: $("#cbPanelMaterial").val() },
              Drill: { Id: false },
              Width: 0,
              DecimalsWidth: { Id: 2},
              Height: 0,
              DecimalsHeight: { Id: 2},
              Picture: "",
              ProfilePicture: "",
              Status: { Id: $("#cbStatus").val() },
              OpeningMeasurement: { Id: false},
              isOverlay: { Id: isOver },
              DoorOption: { Id: 1 }

          }
      };    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoors,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                llenarTablaDoors();
            } else {
                LlammarModal("Danger", "Error", "An internal error occurred when inserting the door.");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error", "Check your internet connection and try again.");
        },

    });
}
function UpdateDoors() {

    var datos =
    {
        uDoors: {
            Id: $("#inId").val(),
            DoorStyle: { Id: $("#cbDoorStyle").val() },
            Material: { Id: $("#cbMaterial").val() },
            TopRail: { Id: $("#cbRailWidth").val() },
            BottomRail: { Id: $("#cbStileWidth").val() },
            Preparation: { Id: $("#inPreparation").val() },
            Join: { Id: $("#cbDoorAssembly").val() },
            OutsideEdgeProfile: { Id: $("#cbOutsideEdgeProfile").val() },
            InsideEdgeProfile: { Id: $("#cbInsideEdgeProfile").val() },
            VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
            HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
            HingeDirection: { Id: 3 },
            HingePositions: { Id: 2 },
            Panel: { Id: $("#cbPanel").val() },
            PanelMaterial: { Id: $("#cbPanelMaterial").val() },
            Drill: { Id: false},
            Width: $("#cbWidth").val(),
            Height: $("#cbHeight").val(),
            Picture: $("#inPicture").val(),
            ProfilePicture: $("#inProfilePicture").val(),
            Status: { Id: $("#cbStatus").val() },
            OpeningMeasurement: { Id: $("#cbOpeningMeasurement").val() },
        }
    };
    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoors,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaDoors();
            } else {
                LlammarModal("Danger", "Error", "An internal error occurred when modifying the door.");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error", "Check your internet connection and try again.");
        },

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
                allEstatus = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Group.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }
                }
                $("#cbStatus").empty().append(option);

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
                allMaterial = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbMaterial").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Material", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
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
                allDoorStyle = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbDoorStyle").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Door Style", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

var AllInsideEdgeProfile = "";

function GetAllInsideEdgeProfile() {
    $.ajax({
        url: urlGetAllInsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllInsideEdgeProfile = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbInsideEdgeProfile").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Inside Edge Profile", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

var AllOutsideEdgeProfile = "";

function GetAllOutsideEdgeProfile() {
    $.ajax({
        url: urlGetAllOutsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllOutsideEdgeProfile = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbOutsideEdgeProfile").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Outside Edge Profile", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function GetAllBottomRail() {
    $.ajax({
        url: urlGetAllBottomRail,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllStileWidth = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbStileWidth").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Bottom Rail", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function GetAllTopRail() {
    $.ajax({
        url: urlGetAllTopRail,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllRailWidth = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbRailWidth").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Top Rail", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function GetAllJoin() {
    $.ajax({
        url: urlGetAllJoin,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllDoorAssembly = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }
                }
                $("#cbDoorAssembly").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

var AllPanelType = "";

function GetAllPanel() {
    $.ajax({
        url: urlGetAllPanel,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllPanelType = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbPanel").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Panel", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

var AllPanelMaterial = '';

function GetAllPanelMaterial() {
    $.ajax({
        url: urlGetAllPanelMaterial,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllPanelMaterial = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbPanelMaterial").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Panel Material", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function GetAllVerticalDivisions() {
    $.ajax({
        url: urlGetAllVerticalDivisions,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllVerticalDivisions = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';
                    }
                }
                $("#cbVerticalDivisions").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Vertical Divisions", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function GetAllHorizontalDivisions() {
    $.ajax({
        url: urlGetAllHorizontalDivisions,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllHorizontalDivisions = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';
                    }

                }
                $("#cbHorizontalDivisions").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Horizontal Divisions", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function GetAllDoorType() {
    $.ajax({
        url: urlGetAllDoorType,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allDoorType = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbDoorType").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining DoorType", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function PrintDoorOverlay(pOverlay) {
    var lbl = '<label><input style="margin-right: 8px;" type="radio" name="radioOver" data-id="1">Inset Door Type</label>';
    lbl += '<label style="margin-left: 10px;"><input style="margin-right: 8px;" type="radio" name="radioOver" data-id="2">Overlay Door Type</label>';
    $("#isOverlay").html(lbl);
}

var allEstatus = '';
function llenarComboStatus(pStatus) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allEstatus.length; i++) {
        if (allEstatus[i].Group.Id == 1) {
            option += '<option value="' + allEstatus[i].Id + '">' + allEstatus[i].Description + '</option>';
        }
    }
    $("#cbStatus").empty().append(option);
    if (pStatus != 0) {
        $("#cbStatus").val(pStatus);
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
function llenarComboInsideEdgeProfileP(pIEP) {

    var option = '<option value="0" id="">Select</option>';
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
function llenarComboOutsideEdgeProfileP(pOEP) {

    var option = '<option value="0" id="">Select</option>';
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
function llenarComboBottomRail(pStileWidth) {

    var option = '<option value="0" id="">Select</option>';
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
function llenarComboTopRail(pRailWidth) {

    var option = '<option value="0" id="">Select</option>';
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

    var option = '<option value="0" id="">Select</option>';
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
function llenarComboPanel(pPanelStyle) {

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

function llenarComboFinger(pFinger) {

    var option = '';
    option += '<option value="1">No</option>';
    option += '<option value="2">Yes</option>';
    $("#cbFingerPull").empty().append(option);
    if (pFinger != 0) {
        $("#cbFingerPull").val(pFinger);
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


function llenarTablaDoors() {
    $.ajax({
        url: urlGetAllDoors,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                ListDoors = data;

                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);
                $("#modalInsert").modal("hide");
                
                for (var i = 0; i < data.length; i++) {
                    var Botones = '<a href="#" data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" class="Modificar Cursor btn btn-primary btn-icon"><div><i class="fa fa-edit"></i></div></a>';
                    t.row.add([
                        data[i].Id,
                        data[i].DoorStyle.Description,
                        data[i].Material.Description,
                        data[i].OutsideEdgeProfile.Descriptionn,
                        data[i].InsideEdgeProfile.Description,
                        data[i].Panel.Description,
                        data[i].Status.Description,
                        Botones
                    ]).draw(false);
                }                 
            }
            else {
                LlammarModal("Danger", "Error", "An internal error occurred when filling the table.");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred filling the table.", "Check your internet connection and try again.");
        }
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

function FlatPanelDoor(Style) {
    var stile = $('#cbRailWidth').val();
    var rail = $('#cbStileWidth').val();
    var DoorUrl = "Cabinet Vector-02.png";
    var urlFolder = "/Content/img/Doors/";




    if ($('#cbDoorAssembly').val() == 2) {
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
    var stile = $('#cbRailWidth').val();
    var rail = $('#cbStileWidth').val();
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


    if ($('#cbDoorAssembly').val() == 2) {
        if (Style == 1009) {

        } else if (Style == 1008) {

        } else {
            DoorUrl = "Cabinet Vector-07.png";
        }

    }
    $('#DoorPicture').attr('src', urlFolder + DoorUrl);
}