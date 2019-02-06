$(document).ready(function () {

    GetAllMaterial();
    GetAllInsideEdgeProfile();
    GetAllOutsideEdgeProfile();
	GetAllDoorStyle();
	GetAllBottomRail();
	GetAllTopRail();
	GetAllJoin();
	GetAllPreparation();
	GetAllPanel();
	GetAllPanelMaterial();
	GetAllVerticalDivisions();
	GetAllHorizontalDivisions();
	GetAllHingeDirection();
	ValidateSession();

	$("#btConfirm").on("click", function () {
	    InsertDoorsxUser();
	});
    
	$("#bt-conf-log").on("click", function () {
	    $('#ModalLogin').modal('toggle');
	});
});

function GetAllMaterial() {
    $.ajax({
        url: urlGetAllMaterial,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbMaterial").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Material", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
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
				var option = '';
				for (var i = 0; i < data.length; i++) {
				    if (data[i].Status.Id == 1) {
				        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
				    }

				}
				$("#cbDoorStyle").empty().append(option);

			}
			else {
				MensajeModal("Error al obtener Door Style", 5);
			}
		},
		error: function (err) {
			MensajeModal(msgErrorinterno, 5);
		}
	});
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbInsideEdgeProfile").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Inside Edge Profile", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
        }
    });
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbOutsideEdgeProfile").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Outside Edge Profile", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbBottomRail").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Bottom Rail", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbTopRail").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Top Rail", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }
                }
                $("#cbJoin").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Join", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
        }
    });
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbPreparation").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Preparation", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
        }
    });
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbPanel").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Panel", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
        }
    });
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbPanelMaterial").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Panel Material", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';
                    }
                }
                $("#cbVerticalDivisions").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Vertical Divisions", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';
                    }

                }
                $("#cbHorizontalDivisions").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Horizontal Divisions", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
        }
    });
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
                var option = '';
                for (var i = 0; i < data.length; i++) {

                    option += '<option value="' + data[i].Id + '">' + data[i].Direction + '</option>';


                }
                $("#cbHingeDirection").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Hinge Direction", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
        }
    });
}

function InsertDoorsxUser() {
    var itemCost = parseFloat($("#iptCost").val());
    var DoorQuantity = $("#iptQuantity").val();
    var DoorSubTotal = itemCost * DoorQuantity;
    var OrdSubTotal = DoorSubTotal;
    var Tx = parseFloat(0.0825);
    var Taxes = (parseFloat(OrdSubTotal) * Tx).toFixed(2);
    var OrdTotal = (parseFloat(OrdSubTotal) + parseFloat(Taxes)).toFixed(2);
    var datos =
         {
             
             pDoorsxUser: {
                 User: { Id: 1 },
                 Status: {Id: 1},
                 Material: { Id: $("#cbMaterial").val() },                            
                 DoorStyle: { Id: $("#cbDoorStyle").val() },                                                        
                 TopRail: { Id: $("#cbTopRail").val() },
                 BottomRail: { Id: $("#cbBottomRail").val() },
                 Preparation: { Id: $("#cbPreparation").val() },
                 Panel: { Id: $("#cbPanel").val() },
                 PanelMaterial: { Id: $("#cbPanelMaterial").val() },
                 IsOpeningMeasurement: $("#cbIsOpeningMeasurement").val(),
                 Join: { Id: $("#cbJoin").val() },
                 OutsideEdgeProfile: { Id: $("#cbOutsideEdgeProfile").val() },
                 InsideEdgeProfile: { Id: $("#cbInsideEdgeProfile").val() },                            
                 VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
                 HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
                 Width: parseFloat($("#iptWidth").val()),
                 Height: parseFloat($("#iptHeight").val()),
                 Quantity: DoorQuantity,
                 ItemCost: itemCost,
                 SubTotal: DoorSubTotal,
                 Picture: 'PruebaPicture',
                 ProfilePicture: 'PruebaPP',
                 isDrill: $("#cbisDrill").val(),
                 HingeDirection: { Id: $("#cbHingeDirection").val()},
             },
                        
             Ord:{
                 SubTotal: OrdSubTotal,
                 Tax: parseFloat(Taxes),
                 Total: parseFloat(OrdTotal),
             },

             HingeP: {
                 Position1: $("#HP1").val(),
                 Position2: $("#HP2").val(),
                 Position3: $("#HP3").val(),
                 Position4: $("#HP4").val(),
                 Position5: $("#HP5").val(),
             },
         };
                console.log(datos);
                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(datos),
                    url: urlInsertDoorsxUser,
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    success: function (result) {

                        //Validar data para ver si mostrar error al guardar o exito al guardar
                        if (result == true) {
                            $('#ModalSuccess').modal('toggle');
                        } else {
                            $('#modalFail').modal('toggle');
                        }
                    },
                    error: function (err) {
                        alert("error");
                    },
              
                });
}

