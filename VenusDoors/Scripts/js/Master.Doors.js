$(document).ready(function () {
    GetAllDoorStyle();
    GetAllMaterial();
    GetAllTopRail();
    GetAllBottomRail();
    GetAllPreparation();
    GetAllJoin();
    GetAllOutsideEdgeProfile();
    GetAllInsideEdgeProfile();
    GetAllVerticalDivisions();
    GetAllHorizontalDivisions();
    GetAllPanel();
    GetAllPanelMaterial();
    GetAllStatus();
    GetAllHingeDirection();
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
                   
                    var aux = ListDoors[i].Id;
                    var aux1 = ListDoors[i].DoorStyle.Id;
                    var aux2 = ListDoors[i].Material.Id;
                    var aux3 = ListDoors[i].TopRail.Id;
                    var aux4 = ListDoors[i].BottomRail.Id;
                    var aux5 = ListDoors[i].Preparation.Id;
                    var aux6 = ListDoors[i].Join.Id;
                    var aux7 = ListDoors[i].OutsideEdgeProfile.Id;
                    var aux8 = ListDoors[i].InsideEdgeProfile.Id;
                    var aux9 = ListDoors[i].VerticalDivisions.Id;
                    var aux10 = ListDoors[i].HorizontalDivisions.Id;
                    var aux11 = ListDoors[i].HingeDirection.Id;
                    var aux12 = ListDoors[i].HingePositions.Id;
                    var aux13 = ListDoors[i].Panel.Id;
                    var aux14 = ListDoors[i].PanelMaterial.Id;
                    var aux15 = ListDoors[i].isDrill.Id;
                    var aux16 = ListDoors[i].Width.Id;
                    var aux17 = ListDoors[i].Height.Id;
                    var aux18 = ListDoors[i].IsOpeningMeasurement.Id;
                    var aux19 = ListDoors[i].Picture.Id;
                    var aux20 = ListDoors[i].ProfilePicture.Id;
                    var aux21 = ListDoors[i].Status.Id;
                    $('#inId').val(ListDoors[i].Id);
                    llenarComboDoorStyle(ListDoors[i].DoorStyle.Id);
                    llenarCombolMaterial(ListDoors[i].Material.Id);
                    llenarComboTopRail(ListDoors[i].TopRail.Id);
                    llenarComboBottomRail(ListDoors[i].BottomRail.Id);
                    llenarComboPreparation(ListDoors[i].Preparation.Id);
                    llenarComboJoin(ListDoors[i].Join.Id);
                    llenarCombOutsideEdgeProfile(ListDoors[i].OutsideEdgeProfile.Id);
                    llenarCombInsideEdgeProfile(ListDoors[i].InsideEdgeProfile.Id);
                    llenarCombVerticalDivisions(ListDoors[i].VerticalDivisions.Id);
                    llenarCombHorizontalDivisions(ListDoors[i].HorizontalDivisions.Id);
                    llenarComboHingeDirection(ListDoors[i].HingeDirection.Id);
                    $('#inHingePositions').val(ListDoors[i].HingePositions.Id);
                    llenarCombPanel(ListDoors[i].Panel.Id);
                    llenarCombPanelMaterial(ListDoors[i].PanelMaterial.Id);
                    $('#inDrill').val(ListDoors[i].isDrill);
                    $('#inWidth').val(ListDoors[i].Width);
                    $('#inHeight').val(ListDoors[i].Height);
                    $('#inOpeningMeasurement').val(ListDoors[i].IsOpeningMeasurement);
                    $('#inPicture').val(ListDoors[i].Picture);
                    $('#inProfilePicture').val(ListDoors[i].ProfilePicture);
                    llenarComboEstatus(ListDoors[i].Status.Id);
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

    function Limpiar() {

        $('#inId').val(0);
        $('#inDoorStyle').removeClass("is-invalid");
        llenarComboDoorStyle(0);

        $('#inMaterial').removeClass("is-invalid");
        llenarCombolMaterial(0);

        $('#inBottomRail').removeClass("is-invalid");
        llenarComboBottomRail(0);

        $('#inPreparation').removeClass("is-invalid");
        llenarComboPreparation(0);

        $('#inJoin').removeClass("is-invalid");
        llenarComboJoin(0);

        $('#inOutsideEdgeProfile').removeClass("is-invalid");
        llenarCombOutsideEdgeProfile(0);

        $('#inInsideEdgeProfile').removeClass("is-invalid");
        llenarCombInsideEdgeProfile(0);

        $('#inVerticalDivisions').removeClass("is-invalid");
        llenarCombVerticalDivisions(0);

        $('#inHingeDirection').removeClass("is-invalid");
        llenarComboHingeDirection(0);

        $('#inHorizontalDivisions').removeClass("is-invalid");
        llenarCombHorizontalDivisions(0);

        $('#inPanel').removeClass("is-invalid");
        llenarCombPanel(0);

        $('#inPanelMaterial').removeClass("is-invalid");
        llenarCombPanelMaterial(0);

        $('#inDrill').removeClass("is-invalid");
        $('#inDrill').val(0);

        $('#inWidth').removeClass("is-invalid");
        $('#inWidth').val("");

        $('#inHeight').removeClass("is-invalid");
        $('#inHeight').val("");

        $('#inStatus').removeClass("is-invalid");
        llenarComboEstatus(0);

        $('#inTopRail').removeClass("is-invalid");
        llenarComboTopRail(0);

    }

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inDoorStyle').val() == 0) {
        $('#inDoorStyle').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDoorStyle').removeClass("is-invalid");
    }

    if ($('#inMaterial').val() == 0) {
        $('#inMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#inMaterial').removeClass("is-invalid");
    }

    if ($('#inTopRail').val() == 0) {
        $('#inTopRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTopRail').removeClass("is-invalid");
    }

    if ($('#inBottomRail').val() == 0) {
        $('#inBottomRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inBottomRail').removeClass("is-invalid");
    }

    if ($('#inPreparation').val() == 0) {
        $('#inPreparation').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPreparation').removeClass("is-invalid");
    }

    if ($('#inJoin').val() == 0) {
        $('#inJoin').addClass("is-invalid");
        aux = false;
    } else {
        $('#inJoin').removeClass("is-invalid");
    }

    if ($('#inOutsideEdgeProfile').val() == 0) {
        $('#inOutsideEdgeProfile').addClass("is-invalid");
        aux = false;
    } else {
        $('#inOutsideEdgeProfile').removeClass("is-invalid");
    }

    if ($('#inInsideEdgeProfile').val() == 0) {
        $('#inInsideEdgeProfile').addClass("is-invalid");
        aux = false;
    } else {
        $('#inInsideEdgeProfile').removeClass("is-invalid");
    }

    if ($('#inVerticalDivisions').val() == 0) {
        $('#inVerticalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#inVerticalDivisions').removeClass("is-invalid");
    }

    if ($('#inHorizontalDivisions').val() == 0) {
        $('#inHorizontalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHorizontalDivisions').removeClass("is-invalid");
    }

    if ($('#inHingeDirection').val() == 0) {
        $('#inHingeDirection').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHingeDirection').removeClass("is-invalid");
    }

    if ($('#inPanel').val() == 0) {
        $('#inPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPanel').removeClass("is-invalid");
    }

    if ($('#inPanelMaterial').val() == 0) {
        $('#inPanelMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPanelMaterial').removeClass("is-invalid");
    }

    if ($('#inDrill').val() == 0) {
        $('#inDrill').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDrill').removeClass("is-invalid");
    }

    if ($('#inWidth').val() == "") {
        $('#inWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#inWidth').removeClass("is-invalid");
    }

    if ($('#inHeight').val() == "") {
        $('#inHeight').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHeight').removeClass("is-invalid");
    }

    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    if ($('#inOpeningMeasurement').val() == 0) {
        $('#inOpeningMeasurement').addClass("is-invalid");
        aux = false;
    } else {
        $('#inOpeningMeasurement').removeClass("is-invalid");
    }
   
    return aux;
}

