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
	GetAllDoorType();
	GetAllDoorOption();
	GetAllDecimals();
	PrintDoorOverlay();
	ValidateSession();

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

    $(document).on('change', '.form-control', function () {
        GetPrices();
    });

    $(document).on('change', '#cbisDrill', function () {
        HingeShow();
    });

    $(document).on('change', '#cbMaterial', function () {
        var pMaterial = $("#cbMaterial").val()
        llenarComboPanelMaterial(pMaterial)
    });

    $(document).on('change', '.Profile', function () {
        ChangeProfile();
    });

    $(document).on('change', '.Doors', function () {
        changeDoorPicture();
    });

    $(document).on('change', '#File1', function () {
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
    });

    $(document).on('change', '#cbDoorStyle', function () {
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
            llenarComboInsideAndOutside();
        } else if ($("#cbDoorStyle").val() == 1004) {
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
        } else if ($("#cbDoorStyle").val() == 1005) {
            llenarInsideAndOutsideEspecificos(3, 6);
            llenarComboPanel();
        }
        else if ($("#cbDoorStyle").val() == 1006) {
            llenarInsideAndOutsideEspecificos(5, 5);
            llenarComboPanel();
        } else if ($("#cbDoorStyle").val() == 1007) {
            llenarInsideAndOutsideEspecificos(4, 11);
            llenarComboPanel();
        } else if ($("#cbDoorStyle").val() == 1008) {
             llenarComboInsideAndOutside();
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
            llenarComboInsideAndOutside();
             var option = '<option value="slab">Slab</option>';                
             $("#cbPanel").empty().append(option);
             $("#cbInsideEdgeProfile").empty().append(option);
             $("#cbOutsideEdgeProfile").empty().append(option);
             $("#cbDoorAssembly").empty().append(option);
            $('#DoorPicture').attr('src', "/Content/img/Doors/slab.png");
            $('#ProfilePicture').attr('src', "/Content/img/Profile/slab.png");
            bandera = false;
        }
        if (bandera) {
            changeDoorPicture();
            ChangeProfile();
        }
       
    });
});

$(window).on('load', function () {
    $(".loader-page").css({ visibility: "hidden", opacity: "0" });
    $(".loader-page").css('z-index', 999999999999);
});

function ValidarCamposFront() {
    var aux = true;

    if ($('#cbDecimalsW').val() == 0) {
        $('#cbDecimalsW').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDecimalsW').removeClass("is-invalid");
    }
    if ($('#cbDecimalsH').val() == 0) {
        $('#cbDecimalsH').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDecimalsH').removeClass("is-invalid");
    }

    if ($('#iptWidth').val() == "") {
        $('#iptWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptWidth').removeClass("is-invalid");
    }

    if ($('#iptHeight').val() == "") {
        $('#iptHeight').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptHeight').removeClass("is-invalid");
    }

    if ($('#CantidadFila').val() == "") {
        $('#CantidadFila').addClass("is-invalid");
        aux = false;
    } else {
        $('#CantidadFila').removeClass("is-invalid");
    }

    if ($('#cbPanel').val() == 0) {
        $('#cbPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbPanel').removeClass("is-invalid");
    }

    if ($('#cbDoorType').val() == 0) {
        $('#cbDoorType').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDoorType').removeClass("is-invalid");
    }
    return aux;
}

function llenarComboPanel() {

    var panelType = $("#cbPanel").val();
    var option = '<option value="0">Select</option>';
    for (var i = 0; i < AllPanelType.length; i++) {
        if (AllPanelType[i].Status.Id == 1) {
            option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
        }

    }
    $("#cbPanel").empty().append(option);
    $("#cbPanel").val(panelType);
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
    var option = '';
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
 
        $("#cbInsideEdgeProfile").val(inside);
 
    option = '<option value="0">Select</option>';
    for (var i = 0; i < AllOutsideEdgeProfile.length; i++) {
        if (AllOutsideEdgeProfile[i].Status.Id == 1) {
            option += '<option value="' + AllOutsideEdgeProfile[i].Id + '">' + AllOutsideEdgeProfile[i].Description + '</option>';
        }
    }
    $("#cbOutsideEdgeProfile").empty().append(option);
    $("#cbOutsideEdgeProfile").val(outside);
}

