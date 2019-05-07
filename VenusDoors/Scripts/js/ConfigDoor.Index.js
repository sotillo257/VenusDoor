$(document).ready(function () {
    //GetAllMaterial();
    //GetAllInsideEdgeProfile();
    //GetAllOutsideEdgeProfile();
	//GetAllDoorStyle();
	//GetAllBottomRail();
	//GetAllTopRail();
	//GetAllJoin();
	//GetAllPreparation();
	//GetAllPanel();
	//GetAllPanelMaterial();
	//GetAllVerticalDivisions();
	//GetAllHorizontalDivisions();
	//GetAllHingeDirection();
	//GetAllDoorType();
	//GetAllDoorOption();
	//GetAllDecimals();
    //PrintDoorOverlay();
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
	ValidateSession();
	ChangeDoorStylePanel($("#cbDoorStyle").val());
	$(document).on('click', "#bt-conf-log", function () {
	    LlammarModal("MLogin", "Sign in to your account to process your order!", " ");
	});
    //AddDoor
	$(document).on('click', ".AddDoor", function () {
	    if (ValidarCamposFront()) {
	        if (ValidadWH()) {
	        InsertDoorsxOrder();
	        } else {
	            $('#modalConfirmOrderSummary').modal('hide');
	            LlammarModal("Danger", "The inches are not within our limits.", " ");
	        }
	    } else {
	        LlammarModal("Danger", "You must fill all the fields.", " ");
	    }

	});

	$(document).on('click', "#btnLogo", function () {
	    $("#File1").trigger('click');
	});

	$(document).on('click', ".MassiveNLL", function () {
	    $(".btBuild").trigger('click');
	}); 

    $(document).on('change', '#File1', function () {
        $('input[type=file][data-max-size]').each(function () {
            if (typeof this.files[0] !== 'undefined') {
                var maxSize = parseInt($(this).attr('data-max-size'), 10),
                size = this.files[0].size;
                isOk = maxSize > size;
                return isOk;
            }
        });
        if (!isOk) {
            LlammarModal("Danger", "Image size execeeds maximun allowable size", "Maximun file size 5MB");
        } else {
            var compania = new Array();
            var formData = new FormData();
            if ($("#File1")[0].files.length > 0) {
                //alert($("#File1")[0].files[0].name);
                formData.append('Files', $("#File1")[0].files[0], $("#File1")[0].files[0].name);
            }
            compania.push(formData);
            $.ajax({
                url: urlUploadExcel,
                type: 'POST',
                data: compania[0],
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == true) {
                        LlammarModal("ConfigM", "Successful doors creation!", "Your doors has been added successfully.");
                        llenarTablaOrderSumary();
                        $("#ModalUpload").modal("hide");
                    } else {
                        LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
                    }

                },
                error: function (err) {

                },
                complete: function (data) {
                    $("#btnCerrarModalCompania").prop("disabled", false);
                    $("#btnAgregarComapania").button('reset');
                }
            });
        }
    });

});



$(window).on('load', function () {
    $(".loader-page").css({ visibility: "hidden", opacity: "0" });
    $(".loader-page").css('z-index', 999999999999);
});

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

var CodigoDoorxUser = 0;

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
             Ord:{
                 DoorxUser: {
                     Id: $('#idDoor').val(),
                     User: { Id: 0 },
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
                            llenarTablaOrderSumary();
                            $('#modalInsert').modal('hide');
                            $('#modalConfirmOrderSummary').modal('hide');
                            LlammarModal("ConfigM", "General configuration of doors successfully saved!", "");                            
                            $("#btnConfigDoor").removeClass("btBuild").addClass("ModDoorxUser");
                            var boton = '<button id="dxoAdd" class="btn btn-success btn-icon AddDoor" style="width: 37px;height: 37px; margin-top: 55px;" type="button"><i class="fa fa-plus"></i></button>';
                            boton += '<button id="dxoSave" class="Cursor btn btn-success btn-icon SaveDoor" title="" type="button" style="margin-top: 55px; display:none"><div><i class="fa fa-check"></i></div></button>';
                            boton += '<button id="dxoCancel" class="Cursor btn btn-danger btn-icon" title="" type="button" style="margin-top: 55px;margin-left: 3px; display:none"><div><i class="fa fa-window-close"></i></div></button>';
                            $("#btInsertDoorTable").empty().append(boton);
                            changeDoorStyle();                            
                            HingeShow(drillingV);
                            $("#massiveNULL").hide();
                            $("#massiveTRUE").show();
                        
                        } else {
                            $('#modalInsert').modal('hide');
                            $('#modalConfirmOrderSummary').modal('hide');
                            LlammarModal("Danger", "Error in the process.", "An error occurred when saving the general settings.");
                        }
                    },
                    error: function (err) {
                        $('#modalInsert').modal('hide');
                        $('#modalConfirmOrderSummary').modal('hide');
                        LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
                    },
              
                });
}