$(document).ready(function () {
    $(".iptHeight").keyup(function (e) {
        if ($(this).val() <= 36) {
            if (e.keyup = true) {
                $(".hp1").css('display', 'block');
                $(".hp2").css('display', 'block');
                $(".hp3").css('display', 'none');
                $(".hp4").css('display', 'none');
                $(".hp5").css('display', 'none');
                $("#HingePositionsDiv").removeClass("target col-xs-4 col-md-4").addClass("target col-xs-4 col-md-3");
            }
        }
        else if ($(this).val() <= 60) {
            if (e.keyup = true) {
                $(".hp1").css('display', 'block');
                $(".hp2").css('display', 'block');
                $(".hp3").css('display', 'block');
                $(".hp4").css('display', 'none');
                $(".hp5").css('display', 'none');
                $("#HingePositionsDiv").removeClass("target col-xs-4 col-md-3").addClass("target col-xs-4 col-md-4");
            }
        } else if ($(this).val() <= 80) {
            if (e.keyup = true) {
                $(".hp1").css('display', 'block');
                $(".hp2").css('display', 'block');
                $(".hp3").css('display', 'block');
                $(".hp4").css('display', 'block');
                $(".hp5").css('display', 'none');
                $("#HingePositionsDiv").removeClass("target col-xs-4 col-md-3").addClass("target col-xs-4 col-md-4");
            }
        } else if ($(this).val() > 80) {
            if (e.keyup = true) {
                $(".hp1").css('display', 'block');
                $(".hp2").css('display', 'block');
                $(".hp3").css('display', 'block');
                $(".hp4").css('display', 'block');
                $(".hp5").css('display', 'block');
                $("#HingePositionsDiv").removeClass("target col-xs-4 col-md-3").addClass("target col-xs-4 col-md-4");
            }
        }
        else{

        }
    });
});