function HingeCalculate() {
        var Height = parseFloat($(".iptHeight").val())
        if (Height >= 5 && Height < 37) {

            var ip1 = 3.5;
            var ip2 = Height - 3.5;

            $(".hp1").css('display', 'block');
            $(".hp2").css('display', 'block');
            $(".hp3").css('display', 'none');
            $(".hp4").css('display', 'none');
            $(".hp5").css('display', 'none');
            $("#HingePositionsDiv").removeClass("col-md-4").addClass("col-md-3");
            $("#HingePositionsDiv").removeClass("col-md-5");
            $("#HingePositionsDiv").removeClass("col-md-6");

            $('.HPinpt1').val(ip1);
            $('.HPinpt2').val(ip2);
            $('.HPinpt3').val("No hinge");
            $('.HPinpt4').val("No hinge");
            $('.HPinpt5').val("No hinge");

        }
        else if (Height >= 37 && Height < 61) {

            var ip1 = 3.5;
            var ip2 = Height / 2;
            var ip3 = Height - 3.5;

            $(".hp1").css('display', 'block');
            $(".hp2").css('display', 'block');
            $(".hp3").css('display', 'block');
            $(".hp4").css('display', 'none');
            $(".hp5").css('display', 'none');
            $("#HingePositionsDiv").removeClass("col-md-3").addClass("col-md-4");
            $("#HingePositionsDiv").removeClass("col-md-5");
            $("#HingePositionsDiv").removeClass("col-md-6");

            $('.HPinpt1').val(ip1);
            $('.HPinpt2').val(ip2);
            $('.HPinpt3').val(ip3);
            $('.HPinpt4').val("No hinge");
            $('.HPinpt5').val("No hinge");

        }
        else if (Height >= 61 && Height < 81) {

            var ip1 = 3.5;
            var ip2 = ((Height - 7) / 3) + 3.5;
            var ip3 = Height - (((Height - 7) / 3) + 3.5);
            var ip4 = Height - 3.5;

            $(".hp1").css('display', 'block');
            $(".hp2").css('display', 'block');
            $(".hp3").css('display', 'block');
            $(".hp4").css('display', 'block');
            $(".hp5").css('display', 'none');
            $("#HingePositionsDiv").removeClass("col-md-4").addClass("col-md-5");
            $("#HingePositionsDiv").removeClass("col-md-3");
            $("#HingePositionsDiv").removeClass("col-md-6");

            $('.HPinpt1').val(ip1);
            $('.HPinpt2').val(ip2);
            $('.HPinpt3').val(ip3);
            $('.HPinpt4').val(ip4);
            $('.HPinpt5').val("No hinge");

        }
        else if (Height >= 81 && Height < 101) {

            var ip1 = 3.5;
            var ip2 = 3.5 + (((Height / 2) - 3.5) / 2);
            var ip3 = Height / 2;
            var ip4 = Height - (3.5 + (((Height / 2) - 3.5) / 2));
            var ip5 = Height - 3.5;

            $(".hp1").css('display', 'block');
            $(".hp2").css('display', 'block');
            $(".hp3").css('display', 'block');
            $(".hp4").css('display', 'block');
            $(".hp5").css('display', 'block');
            $("#HingePositionsDiv").removeClass("col-md-5").addClass("col-md-6");
            $("#HingePositionsDiv").removeClass("col-md-3");
            $("#HingePositionsDiv").removeClass("col-md-4");

            $('.HPinpt1').val(ip1);
            $('.HPinpt2').val(ip2);
            $('.HPinpt3').val(ip3);
            $('.HPinpt4').val(ip4);
            $('.HPinpt5').val(ip5);

        }        
}