function InsertDoors() {

    //var Door = new Array();
    //var formData = new FormData();
    //if ($("#inPicture")[0].files.length > 0) {
    //    //alert($("#File1")[0].files[0].name);
    //    formData.append('Files', $("#inPicture")[0].files[0], "lp");
    //}
    var datos =
      {
          pDoors: {

              DoorStyle: { Id: $("#inDoorStyle").val() },
              Material: { Id: $("#inMaterial").val() },
              TopRail: { Id: $("#inTopRail").val() },
              BottomRail: { Id: $("#inBottomRail").val() },
              Preparation: { Id: $("#inPreparation").val() },
              Join: { Id: $("#inJoin").val() },
              OutsideEdgeProfile: { Id: $("#inOutsideEdgeProfile").val() },
              InsideEdgeProfile: { Id: $("#inInsideEdgeProfile").val() },
              VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
              HorizontalDivisions: { Id: $("#inHorizontalDivisions").val() },
              HingeDirection: { Id: 3 },
              HingePositions: { Id: 2 },
              Panel: { Id: $("#inPanel").val() },
              PanelMaterial: { Id: $("#inPanelMaterial").val() },
              Drill: { Id: false },
              Width: $("#inWidth").val(),
              Height: $("#inHeight").val(),
              Picture: $("#inPicture").val(),
              ProfilePicture: $("#inProfilePicture").val(),
              Status: { Id: $("#inStatus").val() },
              OpeningMeasurement: { Id: false},

          }
      };
    //formData.append('pDoors', pDoors);



    //compania.push(formData);

    console.log(datos);
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
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateDoors() {

    var datos =
    {
        uDoors: {
            Id: $("#inId").val(),
            DoorStyle: { Id: $("#inDoorStyle").val() },
            Material: { Id: $("#inMaterial").val() },
            TopRail: { Id: $("#inTopRail").val() },
            BottomRail: { Id: $("#inBottomRail").val() },
            Preparation: { Id: $("#inPreparation").val() },
            Join: { Id: $("#inJoin").val() },
            OutsideEdgeProfile: { Id: $("#inOutsideEdgeProfile").val() },
            InsideEdgeProfile: { Id: $("#inInsideEdgeProfile").val() },
            VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
            HorizontalDivisions: { Id: $("#inHorizontalDivisions").val() },
            HingeDirection: { Id: 3 },
            HingePositions: { Id: 2 },
            Panel: { Id: $("#inPanel").val() },
            PanelMaterial: { Id: $("#inPanelMaterial").val() },
            Drill: { Id: false},
            Width: $("#inWidth").val(),
            Height: $("#inHeight").val(),
            Picture: $("#inPicture").val(),
            ProfilePicture: $("#inProfilePicture").val(),
            Status: { Id: $("#inStatus").val() },
            OpeningMeasurement: { Id: $("#inOpeningMeasurement").val() },
        }
    };
    console.log(datos);
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
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

var allDoorStyle = '';
function llenarComboDoorStyle(pDoorStyle) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allDoorStyle.length; i++) {
        if (allDoorStyle[i].Status.Id == 1) {
            option += '<option value="' + allDoorStyle[i].Id + '">' + allDoorStyle[i].Description + '</option>';
        }


    }
    $("#inDoorStyle").empty().append(option);
    if (pDoorStyle != 0) {
        $("#inDoorStyle").val(pDoorStyle);
    }
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

var allTopRail = '';
function llenarComboTopRail(pTopRail) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allTopRail.length; i++) {
        if (allTopRail[i].Status.Id == 1) {
            option += '<option value="' + allTopRail[i].Id + '">' + allTopRail[i].Description + '</option>';
        }


    }
    $("#inTopRail").empty().append(option);
    if (pTopRail != 0) {
        $("#inTopRail").val(pTopRail);
    }
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
                allTopRail = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inTopRail").empty().append(option);

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