function InsertDoorsxOrder() {
    var itemCost = parseFloat($("#iptCost").val());
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
                 DoorsxUser: CodigoDoorxUser,
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
                 User: { Id: 0 },
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
                LlammarModal("ConfigM", "The door has been created successfully!", "");
                $(".btn-continue").prop('disabled', false);
                llenarTablaOrderSumary();
                LimpiarCamposRapidos();                
            } else {
                $('#modalInsert').modal('hide');
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Danger", "Error in the process.", "An error occurred when creating the door.");
            }
        },
        error: function (err) {
            $('#modalInsert').modal('hide');
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}

function LimpiarCamposRapidos() {
    changeDoorStyle();
    llenarComboDoorType(2)
    llenarComboDoorOption(1);
    llenarComboDecimalW(0);
    llenarComboDecimalH(0);
    $("#iptWidth").val("");
    $("#iptHeight").val("");
    $("#CantidadFila").val("");
    $("#idDoorxOrder").val("");
    
}

function ValidateSession() {
    $.ajax({
        type: 'POST',
        url: urlValidateSession,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            if (result == false) {
                $(".btBuild").prop('disabled', false);
                LlammarModal("MLogin", "Sign in to your account to start building doors!", " ");
                //setTimeout(window.location.href = '/Logins/Index', 15000);
            } 
        },
    });
}

function llenarTablaOrderSumary() {
    $.ajax({
        url: urlGetOrderSumary,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {                
                llenarheaderOrder(data.Order.DoorxUser);
                listDOOR = data.Order.DoorxUser;
                listDXO = data.Order.DoorxUser.DoorsxOrder;
                var tb = $('#tbOrderSummary').DataTable();
                tb.rows().remove().draw(false);
                var t = $('#idOrderSummary').DataTable();
                t.rows().remove().draw(false);
                var drillingV = data.Order.DoorxUser.isDrill;
                if (drillingV == false) {
                    $("#datatab2").css('display', 'none');
                    $("#datatab1").css('display', 'block');
                } else {
                    $("#datatab1").css('display', 'none');
                    $("#datatab2").css('display', 'block');
                }
                for (var i = 0; i < listDXO.length; i++) {
                    var Imagen = '<img style="width: 80px;" src="' + listDXO[i].Picture + '">';
                    var Botones = '<center><button class="Cursor btn btn-primary btn-icon btnn-edit" data-id="' + listDXO[i].Id + '" style="width: 25px;height: 25px;" type="submit"><i class="fa fa-edit"></i></button>';
                    Botones += '<button class="Cursor btn btn-danger btn-icon btnn-dele" data-id="' + listDXO[i].Id + '" style="width: 25px;height: 25px; margin-left: 10px;" type="submit"><i class="fa fa-trash"></i></button></center>';
                    var WDecimal = listDXO[i].DecimalsWidth.Description;
                    var HDecimal = listDXO[i].DecimalsHeight.Description;
                    if (WDecimal == "0" || WDecimal == 0) {
                        WDecimal = "";
                    }
                    if (HDecimal == "0" || HDecimal == 0) {
                        HDecimal = "";
                    }
                  
                   
                    t.row.add([
                        Imagen,
                        listDXO[i].Quantity,
                        listDXO[i].Width + ' ' + WDecimal,
                        listDXO[i].Height + ' ' + HDecimal,
                        listDXO[i].HingeDirection.Direction,
                        listDXO[i].DoorType.Description,
                        listDXO[i].DoorOption.Description,
                        "<span>$</span>" + listDXO[i].ItemCost,
                        "<span>$</span>" + listDXO[i].SubTotal,
                        Botones,
                    ]).draw(false);

                  
                    tb.row.add([
                        Imagen,
                        listDXO[i].Quantity,
                        listDXO[i].Width + ' ' + WDecimal,
                        listDXO[i].Height + ' ' + HDecimal,
                        listDXO[i].DoorType.Description,
                        listDXO[i].DoorOption.Description,
                        "<span>$</span>" + listDXO[i].ItemCost,
                        "<span>$</span>" + listDXO[i].SubTotal,
                        Botones,
                    ]).draw(false);
                }
               
            } else {
                $(".btn-continue").prop('disabled', true);
                LlammarModal("Danger", "Error al llenar la tabla", "ConfigDoor.Index.js line:1890");
            }

            var result = '';
            if(data.Order.SubTotal <= 0 || data.Order.Total <= 0){

            } else {
                result += '<input hidden id="idorder" value="' + data.Order.Id + '" />';
                result += '<input hidden id="idtotal" value="' + data.Order.Total + '" />';
                result += '<input hidden id="idstatus" value="' + data.Order.Status.Id + '" />';
                result += '<h5 id="lblSubtotal" style="color:#7b7979">Sub-Total: <span>$</span>' + data.Order.SubTotal.toString().replace(',', '.') + '</h5>';
                result += '<h5 id="lblTax" style="color:#7b7979">Tax: <span>$</span>' + data.Order.Tax.toString().replace(',', '.') + '</h5>';
                result += '<h5 id="lblTotal" style="color:#000">Total Price: <span>$</span>' + data.Order.Total.toString().replace(',', '.') + '</h5>';
            }
             
            $("#Resultados").html(result);                     
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "llenarTablaOrderSumary");
        }
    });

}