function HingeShow() {
    var drilling = $("#cbisDrill").val();
    if (drilling == 2) {
        $("#HingeDirectionDiv").css('display', 'block');
        //$("#HingePositionsDiv").css('display', 'block');
        HingeCalculate();
    } else {
        $("#HingeDirectionDiv").css('display', 'none');
        //$("#HingePositionsDiv").css('display', 'none');
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
				var option = '';
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
                var option = '';
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
                var option = '';
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
                var option = '';
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
                var option = '';
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

function GetAllPreparation() {
    $.ajax({
        url: urlGetAllPreparation,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllPanelStyle = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbPreparation").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Preparation", " ");
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

function GetAllHingeDirection() {
    $.ajax({
        url: urlGetAllHingeDirection,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            AllHingeDirection = data;
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

function GetAllDoorOption() {
    $.ajax({
        url: urlGetAllDoorOption,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allDoorOption = data;
                var option = '<option value="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + allDoorOption[i].Id + '">' + allDoorOption[i].Description + '</option>';
                    }
                }                
                $("#cbDoorOpt").empty().append(option);
            }
            else {
                LlammarModal("Danger", "Error obtaining DoorOption", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function GetAllDecimals() {
    $.ajax({
        url: urlGetAllDecimals,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allDecimals = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }

                }
                $("#cbDecimalsW").empty().append(option);
                $("#cbDecimalsH").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Decimals");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function PrintDoorOverlay(pOverlay) {
    var lbl = '<label><input style="margin-right: 8px;" type="radio" name="radioOver" data-id="1">Insert Door Type</label>';
    lbl += '<label style="margin-left: 10px;"><input style="margin-right: 8px;" type="radio" name="radioOver" data-id="2">Overlay Door Type</label>';
    $("#isOverlay").html(lbl);    
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
    var drillingV = ($("#cbisDrill").val()==1)? false: true;
    var HingeDirection = $("#cbHingeDirection").val();
    var HingePositions;
    if(drillingV == true){
        HingeDirection = $("#cbHingeDirection").val();
        HingePositions = 0;
    } else  {
        HingeDirection = 3;
        HingePositions = 2;
    }
    var datos =
         {
             Ord:{
                   DoorxUser: {
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
                 Quantity: DoorQuantity,
                 ItemCost: itemCost,
                 SubTotal: DoorSubTotal,
                     Picture: '',
                     ProfilePicture: '',
                 isDrill: drillingV,
                 HingeDirection: { Id: HingeDirection },
                 HingePositions: { Id: HingePositions },
                 DoorType: { Id: $("#cbDoorType").val() },
                     DoorOption: { Id: 0 },
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
                            llenarTablaOrderSumary()
                            $('#modalInsert').modal('hide');
                            $('#modalConfirmOrderSummary').modal('hide');
                            LlammarModal("ConfigM", "General configuration of doors successfully saved!", "");
                            llenarheaderOrder();
                            $("#btnConfigDoor").removeClass("btBuild").addClass("ModDoorxUser");
                            var boton = '<button class="btn btn-success btn-icon AddDoor" style="width: 37px;height: 37px; margin-top: 55px;" type="button"><i class="fa fa-plus"></i></button>';
                            $("#btInsertDoorTable").empty().append(boton);
                            changeDoorStyle();
                        
                        } else {
                            $('#modalInsert').modal('hide');
                            $('#modalConfirmOrderSummary').modal('hide');
                            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
                        }
                    },
                    error: function (err) {
                        $('#modalInsert').modal('hide');
                        $('#modalConfirmOrderSummary').modal('hide');
                        LlammarModal("Danger", "An error occurred during the process.");
                    },
              
                });
}

function UpdateDoorsxUser() {
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
    var HingeDirection = $("#cbHingeDirection").val();
    var HingePositions;
    if (drillingV == true) {
        HingeDirection = $("#cbHingeDirection").val();
        HingePositions = 0;
    } else {
        HingeDirection = 3;
        HingePositions = 2;
    }
    var datos =
         {
             Ord: {
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
                     Quantity: DoorQuantity,
                     ItemCost: itemCost,
                     SubTotal: DoorSubTotal,
                     Picture: '',
                     ProfilePicture: '',
                     isDrill: drillingV,
                     HingeDirection: { Id: HingeDirection },
                     HingePositions: { Id: HingePositions },
                     DoorType: { Id: $("#cbDoorType").val() },
                     DoorOption: { Id: 0 },
                     isOverlay: isOver,
                     isFingerPull: ($("#cbFingerPull").val() == 1) ? false : true,
                 },
             }
         };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoorsxUser,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result != null) {
                CodigoDoorxUser = result.DoorxUser.Id;
                $('#modalInsert').modal('hide');
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("ConfigM", "General configuration of doors successfully saved!", "");
                llenarheaderOrder();
                $("#btnConfigDoor").removeClass("btBuild").addClass("ModDoorxUser");
                var boton = '<button class="btn btn-success btn-icon AddDoor" style="width: 37px;height: 37px; margin-top: 55px;" type="button"><i class="fa fa-plus"></i></button>';
                $("#btInsertDoorTable").empty().append(boton);
                changeDoorStyle();                
            } else {
                $('#modalInsert').modal('hide');
                LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
            }
        },
        error: function (err) {
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.");
        },

    });
}

function InsertDoorsxOrder() {
    var itemCost = parseFloat($("#iptCost").val());
    var DoorQuantity = $("#CantidadFila").val();
    var DoorOp = $("#cbDoorOpt").val();

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
                 Panel: { Id: $("#cbPanel").val() },
                 DoorType: { Id: $("#cbDoorType").val() },
                 DoorOption: { Id: DoorOp },
                 User: { Id: 0 },
                 Status : {Id: 1}
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
                LlammarModal("ConfigM", "General configuration of the doors successfully modified!", "");
                llenarTablaOrderSumary();
                LimpiarCamposRapidos();
                llenarheaderOrder();               
                llenarDivShipping();
            } else {
                $('#modalInsert').modal('hide');
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
            }
        },
        error: function (err) {
            $('#modalInsert').modal('hide');
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.");
        },

    });
}