var allBottomRail = '';
function llenarComboBottomRail(pBottomRail) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allBottomRail.length; i++) {
        if (allBottomRail[i].Status.Id == 1) {
            option += '<option value="' + allBottomRail[i].Id + '">' + allBottomRail[i].Description + '</option>';
        }


    }
    $("#inBottomRail").empty().append(option);
    if (pBottomRail != 0) {
        $("#inBottomRail").val(pBottomRail);
    }
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
                allBottomRail = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inBottomRail").empty().append(option);

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

var allPreparation = '';
function llenarComboPreparation(pPreparation) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allPreparation.length; i++) {
        if (allPreparation[i].Status.Id == 1) {
            option += '<option value="' + allPreparation[i].Id + '">' + allPreparation[i].Description + '</option>';
        }


    }
    $("#inPreparation").empty().append(option);
    if (pPreparation != 0) {
        $("#inPreparation").val(pPreparation);
    }
}
function GetAllPreparation() {
    $.ajax({
        url: urlGetAllPreparation,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allPreparation = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inPreparation").empty().append(option);

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

var allJoin = '';
function llenarComboJoin(pJoin) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allJoin.length; i++) {
        if (allJoin[i].Status.Id == 1) {
            option += '<option value="' + allJoin[i].Id + '">' + allJoin[i].Description + '</option>';
        }


    }
    $("#inJoin").empty().append(option);
    if (pJoin != 0) {
        $("#inJoin").val(pJoin);
    }
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
                allJoin = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inJoin").empty().append(option);

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

var allOutsideEdgeProfile = '';
function llenarCombOutsideEdgeProfile(pOutsideEdgeProfile) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allOutsideEdgeProfile.length; i++) {
        if (allOutsideEdgeProfile[i].Status.Id == 1) {
            option += '<option value="' + allOutsideEdgeProfile[i].Id + '">' + allOutsideEdgeProfile[i].Description + '</option>';
        }


    }
    $("#inOutsideEdgeProfile").empty().append(option);
    if (pOutsideEdgeProfile != 0) {
        $("#inOutsideEdgeProfile").val(pOutsideEdgeProfile);
    }
}
function GetAllOutsideEdgeProfile() {
    $.ajax({
        url: urlGetAllOutsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allOutsideEdgeProfile = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inOutsideEdgeProfile").empty().append(option);

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

var allInsideEdgeProfile = '';
function llenarCombInsideEdgeProfile(pInsideEdgeProfile) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allInsideEdgeProfile.length; i++) {
        if (allInsideEdgeProfile[i].Status.Id == 1) {
            option += '<option value="' + allInsideEdgeProfile[i].Id + '">' + allInsideEdgeProfile[i].Description + '</option>';
        }


    }
    $("#inInsideEdgeProfile").empty().append(option);
    if (pInsideEdgeProfile != 0) {
        $("#inInsideEdgeProfile").val(pInsideEdgeProfile);
    }
}
function GetAllInsideEdgeProfile() {
    $.ajax({
        url: urlGetAllInsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allInsideEdgeProfile = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inInsideEdgeProfile").empty().append(option);

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

var allVerticalDivisions = '';
function llenarCombVerticalDivisions(pVerticalDivisions) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allVerticalDivisions.length; i++) {
        if (allVerticalDivisions[i].Status.Id == 1) {
            option += '<option value="' + allVerticalDivisions[i].Id + '">' + allVerticalDivisions[i].Quantity + '</option>';
        }


    }
    $("#inVerticalDivisions").empty().append(option);
    if (pVerticalDivisions != 0) {
        $("#inVerticalDivisions").val(pVerticalDivisions);
    }
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
                allVerticalDivisions = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';
                }
                $("#inVerticalDivisions").empty().append(option);

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

var allHorizontalDivisions = '';
function llenarCombHorizontalDivisions(pHorizontalDivisions) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allHorizontalDivisions.length; i++) {
        if (allHorizontalDivisions[i].Status.Id == 1) {
            option += '<option value="' + allHorizontalDivisions[i].Id + '">' + allHorizontalDivisions[i].Quantity + '</option>';
        }


    }
    $("#inHorizontalDivisions").empty().append(option);
    if (pHorizontalDivisions != 0) {
        $("#inHorizontalDivisions").val(pHorizontalDivisions);
    }
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
                allHorizontalDivisions = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';
                }
                $("#inHorizontalDivisions").empty().append(option);

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

