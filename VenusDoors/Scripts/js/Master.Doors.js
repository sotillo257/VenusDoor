$(document).ready(function () {
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
    $(document).on('click', '.Remove', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Warning!", "You are about to delete an article. What would you like to do?",
        '<button onclick="DeleteDoor(id)" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateDoors").hide();
        $("#btInsertDoors").show();
        QuitarClaseErrorACombos();
        Limpiar();        
    });

    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateDoors").show();
        $("#btInsertDoors").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        QuitarClaseErrorACombos();
        Limpiar();
            for (var i = 0; i < ListDoors.length; i++) {
                if (ListDoors[i].Id == $(this).attr('value')) {

                    var HTMLImage =
                    ' <center>' +
                               '<img style="width: 230px;height: 230px;" id="DoorPicture" src="' + ListDoors[i].Picture + '">' +
                               '</center>';
                    $('#Picture').html(HTMLImage);
                    
                    $('#inId').val(ListDoors[i].Id);
                    
                    
                    llenarComboMaterial(ListDoors[i].Material.Id);
                    llenarComboTopRail(ListDoors[i].TopRail.Id);
                    llenarComboBottomRail(ListDoors[i].BottomRail.Id);
                    llenarComboDoorAssembly(ListDoors[i].Join.Id);
                    llenarComboOutsideEdgeProfile(ListDoors[i].OutsideEdgeProfile.Id);
                    llenarComboInsideEdgeProfile(ListDoors[i].InsideEdgeProfile.Id);
                    llenarComboVerticalDivisions(ListDoors[i].VerticalDivisions.Id);
                    llenarComboHorizontalDivisions(ListDoors[i].HorizontalDivisions.Id);                   
                    llenarComboPanel(ListDoors[i].Panel.Id);
                    llenarComboPanelMaterial(ListDoors[i].Material.Id);
                    if (ListDoors[i].DoorStyle.Id == 1010) {
                        llenarComboDoorStyle(ListDoors[i].DoorStyle.Id);
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
                        llenarComboDoorStyle(ListDoors[i].DoorStyle.Id);
                    }
                    llenarComboStatus(ListDoors[i].Status.Id);
                    var isOver = ListDoors[i].isOverlay;
                    if (isOver == false) {
                        isOver = 1;
                    } else {
                        isOver = 2;
                    }
                    checkIsOverlay(isOver);
                    var fingerPull = ListDoors[i].isFingerPull;
                    if (fingerPull == false) {
                        fingerPull = 1;
                    } else {
                        fingerPull = 2;
                    }
                    llenarComboFinger(fingerPull);
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
        llenarComboDoorStyle(0);       
        llenarComboMaterial(0);
        llenarComboBottomRail(0);
        llenarComboDoorAssembly(0);
        llenarComboOutsideEdgeProfile(0);
        llenarComboInsideEdgeProfile(0);
        llenarComboVerticalDivisions(0);
        llenarComboHorizontalDivisions(0);
        llenarComboPanel(0);
        llenarComboPanelMaterial(0);    
        llenarComboStatus(0);
        llenarComboTopRail(0);
        llenarComboFinger(0);
        $("input[name=radioOver]").prop("checked", false);
       
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

    function QuitarClaseErrorACombos() {
        $('#select2-cbDoorStyle-container').removeClass("cbError");
        $('#select2-cbMaterial-container').removeClass("cbError");
        $('#select2-cbRailWidth-container').removeClass("cbError");
        $('#select2-cbStileWidth-container').removeClass("cbError");
        $('#select2-cbDoorAssembly-container').removeClass("cbError");
        $('#select2-cbOutsideEdgeProfile-container').removeClass("cbError");
        $('#select2-cbInsideEdgeProfile-container').removeClass("cbError");
        $('#select2-cbVerticalDivisions-container').removeClass("cbError");
        $('#select2-cbHorizontalDivisions-container').removeClass("cbError");
        $('#select2-cbPanel-container').removeClass("cbError");
        $('#select2-cbPanelMaterial-container').removeClass("cbError");
        $('#select2-cbStatus-container').removeClass("cbError");
        $('#select2-cbFingerPull-container').removeClass("cbError");
        var HTMLImage = '<center>' +
                               '<img style="width: 230px;height: 230px;" id="DoorPicture" src="/Content/img/Doors/img11.png">' +
                               '</center>';
        $('#Picture').html(HTMLImage);
    }

function ValidarCamposVacios() {
    var aux = true;
    if ($('#cbDoorStyle').val() == 0 || $('#cbDoorStyle').val() == null) {
        $('#select2-cbDoorStyle-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorStyle-container').removeClass("cbError");
    }

    if ($('#cbMaterial').val() == 0 || $('#cbMaterial').val() == null) {
        $('#select2-cbMaterial-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbMaterial-container').removeClass("cbError");
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

    if ($('#cbDoorAssembly').val() == 0 || $('#cbDoorAssembly').val() == null) {
        $('#select2-cbDoorAssembly-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorAssembly-container').removeClass("cbError");
    }

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

    if ($('#cbPanel').val() == 0 || $('#cbPanel').val() == null) {
        $('#select2-cbPanel-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbPanel-container').removeClass("cbError");
    }

    if ($('#cbPanelMaterial').val() == 0 || $('#cbPanelMaterial').val() == null) {
        $('#select2-cbPanelMaterial-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbPanelMaterial-container').removeClass("cbError");
    }

    if ($('#cbStatus').val() == 0 || $('#cbStatus').val() == null) {
        $('#select2-cbStatus-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbStatus-container').removeClass("cbError");
    }

    if ($('#cbFingerPull').val() == 0 || $('#cbFingerPull').val() == null) {
        $('#select2-cbFingerPull-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbFingerPull-container').removeClass("cbError");
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
              isDrill: false,
              Width: 0,
              DecimalsWidth: { Id: 2},
              Height: 0,
              DecimalsHeight: { Id: 2},
              Picture: $("#DoorPicture").attr('src'),
              ProfilePicture: "Profile",
              Status: { Id: $("#cbStatus").val() },
              OpeningMeasurement: false,
              isOverlay: { Id: isOver },
              DoorOption: { Id: 1 },
              DoorType: { Id: 1 },
              isFingerPull: ($("#cbFingerPull").val() == 1) ? false : true,


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
    var isOver = ($('input[name=radioOver]:checked').attr("data-id") == 1) ? false : true;
    var datos =
    {
        uDoors: {
            Id: $("#inId").val(),
            DoorStyle: { Id: $("#cbDoorStyle").val() },
            Material: { Id: $("#cbMaterial").val() },
            TopRail: { Id: $("#cbRailWidth").val() },
            BottomRail: { Id: $("#cbStileWidth").val() },
            Preparation: { Id:1},
            Join: { Id: $("#cbDoorAssembly").val() },
            OutsideEdgeProfile: { Id: $("#cbOutsideEdgeProfile").val() },
            InsideEdgeProfile: { Id: $("#cbInsideEdgeProfile").val() },
            VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
            HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
            HingeDirection: { Id: 3 },
            HingePositions: { Id: 2 },
            Panel: { Id: $("#cbPanel").val() },
            PanelMaterial: { Id: $("#cbPanelMaterial").val() },
            isDrill: false,
            Width: 0,
            DecimalsWidth: { Id: 2 },
            Height: 0,
            DecimalsHeight: { Id: 2 },
            Picture: $("#DoorPicture").attr('src'),
            ProfilePicture: "Profile",
            Status: { Id: $("#cbStatus").val() },
            isOverlay: isOver ,
            DoorOption: { Id: 1 },
            DoorType: { Id: 1 },
            isFingerPull: ($("#cbFingerPull").val() == 1) ? false : true,
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

function DeleteDoor(id) {
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
        url: urlDeleteDoor,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations!", "The door has been successfully removed.");
                llenarTablaDoors();
            } else {
                LlammarModal("Danger", "Error: An error occurred while deleting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
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
function llenarComboInsideEdgeProfile(pIEP) {

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
function llenarComboOutsideEdgeProfile(pOEP) {

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

    var option = '<option value="0">Select</option>';
    option += '<option value="1">No</option>';
    option += '<option value="2">Yes</option>';
    $("#cbFingerPull").empty().append(option);
    if (pFinger != 0) {
        $("#cbFingerPull").val(pFinger);
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

function llenarComboFinger(pFinger) {

    var option = '';
    option += '<option value="1">No</option>';
    option += '<option value="2">Yes</option>';
    $("#cbFingerPull").empty().append(option);
    if (pFinger != 0) {
        $("#cbFingerPull").val(pFinger);
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
                    var Botones = '<center><button data-toggle="modal" data-target="#modalInsert" style="width: 25px;height: 25px; margin-left: 10px;" value="'+data[i].Id+'" class="Modificar Cursor btn btn-primary btn-icon"><i class="fa fa-edit"></i></button>'+
                                  '<button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button>' +
                                  '</center>';
                    t.row.add([
                        data[i].Id,
                        data[i].DoorStyle.Description,
                        data[i].Material.Description,
                        data[i].OutsideEdgeProfile.Description,
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

function FlatPanel(Outside, Inside) {
    var ProfileUrl = "img11.png";
    var urlFolder = "/Content/img/Profile/";
    if (Outside == 13) {
        if (Inside == 4) {
            ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel.png";
        } else if (Inside == 5) {
            ProfileUrl = "-Double_Roman_Ogee_Reba_flat_panel.png";
        } else if (Inside == 3) {
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
        } else if (Inside == 3) {
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
        } else if (Inside == 3) {
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
        } else if (Inside == 3) {
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
        } else if (Inside == 3) {
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
        } else if (Inside == 3) {
            ProfileUrl = "-Shaker_Shaker_22_flat_panel.png";
        } else if (Inside == 7) {
            ProfileUrl = "-Shaker_shaker_goove_flat_panel.png";
        }
    }
    $('#ProfilePicture').attr('src', urlFolder + ProfileUrl);
}