function LimpiarCamposRapidos() {
    changeDoorStyle();
    llenarComboDoorType(0)
    selectDoorOption(0);
    llenarComboDecimalW(0);
    llenarComboDecimalH(0);
    $("#iptWidth").val("");
    $("#iptHeight").val("");
    $("#CantidadFila").val("");
    
}

//function UpdateDoorsxUser() {
//    var itemCost = parseFloat($("#iptCost").val());
//    var DoorQuantity = $("#iptQuantity").val();
//    var DoorSubTotal = itemCost * DoorQuantity;
//    var OrdSubTotal = DoorSubTotal;
//    var Tx = parseFloat(0.0825);
//    var Taxes = (parseFloat(OrdSubTotal) * Tx).toFixed(2);
//    var OrdTotal = (parseFloat(OrdSubTotal) + parseFloat(Taxes)).toFixed(2);
//    var DoorOp = $('input[name=radioOption]:checked').attr("data-id");
//    var isOver = ($('input[name=radioOver]:checked').attr("data-id") == 1) ? false : true;
//    var drillingV = ($("#cbisDrill").val() == 1) ? false : true;
//    var HingeDirection = $("#cbHingeDirection").val();
//    var HingePositions;
//    if (drillingV == true) {
//        HingeDirection = $("#cbHingeDirection").val();
//        if ($("#idHingeP").val() == 2 ) {
//            HingePositions = 0;
//        } else {
//            HingePositions = $("#idHingeP").val();
//        }
//    } else {
//        HingeDirection = 3;
//        HingePositions = 2;
//    }
//    var datos =
//         {
             
