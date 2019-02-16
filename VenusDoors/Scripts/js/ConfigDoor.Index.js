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
	    if (ValidarCamposVacios()) {
	    InsertDoorsxUser();
	    } else {
	        LlammarModal("Danger", "You must fill all the fields.", " ");
	    }

	});
    
	$("#bt-conf-log").on("click", function () {
	    LlammarModal("MLogin", "Sign in to your account to process your order!", " ");
	});

	$("#btnLogo").on('click', function () {
	    $("#File1").trigger('click');
	});

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
        else {

        }
    });

    $(document).on('change', '#cbisDrill', function () {
        if ($("#cbisDrill").val() == "true") {
            $("#HingeDirectionDiv").css('display', 'block');
            $("#HingePositionsDiv").css('display', 'block');
        } else if ($("#cbisDrill").val() == "false") {
            $("#HingeDirectionDiv").css('display', 'none');
            $("#HingePositionsDiv").css('display', 'none');
        }
    });

    $(document).on('change', '#cbMaterial', function () {
        var pMaterial = $("#cbMaterial").val()
        llenarComboPanelMaterial(pMaterial)
    });

    $(document).on('change', '.iptHeight', function () {
        var Height = parseFloat($(this).val())
        if ($(this).val() < 5) {

            LlammarModal("Danger", "Error: Minimum is 5 inches", " ");
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

            LlammarModal("Danger", "Error: Max is 96 inches", " ");
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

    $(document).on('change', '.iptWidth', function () {
        var Width = parseFloat($(this).val())
        if ($(this).val() < 5) {

            LlammarModal("Danger", "Error: Minimum is 5 inches", " ");
            Width = 5;
            $('.iptWidth').val(Width);
            GetPrices();

        }
        else if ($(this).val() > 42) {

            //$('#modalMaximo').modal('toggle');
            LlammarModal("Danger", "Error: Max is 42 inches", " ");
            Width = 42;
            $('.iptWidth').val(Width);
            GetPrices();
        }
    });

    $(document).on('change', '.Profile', function () {
        ChangeProfile();
    });
    $(document).on('change', '.Doors', function () {
        changeDoorPicture();
    });
    $(document).on('change', '#File1', function () {
        console.log("activo");
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
                    LlammarModal("Succes", "Successful door creation!", "You can go to see your order and specify your purchase or, you can create another door.");
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
        
        if ($("#cbDoorStyle").val() == 1002) {
          var panelType =  $("#cbPanel").val();
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
            var option = '';
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
            var option = '';
            for (var i = 0; i < AllPanelType.length; i++) {
                if (AllPanelType[i].Status.Id == 1 && AllPanelType[i].Id == 5) {
                    option += '<option value="' + AllPanelType[i].Id + '">' + AllPanelType[i].Description + '</option>';
                }
            }
            $("#cbPanel").empty().append(option);
            $("#cbPanel").val(5);
        }
        changeDoorPicture();
        ChangeProfile();
    });
});

$(window).on('load', function () {
        $(".loader-page").css({ visibility: "hidden", opacity: "0" })
});
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

function ValidarCamposVacios() {
    var aux = true;
    if ($('#cbMaterial').val() == 0) {
        $('#cbMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbMaterial').removeClass("is-invalid");
    }

    if ($('#iptQuantity').val() == "") {
        $('#iptQuantity').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptQuantity').removeClass("is-invalid");
    }

    if ($('#cbDoorStyle').val() == 0) {
        $('#cbDoorStyle').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDoorStyle').removeClass("is-invalid");
    }

    if ($('#cbTopRail').val() == 0) {
        $('#cbTopRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbTopRail').removeClass("is-invalid");
    }

    if ($('#cbBottomRail').val() == 0) {
        $('#cbBottomRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbBottomRail').removeClass("is-invalid");
    }

    if ($('#cbPreparation').val() == 0) {
        $('#cbPreparation').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbPreparation').removeClass("is-invalid");
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

    if ($('#cbIsOpeningMeasurement').val() == 0) {
        $('#cbIsOpeningMeasurement').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbIsOpeningMeasurement').removeClass("is-invalid");
    }

    if ($('#cbJoin').val() == 0) {
        $('#cbJoin').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbJoin').removeClass("is-invalid");
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

    if ($('#cbisDrill').val() == "") {
        $('#cbisDrill').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbisDrill').removeClass("is-invalid");
    }
    return aux;
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
			    LlammarModal("Danger", "Error obtaining Door Style", " ");
			}
		},
		error: function (err) {
			MensajeModal(msgErrorinterno, 5);
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
            MensajeModal(msgErrorinterno, 5);
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
                LlammarModal("Danger", "Error obtaining Bottom Rail", " ");
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
                LlammarModal("Danger", "Error obtaining Top Rail", " ");
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
                LlammarModal("Danger", "Error obtaining Join", " ");
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
                LlammarModal("Danger", "Error obtaining Preparation", " ");
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
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
                var option = '';
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
            MensajeModal(msgErrorinterno, 5);
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
                LlammarModal("Danger", "Error obtaining Vertical Divisions", " ");
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
                LlammarModal("Danger", "Error obtaining Horizontal Divisions", " ");
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
                 Picture: $('#DoorPicture').attr('src'),
                 ProfilePicture: $('#ProfilePicture').attr('src'),
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
                            LlammarModal("Succes", "Successful door creation!", "You can go to see your order and specify your purchase or, you can create another door.");
                        } else {
                            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
                        }
                    },
                    error: function (err) {
                        alert("error");
                    },
              
                });
}



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
    $("#iptCost").val(getPriceDoor($("#cbMaterial").val(), $("#cbPanel").val(), H, W, TR, BR));
}

function ValidateSession() {
    $.ajax({
        type: 'POST',
        url: urlValidateSession,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            if (result == false) {
                LlammarModal("MLogin", "Sign in to your account to start building doors!", " ");
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
    var DoorUrl = "img11.png";
    var urlFolder = "/Content/img/Doors/";
   
        if (Style == 1008) {
           
                DoorUrl = "Cabinet Vector-01.png";
          

        }
        if (Style == 1002) {
            if (stile == 3 && rail == 3) {
                DoorUrl = "Cabinet Vector-02.png";
            } else if (stile == 1 && rail == 1) {
                DoorUrl = "Cabinet Vector-14.png";
            }
        }
        if (Style == 1004) {
            if (stile == 3 && rail == 3) {
                DoorUrl = "Cabinet Vector-05.png";
            } else if (stile == 1 && rail == 1) {
                DoorUrl = "Cabinet Vector-06.png";
            }
        }
        if (Style == 1009) {
           
                DoorUrl = "Cabinet Vector-13.png";
           
        }
       
        if ($('#cbJoin').val() == 2) {
            if (Style == 1009) {

                DoorUrl = "Cabinet Vector-13.png";

            } else if (Style == 1008) {


            } else {
                DoorUrl = "Cabinet Vector-08.png";
            }
    }
        $('#DoorPicture').attr('src', urlFolder + DoorUrl);
   
}

function RaisedPanelDoor(Style) {
    var stile = $('#cbTopRail').val();
    var rail = $('#cbBottomRail').val();
    var DoorUrl = "img11.png";
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