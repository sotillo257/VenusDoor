$(document).ready(function () {
    $(document).on('click', '.btBuild', function (event) {      
        $("#lblTitulo").text("Config Door");
        $("#lblSubTitulo").text("Choose the best door option that fit your needs.");
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
    });

    $(document).on('click', '#btModify', function (event) {  
        $("#lblTitulo").text("Modifying the door options");
        $("#lblSubTitulo").text("After you make your changes remember to click \"Save\" to confirm your changes");
        $("#btConfSave").show();
        $("#btxLeft").show();
        $("#btXclose").hide();
        $("#btConfAdd").hide();
        $("#btModify").hide();
 
        $("input[name=radioOver]").attr("disabled", false);
        $(".selectModal").prop('disabled', false);
        $(".selectModal > .select2-selection").css('background-color', '#fff!important');
    });

    $(document).on('click', '#btnSaveShip', function (event) {        
        if (ValidarCamposModalShipping()) {           
            AddNewShippingAddress();       
        } else {
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });

    
    $(document).on('click', '.ModDoorxUser', function (event) {
        // GetDoorxUser();
        SearchDoor(listDOOR);
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

    $(document).on('click', '#btConfAdd', function (event) {  
        LlammarModal("ConfirmOrdenSummary", "Confirm", "Do you want to save this configuration?",
        '<button onclick="AgregarD();" class="Cursor btn btn-success tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Save</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });

    $(document).on('click', '#btConfSave', function (event) {   
        LlammarModal("ConfirmOrdenSummary", "Do you want to save your new changes?", "The doors added to your order will suffer some changes. Do you want to proceed with this operation?.<br>(This could take a little time).",
        '<button onclick="NuevosCambiosDXU();" id="btnSaveChanges" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Confirm</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
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
    $(document).on('click', '.btnModalSA', function (event) {     
        limpiarInputsShipping();
    });

    if (DoorDashboard != '') {
        SearchDoor(DoorDashboard);
        $('#modalInsert').modal('show');
        $("#btModify").hide();
        $("#btConfAdd").show();
        $("#btConfSave").hide();
        $("#btxLeft").hide();
        $("#btXclose").show();
        $("#lblTitulo").text("Config Door");
        $("#lblSubTitulo").text("Choose the the best door option that fit your needs.");
    }
});
var _PanelMAterial = 0;
function SearchDoor(data) {

    if (data != '') {
        
        $('#idDoor').val(data.Id);
        var HTMLImage =                       
           ' <center> <img style="height: 100px;width: 235px;margin-top: 20px;" id="ProfilePicture" src="' + data.ProfilePicture + '">' +
                      '<img style="width: 230px;height: 230px;" id="DoorPicture" src="' + data.Picture + '">' +
                      '</center>';
        $('#Picture').html(HTMLImage);
        var fingerPull = data.isFingerPull;
        if (fingerPull == false) {
            fingerPull = 1;
        } else {
            fingerPull = 2;
        }
        llenarComboFinger(fingerPull);

        HingeCalculate();

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
        var isDrill = data.isDrill;
        if (isDrill == false) {
            isDrill = 1;
        } else {
            isDrill = 2;
        }
        llenarComboIsDrill(isDrill);
        checkIsOverlay(isOver);
        llenarComboMaterial(data.Material.Id);
        
        llenarComboPanelStyle(data.Panel.Id);
        ChangeDoorStylePanel(data.DoorStyle.Id);
        llenarComboIEP(data.InsideEdgeProfile.Id);
        llenarComboOEP(data.OutsideEdgeProfile.Id);
        llenarComboStileWidth(data.BottomRail.Id);
        llenarComboRailWidth(data.TopRail.Id);
        llenarComboDoorAssembly(data.Join.Id);
        llenarComboVerticalDivisions(data.VerticalDivisions.Id);
        llenarComboHorizontalDivisions(data.HorizontalDivisions.Id);
        if (data.DoorStyle.Id == 1010) {
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
            llenarComboDoorStyle(data.DoorStyle.Id);
        }
        _PanelMAterial = data.PanelMaterial.Id;
        llenarComboPanelMaterial(data.Material.Id, data.DoorStyle.Id);
        //$("#iptCost").val(data.ItemCost);
        $("input[name=radioOver]").attr("disabled", false);
        window.history.replaceState({}, document.title, "/" + "../OrderSummary");
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
                var HTMLImage =                       
                   ' <center> <img style="height: 100px;width: 235px;margin-top: 20px;" id="ProfilePicture" src="' + data.LastDoor.ProfilePicture + '">' +
                              '<img style="width: 230px;height: 230px;" id="DoorPicture" src="' + data.LastDoor.Picture + '">' +
                              '</center>';
                $('#Picture').html(HTMLImage);
                var fingerPull = data.LastDoor.isFingerPull;
                if (fingerPull == false) {
                    fingerPull = 1;
                } else {
                    fingerPull = 2;
                }
                llenarComboFinger(fingerPull);
               
                HingeCalculate();

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
                var isDrill = data.LastDoor.isDrill;
                if (isDrill == false) {
                    isDrill = 1;
                } else {
                    isDrill = 2;
                }
                llenarComboIsDrill(isDrill);
                checkIsOverlay(isOver);                
                llenarComboMaterial(data.LastDoor.Material.Id);
               
                llenarComboPanelStyle(data.LastDoor.Panel.Id);
                llenarComboIEP(data.LastDoor.InsideEdgeProfile.Id);
                llenarComboOEP(data.LastDoor.OutsideEdgeProfile.Id);
                llenarComboStileWidth(data.LastDoor.BottomRail.Id);
                llenarComboRailWidth(data.LastDoor.TopRail.Id);
                llenarComboDoorAssembly(data.LastDoor.Join.Id);
                llenarComboPanelMaterial(data.LastDoor.Material.Id, data.LastDoor.DoorStyle.Id);
                llenarComboVerticalDivisions(data.LastDoor.VerticalDivisions.Id);
                llenarComboHorizontalDivisions(data.LastDoor.HorizontalDivisions.Id);
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