//             pDoorsxUser: {
//                 Id: $("#idDoor").val(),
//                 User: { Id: 1 },
//                 Order: {Id: $("#idorder").val()},
//                 Status: {Id: 1},
//                 Material: { Id: $("#cbMaterial").val() },                            
//                 DoorStyle: { Id: $("#cbDoorStyle").val() },                                                        
//                 TopRail: { Id: $("#cbRailWidth").val() },
//                 BottomRail: { Id: $("#cbStileWidth").val() },
//                 Preparation: { Id: 1 },
//                 Panel: { Id: $("#cbPanel").val() },
//                 PanelMaterial: { Id: $("#cbPanelMaterial").val() },
//                 IsOpeningMeasurement: ($("#cbIsOpeningMeasurement").val() == 1) ? false : true,
//                 Join: { Id: $("#cbDoorAssembly").val() },
//                 OutsideEdgeProfile: { Id: $("#cbOutsideEdgeProfile").val() },
//                 InsideEdgeProfile: { Id: $("#cbInsideEdgeProfile").val() },                            
//                 VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
//                 HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
//                 Width: parseFloat($("#iptWidth").val()),
//                 DecimalsWidth: { Id: $("#cbDecimalsW").val() },
//                 Height: parseFloat($("#iptHeight").val()),
//                 DecimalsHeight: { Id: $("#cbDecimalsH").val() },
//                 Quantity: DoorQuantity,
//                 ItemCost: itemCost,
//                 SubTotal: DoorSubTotal,
//                 Picture: $('#DoorPicture').attr('src'),
//                 ProfilePicture: $('#ProfilePicture').attr('src'),
//                 isDrill: drillingV,
//                 HingeDirection: { Id: HingeDirection },
//                 HingePositions: { Id: HingePositions },
//                 DoorType: { Id: $("#cbDoorType").val() },
//                 DoorOption: { Id: DoorOp },
//                 isOverlay: isOver,
//                 isFingerPull: ($("#cbFingerPull").val() == 1) ? false : true,
//             },
                        
//             Ord: {
//                 Id: $("#idorder").val(),
//                 SubTotal: OrdSubTotal,
//                 Tax: parseFloat(Taxes),
//                 Total: parseFloat(OrdTotal),
//             },

//             HingeP: {
//                 Id: $("#idHingeP").val(),
//                 Status: { Id: 1 },
//                 Position1: $("#HP1").val(),
//                 Position2: $("#HP2").val(),
//                 Position3: $("#HP3").val(),
//                 Position4: $("#HP4").val(),
//                 Position5: $("#HP5").val(),
//             },
//         };
//                $.ajax({
//                    type: 'POST',
//                    data: JSON.stringify(datos),
//                    url: urlUpdateDoorsxUser,
//                    dataType: "json",
//                    contentType: 'application/json; charset=utf-8',
//                    success: function (result) {

//                        //Validar data para ver si mostrar error al guardar o exito al guardar
//                        if (result == true) {
//                            //llenarTablaOrderSumary();
//                            llenarheaderOrder();
//                            $('#modalInsert').modal('hide');
//                            $('#modalConfirmOrderSummary').modal('hide');
//                            LlammarModal("ConfigM", "Successful modification!", "The general configuration has been modified successfully.");
                            
//                        } else {
//                            $('#modalInsert').modal('hide');
//                            $('#modalConfirmOrderSummary').modal('hide');
//                            LlammarModal("Danger", "An error occurred during the process.");
//                        }
//                    },
//                    error: function (err) {
//                        $('#modalInsert').modal('hide');
//                        $('#modalConfirmOrderSummary').modal('hide');
//                        LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
//                    },
              
//                });
//}

$(document).on('change', '.eventChange', function () {
    //alert('This action is working');
    GetPrices();
});

