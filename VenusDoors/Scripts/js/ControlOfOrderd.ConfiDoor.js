$(document).ready(function () {
    
    $("#btnBack").on('click', function () {
        $("#editBCK").trigger("click");
    });

    $("#editDXU").on('click', function () {
        $('#editBCK').removeClass("active");
        $("#editDXU").hide();
        $("#editBCK").show();
        $("#btnsave").show();
        $("#btnsaveDxO").hide();
        $("#btnBack").show();
        $("#btnClose").hide();
        QuitarClaseErrorACombos();
    });

    $("#editBCK").on('click', function () {
        $("#editDXU").show();
        $("#editBCK").hide();
        $("#btnsave").hide();
        $("#btnsaveDxO").hide();
        $("#btnBack").hide();
        $("#btnClose").show();
        $('#editDXU').removeClass("active");
        $('#dxoPanel').removeClass("active");

        if (_fingerPull == 1) {
            _fingerPull = 1;
        } else {
            _fingerPull = 2;
        }
        llenarComboFinger(_fingerPull);

        if (_isDrill == 1) {
            _isDrill = 1;
        } else {
            _isDrill = 2;
        }
        llenarComboIsDrill(_isDrill);
        HingeCalculate();
        HingeShow();

        if (_isOpen == 1) {
            _isOpen = 1;
        } else {
            _isOpen = 2;
        }
        llenarComboIsOpen(_isOpen);

        if (_isOver == 1) {
            _isOver = 1;
        } else {
            _isOver = 2;
        }
        checkIsOverlay(_isOver);
        llenarComboMaterial(_Material);
        llenarComboDoorStyle(_DoorStyle);
        llenarComboIEP(_IEP);
        llenarComboOEP(_OEP);
        llenarComboStileWidth(_StileW);
        llenarComboRailWidth(_RailW);
        llenarComboDoorAssembly(_DoorAsm);
        llenarComboPanelStyle(_PanelStyle);
        llenarComboPanelMaterial(_PanelMaterial);
        llenarComboVerticalDivisions(_Vertical);
        llenarComboHorizontalDivisions(_Horizontal);

        ChangeDoorStylePanel(_DoorStyle);
    });

    $(document).on('click', '.editDoor', function (event) {
        var id = $(this).attr('data-id');        
        $("#editDXU").hide();
        $("#editBCK").show();
        $("#btnsave").hide();
        $("#btnBack").show();
        $("#btnClose").hide();
        $('#editBCK').removeClass("active");
        $("#btnsaveDxO").show();
        QuitarClaseErrorACombos();


        for (var i = 0; i < DxOl.length; i++) {
            if (DxOl[i].Id == $(this).attr('data-id')) {
                               

                var PicturePanel = '<img style="width: 230px;height: 230px;" id="DoorPicture" src="' + DxOl[i].Picture + '">';                
                $('#PicturePanel').html(PicturePanel);
                $('#idDoorxO').val(DxOl[i].Id);
                $('#idDxuXO').val(DxOl[i].DoorxUser.Id);
                $('#descDXO').val(DxOl[i].Descuento);
                $('#iptWidth').val(DxOl[i].Width);
                $('#iptHeight').val(DxOl[i].Height);
                $('#CantidadFila').val(DxOl[i].Quantity);
                //$('#descDXO').val(DxOl[i].Descuento);                
               
                llenarComboHingeDirection(DxOl[i].HingeDirection.Id);
                llenarComboDoorType(DxOl[i].DoorType.Id);
                selectDoorOption(DxOl[i].DoorOption.Id);
                llenarComboDecimalW(DxOl[i].DecimalsWidth.Id);
                llenarComboDecimalH(DxOl[i].DecimalsHeight.Id);
                if ($("#cbisDrill").val() == 1) {
                    $("#HingeDirectionDiv").hide();
                } else {
                    $("#HingeDirectionDiv").show();
                }
                break;
            }
        }
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
        UpdateDoorxOrder();
    } else {
        $('#modalConfirmOrderSummary').modal('hide');
        LlammarModal("Danger", "You must fill all the fields.", " ");
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
    option += '<option value="1">No</option>';
    option += '<option value="2">Yes</option>';
    $("#cbisDrill").empty().append(option);
    if (pDrill != 0) {
        $("#cbisDrill").val(pDrill);

    }
}

function llenarComboIsOpen(pOpen) {

    var option = '<option value="0">Select</option>';
    option += '<option value="1">No opening</option>';
    option += '<option value="2">Opening</option>';
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
             Orden: {
                 Id: _IdOrderModificar,
                 Descuento: $("#descDXU").val(),
                 DoorxUser: {
                     Id: $("#idDoor").val(),
                     User: { Id: 0 },
                     Order: { Id: _IdOrderModificar},
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
                     DecimalsWidth: { Id: 2 },
                     Height: parseFloat($("#iptHeight").val()),
                     DecimalsHeight: { Id: 2 },
                     Quantity: DoorQuantity,
                     ItemCost: itemCost,
                     SubTotal: DoorSubTotal,
                     Picture: $('#DoorPicture').attr('src'),
                     ProfilePicture: $('#ProfilePicture').attr('src'),
                     isDrill: drillingV,
                     DoorType: { Id: 1 },
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
                GetDoorsByOrder(_IdDoorxUser);
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

function UpdateDoorxOrder() {
    var itemCost = parseFloat($("#iptCost").val());
    var DoorQuantity = $("#CantidadFila").val();
    var DoorOp = $("#cbDoorOpt").val();
    if ($('#cbisDrill').val() == 2) {
        HingeDirection = $("#cbHingeDirection").val();
        HingePositions = 2;
    } else {
        HingeDirection = 3;
        HingePositions = 2;
    }
    var datos =
         {
             idOrder: _IdOrderModificar,
             pDoorsxOrder: {
                 Id: $("#idDoorxO").val(),
                 DoorxUser: { Id: $("#idDoor").val(), },
                 Width: parseFloat($("#iptWidth").val()),
                 DecimalsWidth: { Id: $("#cbDecimalsW").val() },
                 Height: parseFloat($("#iptHeight").val()),
                 DecimalsHeight: { Id: $("#cbDecimalsH").val() },
                 Quantity: DoorQuantity,
                 ItemCost: 0,
                 SubTotal: 0,
                 Picture: '',
                 ProfilePicture: '',
                 HingeDirection: { Id: HingeDirection },
                 HingePositions: { Id: HingePositions },
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
        url: urlUpdateDoorxOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("ConfigM", "The door has been modified successfully!", "");
                GetDoorsByOrder(_IdDoorxUser);
                changeDoorStyle();
                $("#editBCK").trigger("click");
                llenarTablaOrderControl();
            } else {
                $('#modalInsert').modal('hide');
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Danger", "Error in the process.", "An error occurred when modifing the door.");
            }
        },
        error: function (err) {
            $('#modalInsert').modal('hide');
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },
    });
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

    if ($('#cbPanel').val() == 0 || $('#cbPanel').val() == null) {
        $('#select2-cbPanel-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbPanel-container').removeClass("cbError");
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

function ValidarCamposVaciosDXO() {
    var aux = true;

    if ($('#cbisDrill').val() == 2) {
        if ($('#cbHingeDirection').val() == 0 || $('#cbHingeDirection').val() == null) {
            $('#select2-cbHingeDirection-container').addClass("cbError");
            aux = false;
        } else {
            $('#select2-cbHingeDirection-container').removeClass("cbError");
        }
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