$(document).ready(function () {
    $(document).on('change', '.iptHeight', function () {
        var Height = parseFloat($(this).val())
        if ($(this).val() < 5) {
            
            $('#modalMinimo').modal('toggle');
            Height = 5;
                var ip1 = 3.5;
                var ip2 = Height - 3.5;
                $('.iptHeight').val(Height);
                GetPrices();
                $('.HPinpt1').val(ip1);
                $('.HPinpt2').val(ip2);
                $('.HPinpt3').val("No hinge");
                $('.HPinpt4').val("No hinge");
                $('.HPinpt5').val("No hinge");
            
        }
        else if ($(this).val() >= 5 && $(this).val() < 37) {
            
                var ip1 = 3.5;
                var ip2 = Height - 3.5;
                $('.HPinpt1').val(ip1);
                $('.HPinpt2').val(ip2);
                $('.HPinpt3').val("No hinge");
                $('.HPinpt4').val("No hinge");
                $('.HPinpt5').val("No hinge");
            
        }
        else if ($(this).val() >= 37 && $(this).val() < 61) {
           
                var ip1 = 3.5;
                var ip2 = Height / 2;
                var ip3 = Height - 3.5;
                $('.HPinpt1').val(ip1);
                $('.HPinpt2').val(ip2);
                $('.HPinpt3').val(ip3);
                $('.HPinpt4').val("No hinge");
                $('.HPinpt5').val("No hinge");
            
        }
        else if ($(this).val() >= 61 && $(this).val() < 81) {
            
                var ip1 = 3.5;
                var ip2 = ((Height - 7) / 3) + 3.5;
                var ip3 = Height - (((Height - 7) / 3) + 3.5);
                var ip4 = Height - 3.5;
                $('.HPinpt1').val(ip1);
                $('.HPinpt2').val(ip2);
                $('.HPinpt3').val(ip3);
                $('.HPinpt4').val(ip4);
                $('.HPinpt5').val("No hinge");
            
        }        
        else if ($(this).val() >= 81 && $(this).val() < 97) {
            
                var ip1 = 3.5;
                var ip2 = 3.5 + (((Height / 2) - 3.5) / 2);
                var ip3 = Height / 2;
                var ip4 = Height - (3.5 + (((Height / 2) - 3.5) / 2));
                var ip5 = Height - 3.5;
                $('.HPinpt1').val(ip1);
                $('.HPinpt2').val(ip2);
                $('.HPinpt3').val(ip3);
                $('.HPinpt4').val(ip4);
                $('.HPinpt5').val(ip5);
            
        }
        else {
            
            alert('Max Height is 96 inches');
            Height = 96;
                var ip1 = 3.5;
                var ip2 = 3.5 + (((Height / 2) - 3.5) / 2);
                var ip3 = Height / 2;
                var ip4 = Height - (3.5 + (((Height / 2) - 3.5) / 2));
                var ip5 = Height - 3.5;
                $('.iptHeight').val(Height);
                GetPrices();
                $('.HPinpt1').val(ip1);
                $('.HPinpt2').val(ip2);
                $('.HPinpt3').val(ip3);
                $('.HPinpt4').val(ip4);
                $('.HPinpt5').val(ip5);
   
        }
    });
});

$(document).ready(function () {
    $(document).on('change', '.iptWidth', function () {
        var Width = parseFloat($(this).val())
        if ($(this).val() < 5) {

            $('#modalMinimo').modal('toggle');
            Width = 5;
            $('.iptWidth').val(Width);
            GetPrices();
           
        }
        else if ($(this).val() > 42)
        {

            $('#modalMaximo').modal('toggle');
            Width = 42;
            $('.iptWidth').val(Width);
            GetPrices();
            
           
        }
        GetPrices
    });
});

$(document).on('change', '.eventChange', function () {
    //alert('This action is working');
    GetPrices();
});


function GetPrices() {
    var TR = $("#cbTopRail").val();
    var BR = $("#cbBottomRail").val();
    var RT;
    var H = parseFloat($("#iptHeight").val());
    var W = parseFloat($("#iptWidth").val());
    if (TR == 1 && BR == 1) {
        RT = 1;
    }
    else if (TR == 3 && BR == 3) {
        RT = 2;
    }
    else {
        RT = 3;
    }
    var datos =
         {
             RailThick: {
                Id : RT,
             },

             pMaterial: {
                 Id: $("#cbMaterial").val(),
             },

             pDoorstyle: {
                 Id: $("#cbDoorStyle").val(),
             }
         };
    $.ajax({
        data: JSON.stringify(datos),
        url: urlGetPrices,
        dataType: "json",
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
               
                for (var i = 0; i < data.length; i++) {
                    
                    var BP = data[i].BasePrice;
                    $("#inputBP").val(BP);
                    var ADDP = data[i].AdditionalSFPrice
                    $("#inputADD").val(ADDP);
                    var IC = ((((((H * W) / 12) / 12) - 1.5) * ADDP) + BP).toFixed(2);
                    if (IC < BP) {
                        $("#iptCost").val(BP);
                    } else {
                        $("#iptCost").val(IC);
                    }
                   
                }
            }
            else {
                MensajeModal("Error al obtener precios", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
        }
    });
}

function ValidateSession() {
    $.ajax({
        type: 'POST',
        url: urlValidateSession,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            if (result == false) {
                $('#ModalNoSession').modal('toggle');
            } 
        },
    });
}