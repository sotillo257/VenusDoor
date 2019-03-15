﻿$(document).ready(function () {
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

function GetPrices() {

	var TR = $("#cbTopRail").val();
	var BR = $("#cbBottomRail").val();
	var RT;
	var H = parseFloat($("#iptHeight").val()) + parseFloat($("#cbDecimalsH").val());
	var W = parseFloat($("#iptWidth").val()) + parseFloat($("#cbDecimalsW").val());
	$("#iptCost").val(!isNaN(getPriceDoor($("#cbMaterial").val(), $("#cbPanel").val(), H, W, TR, BR)) ? getPriceDoor($("#cbMaterial").val(), $("#cbPanel").val(), H, W, TR, BR) : '0.00');
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

function FlatPanelDoor(Style) {
	var stile = $('#cbTopRail').val();
	var rail = $('#cbBottomRail').val();
	var DoorUrl = "Cabinet Vector-02.png";
	var urlFolder = "/Content/img/Doors/";




	if ($('#cbJoin').val() == 2) {
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
	if (pPanel == 2) {
		if (pMaterial == 1) {
			precio = 11.83;
		}
		else if (pMaterial == 7) {
			precio = 10.04;
		}
		else if (pMaterial == 6) {
			precio = 9.51;
		}
		else if (pMaterial == 4 || pMaterial == 13) {
			precio = 10.49;
		}
	}
	else if (pPanel == 5 || pPanel == 6) {
		if (pMaterial == 1) {
			precio = 10.89;
		}
		else if (pMaterial == 7) {
			precio = 9.31;
		}
		else if (pMaterial == 6) {
			precio = 8.93;
		}
		else if (pMaterial == 4 || pMaterial == 13) {
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

	if (pTopRail == 3 || pBottomRail == 3) {
		precio = precio / 0.95;
	}

	var CostoPuerta = (((Height * width) / 12) / 12) * (precio * 2);
	var CostoPuertaBase = precio * 2;
	var Resultado = 0;
	if (CostoPuerta < CostoPuertaBase) {
		Resultado = CostoPuertaBase;
	}
	else {
		Resultado = CostoPuerta;
	}
	return Resultado.toFixed(2);
}