function llenarheaderOrder(data) {
   
            var headerConfig = '';
            if (data != null) {                
                
                headerConfig += '<div class="col-xs-4 col-md-3"><label id="Material" style="margin-top: 25px;">Wood Species: <span>'+ data.Material.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label id="DoorStyle" style="margin-top: 25px;">Door Style: <span>'+ data.DoorStyle.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3">';
                if (data.isOverlay == false)
                {
                    headerConfig += '<label for="Overlay" style="margin-top: 25px;">Door Place: <span>Inset Door Type</span></label>';
                }
                else
                {
                    headerConfig += '<label for="Overlay" style="margin-top: 25px;">Door Place: <span>Overlay Door Type</span></label>';
                }
                headerConfig += '</div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="InsideProfile" style="margin-top: 25px;">Inside Edge Profile: <span>'+ data.InsideEdgeProfile.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="OutsideProfile" style="margin-top: 25px;">Outside Edge Profile: <span>'+ data.OutsideEdgeProfile.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="StileWidth" style="margin-top: 25px;">Stile Width: <span>'+ data.BottomRail.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="RailWidth" style="margin-top: 25px;">Rail Width: <span>'+ data.TopRail.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="DoorAssembly" style="margin-top: 25px;">Door Assembly: <span>' + data.Join.Description + '</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="PanelStyle" style="margin-top: 25px;">Panel Style: <span>' + data.Panel.Description + '</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="PanelMaterial" style="margin-top: 25px;">Panel Material: <span>' + data.PanelMaterial.Description + '</span></label></div>';                
                headerConfig += '<div class="col-xs-4 col-md-3">';
                if (data.IsOpeningMeasurement == false)
                {
                    headerConfig += '<label for="Openeing" style="margin-top: 25px;">Opening Measurement: <span>No</span></label>';
                }
                else
                {
                    headerConfig += '<label for="Openeing" style="margin-top: 25px;">Opening Measurement: <span>Yes</span></label>';
                }
                headerConfig += '</div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="VerticalD" style="margin-top: 25px;">Vertical Divisions: <span>'+ data.VerticalDivisions.Quantity +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="HorizontalD" style="margin-top: 25px;">Horizontal Divisions: <span>'+ data.HorizontalDivisions.Quantity +'</span></label></div>';                               
                headerConfig += '<div class="col-xs-4 col-md-3">';
                if (data.isDrill == false) {
                    headerConfig += '<label for="Drill" style="margin-top: 25px;">Hinge Drilling: <span>No</span></label>';
                    headerConfig += '<input id="idDrill" hidden value="1" />';
                }
                else {
                    headerConfig += '<label for="Drill" style="margin-top: 25px;">Hinge Drilling: <span>Yes</span></label>';
                    headerConfig += '<input id="idDrill" hidden value="2" />';
                }
                headerConfig += '</div>';
                headerConfig += '<div class="col-xs-4 col-md-3">';
                if (data.isFingerPull == false)
                {
                    headerConfig += '<label for="Finger" style="margin-top: 25px;">Finger Pull: <span>No</span></label>';                    
                }
                else
                {
                    headerConfig += '<label for="Finger" style="margin-top: 25px;">Finger Pull: <span>Yes</span></label>';                   
                }
                headerConfig += '</div>';

            } else {
                headerConfig += '';
            }
            
            $("#HeaderOptions").html(headerConfig);
        
}
