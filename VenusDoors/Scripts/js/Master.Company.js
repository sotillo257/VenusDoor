﻿$(document).ready(function () {
	GetStatus();
	GetType();
    $("#btnInsertCompany").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertCompany();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
        
    });
    $("#btUpdateCompany").on("click", function () {
        if (ValidarCamposVacios()) {
        	UpdateCompany();
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
    });       
    $(document).on('click', '.Modificar', function (event) {
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
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz &";
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
    llenarComboEstatus(0);
    llenarComboType(0);
}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    if ($('#inType').val() == 0) {
    	$('#inType').addClass("is-invalid");
    	aux = false;
    } else {
    	$('#inType').removeClass("is-invalid");
    }

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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<tr role="row" class="odd">';
                    option += '<td tabindex="0"  >' + data[i].Id + '</td>';
                    option += ' <td><img style="width: 80px;" src="' + data[i].Logo + '"></td>';
                    option += '<td>'+data[i].Name+'</td>';
                    option += '<td>'+data[i].Email+'</td>';
                    option += '<td>'+data[i].Direction+'</td>';                                
                    option += '<td>'+data[i].Telephone+'</td>';  
                    option += '<td>'+data[i].Type.Description+'</td>'; 
                    option += '<td>'+data[i].Status.Description+'</td>'; 
                    option += '<td>';
                    option += '<center>';
                    option += '<a href="#" data-toggle="modal" data-target="#modalInsert" value="'+data[i].Id+'" class="Modificar btn btn-primary btn-icon">';
                    option += '<div><i class="fa fa-edit"></i></div></a></center></td></tr>';
                   
                }
                $("#datatable1 > tbody").empty().append(option);
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