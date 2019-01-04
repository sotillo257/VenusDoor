$(document).ready(function () {
	GetAllDoorStyle();
	GetAllInsideEdgeProfile();
	GetAllOutsideEdgeProfile();
	GetAllBottomRail();
	GetAllTopRail();
	GetAllPanel();
	GetAllPanelMaterial();
	GetAllVerticalDivisions();
	GetAllHorizontalDivisions();
	GetAllHingeDirection();
	GetAllHingePositions();
});

function ObtenerMaterial() {
    $.ajax({
        url: urlObtenerCargo,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            guardardatotable(data);
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

					option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

function GetAllHingePositions() {
    $.ajax({
        url: urlGetAllHingePositions,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var option = '';
                for (var i = 0; i < data.length; i++) {

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


                }
                $("#cbHingePositions").empty().append(option);

            }
            else {
                MensajeModal("Error al obtener Hinge Positions", 5);
            }
        },
        error: function (err) {
            MensajeModal(msgErrorinterno, 5);
        }
    });
}

function InsertDoorsxUser() {

    var descripcion = $('#txtDescripcion').val();
    var tipoFeriado = $('#cmbTipoFeriado').val();
    var dia = $('#txtDia').val();
    var mes = $('#cmbMes').val();
    var anio = $('#cmbAnio').val();
    var lisSucursales = new Array();
    var sucur = '';

    if ($("#cmbTipoFeriado").val() != 7) {
        sucur = $("#e12").val().split(',');
        for (var j = 0; j < sucur.length; j++) {
            lisSucursales.push({ Cod_Dependencia: sucur[j] });
        }
    }
    if (true) {
        if (true) {

            var esDiaValido = ValidarDia();

            if (true) {
                
                var datos =
                    {
                        pDoorxUser: {
                            IdDoorStyle: $("#cbDoorStyle").val(),
                            IdInsideEdgeProfile: $("#cbInsideEdgeProfile").val(),
                            IdOutsideEDgeProfile: $("#cbOutsideEdgeProfile").val(),
                            IdBottomRail:  $("#cbBottomRail").val(),
                            IdTopRail: $("#cbTopRail").val(),
                            IdHingeDirection: $("#cbHingeDirection").val(),
                            IdHingePositions: $("#cbHingePositions").val(),
                            IdHorizontalDivisions:  $("#cbHorizontalDivisions").val(),
                            IdVerticalDivisions: $("#cbVerticalDivisions").val()
                        }
                    };

                $.ajax({
                    type: 'POST',
                    data: JSON.stringify(datos),
                    url: urlGuardarFestivo,
                    dataType: "json",
                    contentType: 'application/json; charset=utf-8',
                    success: function (result) {

                        //Validar data para ver si mostrar error al guardar o exito al guardar
                        if (result == true) {
                            ObtenerFestivo();
                            $("#myModal").modal('hide');
                            MensajeModal(msgAccionExitosa, 3);
                        } else {
                            MensajeModal(msgAccionErronea, 5);
                        }
                    },
                    error: function (err) {
                        MensajeModal(msgErrorInterno, 5);
                    },
                    complete: function (data) {
                        $("#btCancelar").prop("disabled", false);
                        $("#btAgregarFestivo").button('reset');
                    }
                });

            } else {
                MensajeModal(msgAlertaDiasFeriado, 4);
            }
        }
        else {
            MensajeModal("Verifique Los Campos en Rojo", 5);
        }
    }
    else {
        MensajeModal("Uno o mas campos vacios", 5);
    }
}

