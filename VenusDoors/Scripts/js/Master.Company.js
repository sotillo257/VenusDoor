$(document).ready(function () {
	GetStatus();
	GetType();
    $("#btnInsertCompany").on("click", function () {
        if (ValidarCamposVacios()) {
            if (isOk) {
            InsertCompany();
        } else {
                LlammarModal("Danger", "Image size execeeds maximun allowable size", "Maximun file size 5MB");
            }            
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
        
    });
    $(document).on('click', "#btnLogo", function () {
        $("#inLogo").trigger('click');
    });
    var isOk = true;
    $(document).on('change', "#inLogo", function () {
        $("#lbCheck").show();
       
        $('input[type=file][data-max-size]').each(function () {
            if (typeof this.files[0] !== 'undefined') {
                var maxSize = parseInt($(this).attr('max-size'), 10),
                size = this.files[0].size;
                isOk = maxSize > size;
                return isOk;
            }
        });
        if (!isOk) {
            LlammarModal("Danger", "Image size execeeds maximun allowable size", "Maximun file size 5MB");
        }
    });
    $("#btUpdateCompany").on("click", function () {
        if (ValidarCamposVacios()) {
            if (isOk) {
        	UpdateCompany();
        } else {
                LlammarModal("Danger", "Image size execeeds maximun allowable size", "Maximun file size 5MB");
            }
        	
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
        
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btUpdateCompany").hide();
        $("#btnInsertCompany").show();
        Limpiar();
        QuitarClaseErrorACombos();
    });

    $(document).on('click', '.Remove', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Warning!", "You are about to delete an article. What would you like to do?",
        '<button onclick="UpdateStatus3(id)" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });

    $(document).on('click', '.Modificar', function (event) {
        QuitarClaseErrorACombos();
        Limpiar();
    	$("#btUpdateCompany").show();
        $("#btnInsertCompany").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        // Limpiar();
            for (var i = 0; i < listComp.length; i++) {
            	if (listComp[i].Id == $(this).attr('value')) {
                   
                	var aux = listComp[i].Id;
                	var aux1 = listComp[i].Status.Id;
                	var aux2 = listComp[i].Name;
                	var aux3 = listComp[i].Type.Id;
                	var aux4 = listComp[i].Email;
                	var aux5 = listComp[i].Direction;
                	var aux6 = listComp[i].Telephone;
                	var aux7 = listComp[i].Logo;
                	$('#inId').val(listComp[i].Id);
                	llenarComboEstatus(listComp[i].Status.Id);
                	llenarComboType(listComp[i].Type.Id);
                	$('#inName').val(listComp[i].Name);
                	$('#inEmail').val(listComp[i].Email);
                	$('#inDirection').val(listComp[i].Direction);
                	$('#inTelephone').val(listComp[i].Telephone);
                	//$('#inLogo').val(listComp[i].Logo);
                break;
                }
            }
        });
    });

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "abcdefghijklmnñopqrstuvwxyz&";
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

function soloAndNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789";
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
  //  $('#inStatus').removeClass("is-invalid");
    $('#inName').removeClass("is-invalid");
    $('#inName').val("");
    $('#inEmail').removeClass("is-invalid");
    $('#inEmail').val("");
    $('#inDirection').removeClass("is-invalid");
    $('#inDirection').val("");
    $('#inTelephone').removeClass("is-invalid");
    $('#inTelephone').val("");
    $('#inLogo').removeClass("is-invalid");
    $('#inLogo').val("");
    $('#inId').val(0);
    $("#lbCheck").hide();
    llenarComboEstatus(0);
    llenarComboType(0);
}

function QuitarClaseErrorACombos() {
    $('#select2-inStatus-container').removeClass("cbError");
    $('#select2-inType-container').removeClass("cbError");
    
}

function ValidarCamposVacios() {
    var aux = true;

    if ($('#inName').val() == "") {
    	$('#inName').addClass("is-invalid");
        aux = false;
    } else {
    	$('#inName').removeClass("is-invalid");
    }

    if ($('#inEmail').val() == "") {
    	$('#inEmail').addClass("is-invalid");
    	aux = false;
    } else {
    	$('#inEmail').removeClass("is-invalid");
    }

    if ($('#inDirection').val() == "") {
    	$('#inDirection').addClass("is-invalid");
    	aux = false;
    } else {
    	$('#inDirection').removeClass("is-invalid");
    }

    if ($('#inTelephone').val() == "") {
    	$('#inTelephone').addClass("is-invalid");
    	aux = false;
    } else {
    	$('#inTelephone').removeClass("is-invalid");
    }

    if ($('#inType').val() == 0 || $('#inType').val() == null) {
        $('#select2-inType-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inType-container').removeClass("cbError");
    }

    if ($('#inStatus').val() == 0 || $('#inStatus').val() == null) {
        $('#select2-inStatus-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inStatus-container').removeClass("cbError");
    }

    return aux;
}

function InsertCompany() {
    var compania = new Array();
    var formData = new FormData();
    if ($("#inLogo")[0].files.length > 0) {
        //alert($("#File1")[0].files[0].name);
        formData.append('Files', $("#inLogo")[0].files[0], $("#inLogo")[0].files[0].name);
    }
    formData.append('Name', $("#inName").val());
    formData.append('Email', $("#inEmail").val());
    formData.append('Direction', $("#inDirection").val());
    formData.append('Telephone', $("#inTelephone").val());
    formData.append('Status', $("#inStatus").val());
    formData.append('Type', $("#inType").val());

    compania.push(formData);
    $.ajax({
        type: 'POST',
        data: compania[0],
        url: urlInsertCompany,
        contentType: false,
        processData: false,
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                llenarTablaCompany();
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateCompany() {

    var compania = new Array();
    var formData = new FormData();
    if ($("#inLogo")[0].files.length > 0) {
        //alert($("#File1")[0].files[0].name);
        formData.append('Files', $("#inLogo")[0].files[0], $("#inLogo")[0].files[0].name);
    }

    formData.append('Id', $("#inId").val());
    formData.append('Name', $("#inName").val());
    formData.append('Email', $("#inEmail").val());
    formData.append('Direction', $("#inDirection").val());
    formData.append('Telephone', $("#inTelephone").val());
    formData.append('Status',  $("#inStatus").val() );
    formData.append('Type',  $("#inType").val());
        
    compania.push(formData);
    $.ajax({
        type: 'POST',
        data: compania[0],
        url: urlUpdateCompany,
        contentType: false,
        processData: false,
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaCompany();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function UpdateStatus3(id) {
    var status = 3;
    var datos =
    {
        modCom: {
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateStatusCompany,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaCompany();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

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
function GetStatus() {
    $.ajax({
    	url: urlGetAllStatus,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allEstatus = data;
                var option = '<option id="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    
                    if (allEstatus[i].Group.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }
                
                }
                $("#inStatus").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Status", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

var alltype = '';
function llenarComboType(pType) {

    var option = '<option value="0" id="">Select</option>';
	for (var i = 0; i < alltype.length; i++) {
		if (alltype[i].Group.Id == 1) {
			option += '<option value="' + alltype[i].Id + '">' + alltype[i].Description + '</option>';
		}
	}
	$("#inType").empty().append(option);
	if (pType != 0) {
		$("#inType").val(pType);
	}
}
function GetType() {
	$.ajax({
		url: urlGetAllType,
		cache: false,
		type: 'POST',
		async: false,
		contentType: "application/json; charset=utf-8",
		success: function (data) {
			if (data != null) {
				alltype = data;
				var option = '<option id="0">Select</option>';
				for (var i = 0; i < data.length; i++) {

					if (alltype[i].Group.Id == 1) {
						option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
					}

				}
				$("#inType").empty().append(option);

			}
			else {
				LlammarModal("Danger", "Error obtaining Type", " ");
			}
		},
		error: function (err) {
		    console.log(err);
			LlammarModal("Danger", "Error.", " ");
		}
	});
}

function llenarTablaCompany() {
    $.ajax({
        url: urlGetAllCompany,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                listComp = data;

                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);

                for (var i = 0; i < data.length; i++) {
                    var Botones = '<center><button data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" style="width: 25px;height: 25px; margin-left: 10px;" class="Modificar btn btn-primary btn-icon"><i class="fa fa-edit"></i></button>' +
                    '<button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button>' +
                        '</center>';
                    var Logo = '<img style="width: 80px;" src="' + data[i].Logo + '">';

                    t.row.add([
                        data[i].Id,
                        Logo,
                        data[i].Name,
                        data[i].Email,
                        data[i].Direction,
                        data[i].Telephone,
                        data[i].Status.Description,
                       Botones
                    ]).draw(false);
                }
                $("#modalInsert").modal("hide");
            }
            else {
                LlammarModal("Danger", "Error obtaining Type", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });

}