function GetPrices() {

    var TR = $("#cbTopRail").val();
    var BR = $("#cbBottomRail").val();
    var RT;
    var H = parseFloat($("#iptHeight").val()) + parseFloat($("#cbDecimalsH").val());
    var W = parseFloat($("#iptWidth").val()) + parseFloat($("#cbDecimalsW").val());
    $("#iptCost").val(!isNaN(getPriceDoor($("#cbMaterial").val(), $("#cbPanel").val(), H, W, TR, BR))?getPriceDoor($("#cbMaterial").val(), $("#cbPanel").val(), H, W, TR, BR) : '0.00' );
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
    var ProfileUrl = "img11.png";
    var urlFolder = "/Content/img/Profile/";
    if (Outside == 13) {
        if (Inside == 4) {
             ProfileUrl = "-Double_Roman_Ogee_ogee_flat_panel.png";
        } else if (Inside == 5) {
             ProfileUrl = "-Double_Roman_Ogee_Reba_flat_panel.png";
        } else if (Inside == 3) {
             ProfileUrl = "-Double_Roman_Ogee_Shaker_22_flat_panel.png";
        }else if (Inside == 7) {
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
    }else if (Panel == 6) {
        $('#DoorPicture').attr('src', "/Content/img/Doors/Cabinet Vector-17.png");
    }else
    if (Panel == 2) {
       RaisedPanelDoor(Style);
    } else {
        $('#DoorPicture').attr('src', "/Content/img/Doors/img11.png");
    }
}

function FlatPanelDoor(Style) {
    var stile = $('#cbTopRail').val();
    var rail = $('#cbBottomRail').val();
    var DoorUrl = "Cabinet Vector-02.png";
    var urlFolder = "/Content/img/Doors/";
   
       


        if ($('#cbJoin').val() == 2){
            if (Style == 1009) {

                DoorUrl = "Cabinet Vector-13.png";

            } else if (Style == 1008) {


            } else {
                DoorUrl = "Cabinet Vector-08.png";
            }
        }else if (Style == 1008) {

            DoorUrl = "Cabinet Vector-01.png";


        } else if (Style == 1002) {
            if (stile == 3 && rail == 3) {
                DoorUrl = "Cabinet Vector-02.png";
            } else if (stile == 1 && rail == 1) {
                DoorUrl = "Cabinet Vector-14.png";
            }
        }else if (Style == 1004) {
            if (stile == 3 && rail == 3) {
                DoorUrl = "Cabinet Vector-05.png";
            } else if (stile == 1 && rail == 1) {
                DoorUrl = "Cabinet Vector-06.png";
            }
        }else if (Style == 1009) {
           
                DoorUrl = "Cabinet Vector-13.png";
           
        } else if (Style == 1010) {

            DoorUrl = "Cabinet Vector-13.png";

        } else {
            DoorUrl = "Cabinet Vector-02.png";
        }
        $('#DoorPicture').attr('src', urlFolder + DoorUrl);
   
}

function RaisedPanelDoor(Style) {
    var stile = $('#cbTopRail').val();
    var rail = $('#cbBottomRail').val();
    var DoorUrl = "Cabinet Vector-07.png";
    var urlFolder = "/Content/img/Doors/";
    
        if (stile == 3 && rail == 3) {
        if (Style == 1008) {
           
                var inside = $("#cbInsideEdgeProfile").val();
                var outside = $("#cbOutsideEdgeProfile").val();
                if (outside != 6 && inside != 3 && inside != 7) {
                    DoorUrl = "Cabinet Vector-09.png";
                } else if (outside == 6 && ( inside == 3 || inside == 7)) {
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
       

        if ($('#cbJoin').val() == 2) {
            if (Style == 1009) {

            } else if (Style == 1008) {

            } else {
                DoorUrl = "Cabinet Vector-07.png";
            }
        
    }
    $('#DoorPicture').attr('src', urlFolder + DoorUrl);

}
 
function getPriceDoor(pMaterial, pPanel, Height, width, pTopRail, pBottomRail) {
    var precio = 0;
    if (pPanel == 2)
    {
        if (pMaterial == 1)
        {
            precio = 11.83;
        }
        else if (pMaterial == 7)
        {
            precio = 10.04;
        }
        else if (pMaterial == 6)
        {
            precio = 9.51;
        }
        else if (pMaterial == 4 || pMaterial == 13)
        {
            precio = 10.49;
        }
    }
    else if (pPanel == 5 || pPanel == 6)
    {
        if (pMaterial == 1)
        {
            precio = 10.89;
        }
        else if (pMaterial == 7)
        {
            precio = 9.31;
        }
        else if (pMaterial == 6)
        {
            precio = 8.93;
        }
        else if (pMaterial == 4 || pMaterial == 13)
        {
            precio = 9.66;
        }
    }

    for (var i = 0; i < allMaterial.length; i++) {
        if (allMaterial[i].Id == pMaterial) {
            if (pPanel == 5 || pPanel == 6) {
                precio = allMaterial[i].PriceFlatPanel;

            } else {
                precio = allMaterial[i].PriceRaisedPanel;
            }

        }
       
    }

    if (pTopRail == 3 || pBottomRail == 3)
    {
        precio = precio / 0.95;
    }

    var CostoPuerta = (((Height * width) / 12) / 12) * (precio * 2);
    var CostoPuertaBase = precio * 2;
    var Resultado = 0;
    if (CostoPuerta < CostoPuertaBase)
    {
        Resultado = CostoPuertaBase;
    }
    else
    {
        Resultado = CostoPuerta;
    }
    return Resultado.toFixed(2);
}

function llenarTablaOrderSumary() {
    $.ajax({
        url: urlGetOrderSumary,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null && data.Order.DoorxUser.DoorsxOrder.length != 0) {
                listComp = data.Order;
                $(".btn-continue").prop('disabled', false);
                var option = '';
                for (var i = 0; i < data.Order.DoorxUser.DoorsxOrder.length; i++) {
                    option += '<tr>';
                    option += '<td><img style="width: 80px;" src="' + data.Order.DoorxUser.DoorsxOrder[i].Picture + '"></td>';
                    option += '<td>' + data.Order.DoorxUser.DoorsxOrder[i].Quantity.toString().replace(',', '.') + '</td>';
                    option += '<td>' + Math.trunc(data.Order.DoorxUser.DoorsxOrder[i].Width); 
                    if (data.Order.DoorxUser.DoorsxOrder[i].DecimalsWidth.Value != 0)
                    {
                        option +=' <span>'+data.Order.DoorxUser.DoorsxOrder[i].DecimalsWidth.Description+'</span>';
                    }   
                    option +='</td>';
                    option += '<td>' + Math.trunc(data.Order.DoorxUser.DoorsxOrder[i].Height);
                    if (data.Order.DoorxUser.DoorsxOrder[i].DecimalsHeight.Value != 0) {
                        option += ' <span>' + data.Order.DoorxUser.DoorsxOrder[i].DecimalsHeight.Description + '</span>';
                    }
                    option += '</td>'; 
                    option += '<td>' + data.Order.DoorxUser.DoorsxOrder[i].Panel.Description + '</td>';
                    option += '<td>' + data.Order.DoorxUser.DoorsxOrder[i].DoorType.Description + '</td>';
                    option += '<td>' + data.Order.DoorxUser.DoorsxOrder[i].DoorOption.Description + '</td>';
                    option += '<td><span>$</span>' + data.Order.DoorxUser.DoorsxOrder[i].ItemCost.toString().replace(',', '.') + '</td>';
                    option += '<td><span>$</span>' + data.Order.DoorxUser.DoorsxOrder[i].SubTotal.toString().replace(',', '.') + '</td>';
                    option += '<td id="tddelete" style="display: flex; padding-top: 35px;">';                   
                    option += '<button class="Cursor btn btn-danger btn-icon btnn-dele" data-id="' + data.Order.DoorxUser.DoorsxOrder[i].Id + '" style="width: 37px;height: 37px; margin-left: 10px;" type="submit"><i class="fa fa-trash"></i></button>';
                    option += '</td></tr>';                    
                }
            } else {
                $(".btn-continue").prop('disabled', true);
                option += '<tr class="odd"><td valign="top" colspan="10" class="dataTables_empty">No data available in table.</td></tr>';
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
            $("#idOrderSummary > tbody").empty().append(option);            
            
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });

}

function llenarheaderOrder() {
    $.ajax({
        url: urlGetLastDoor,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            var headerConfig = '';
            if (data.LastDoor != null) {                
                
                headerConfig += '<div class="col-xs-4 col-md-3"><label id="Material" style="margin-top: 25px;">Wood Species: <span>'+ data.LastDoor.Material.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label id="DoorStyle" style="margin-top: 25px;">Door Style: <span>'+ data.LastDoor.DoorStyle.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3">';
                if (data.LastDoor.isOverlay == false)
                {
                    headerConfig += '<label for="Overlay" style="margin-top: 25px;">Door Place: <span>Insert Door Type</span></label>';
                }
                else
                {
                    headerConfig += '<label for="Overlay" style="margin-top: 25px;">Door Place: <span>Overlay Door Type</span></label>';
                }
                headerConfig += '</div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="InsideProfile" style="margin-top: 25px;">Inside Edge Profile: <span>'+ data.LastDoor.InsideEdgeProfile.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="OutsideProfile" style="margin-top: 25px;">Outside Edge Profile: <span>'+ data.LastDoor.OutsideEdgeProfile.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="StileWidth" style="margin-top: 25px;">Stile Width: <span>'+ data.LastDoor.BottomRail.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="RailWidth" style="margin-top: 25px;">Rail Width: <span>'+ data.LastDoor.TopRail.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="DoorAssembly" style="margin-top: 25px;">Door Assembly: <span>'+ data.LastDoor.Join.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="PanelMaterial" style="margin-top: 25px;">Panel Material: <span>'+ data.LastDoor.PanelMaterial.Description +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3">';
                if (data.LastDoor.IsOpeningMeasurement == false)
                {
                    headerConfig += '<label for="Openeing" style="margin-top: 25px;">Opening Measurement: <span>No Opening</span></label>';
                }
                else
                {
                    headerConfig += '<label for="Openeing" style="margin-top: 25px;">Opening Measurement: <span>Is Opening</span></label>';
                }
                headerConfig += '</div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="VerticalD" style="margin-top: 25px;">Vertical Divisions: <span>'+ data.LastDoor.VerticalDivisions.Quantity +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3"><label for="HorizontalD" style="margin-top: 25px;">Horizontal Divisions: <span>'+ data.LastDoor.HorizontalDivisions.Quantity +'</span></label></div>';
                headerConfig += '<div class="col-xs-4 col-md-3">';
                if (data.LastDoor.isDrill == false)
                {
                    headerConfig += '<label for="Drill" style="margin-top: 25px;">Hinge Drilling: <span>No Drill</span></label>';
                }
                else
                {
                    headerConfig += '<label for="Drill" style="margin-top: 25px;">Hinge Drilling: <span>Is Drill</span></label>';
                }
                headerConfig += '</div>';
                if (data.LastDoor.isDrill == true)
                {
                    headerConfig += '<div class="col-xs-4 col-md-3"><label for="HingeDirection" style="margin-top: 25px;">Hinge Direction: <span>'+ data.LastDoor.HingeDirection.Direction +'</span></label></div>';
                }
                headerConfig += '<div class="col-xs-4 col-md-3">';
                if (data.LastDoor.isFingerPull == false)
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
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function llenarDivShipping() {

    var DivShipping = '';
    DivShipping += '<div class="col-xs-3 col-md-7">';
    DivShipping += '<label for="Observations" style="margin-top: 25px;">Observations: <i class="Cursor fa fa-info-circle" title="Here you can add an observation about this order. This note will be saved when confirming your order"></i></label>';
    DivShipping += '<textarea type="text" rows="4" id="inObservations" class="form-control" placeholder="Observations..."></textarea>';
    DivShipping += '</div><!-- form-group -->';
    DivShipping += '<div class="col-xs-4 col-md-4">';
    DivShipping += '<label for="ShipppingAddress" style="margin-top: 25px;">Shipping Address: <i class="Cursor fa fa-info-circle" title="If you want to send your doors select one of your shipping addresses or create a new one. (The delivery has an additional cost)."></i></label><div></div>';
    DivShipping += '<select style="width:100%" class="eventChange form-control select2" id="cbShippingAddress" data-placeholder=""></select>';
    DivShipping += '<p>The delivery has an additional cost</p>';
    DivShipping += '</div><!-- col -->';
    DivShipping += '<div class="col-xs-4 col-md-1">';
    DivShipping += '<button style="margin-top: 55px;" type="button" data-toggle="modal" title="Add a new shipping address" data-target="#ModalAddSA" class="Cursor btnModalSA btn btn-success tx-11 pd-y-12 pd-x-25 tx-mont tx-medium">Add</button>';
    DivShipping += '</div><!-- col -->';
    $("#DivConshipping").html(DivShipping);
    GetAllShippingAddress();
}