var allPanel = '';
function llenarCombPanel(pPanel) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allPanel.length; i++) {
        if (allPanel[i].Status.Id == 1) {
            option += '<option value="' + allPanel[i].Id + '">' + allPanel[i].Description + '</option>';
        }


    }
    $("#inPanel").empty().append(option);
    if (pPanel != 0) {
        $("#inPanel").val(pPanel);
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
                allPanel = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inPanel").empty().append(option);

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

var allPanelMaterial = '';
function llenarCombPanelMaterial(pPanelMaterial) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allPanelMaterial.length; i++) {
        if (allPanelMaterial[i].Status.Id == 1) {
            option += '<option value="' + allPanelMaterial[i].Id + '">' + allPanelMaterial[i].Description + '</option>';
        }


    }
    $("#inPanelMaterial").empty().append(option);
    if (pPanelMaterial != 0) {
        $("#inPanelMaterial").val(pPanelMaterial);
    }
}
function GetAllPanelMaterial() {
    $.ajax({
        url: urlGetAllPanelMaterial,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allPanelMaterial = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inPanelMaterial").empty().append(option);

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

var allHingeDirection = '';
function llenarComboHingeDirection(pHingeDirection) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allHingeDirection.length; i++) {
        if (allHingeDirection[i].Status.Id == 1) {
            option += '<option value="' + allHingeDirection[i].Id + '">' + allHingeDirection[i].Description + '</option>';
        }


    }
    $("#inHingeDirection").empty().append(option);
    if (pHingeDirection != 0) {
        $("#inHingeDirection").val(pHingeDirection);
    }
}
function GetAllHingeDirection() {
    $.ajax({
        url: urlGetAllHingeDirection,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allHingeDirection = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inHingeDirection").empty().append(option);

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