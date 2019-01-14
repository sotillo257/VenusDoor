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
	GetAllHingePositions();

	$("#btConfirm").on("click", function () {
	    InsertDoorsxUser();
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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';


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

                    option += '<option value="' + data[i].Id + '">' + data[i].Position + '</option>';


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
                
                var datos =
                    {
                        pDoorsxUser: {
                            User: { Id: 6 },
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
                            isDrill: $("#cbisDrill").val(),
                            HingeDirection: { Id: $("#cbHingeDirection").val() },
                            HingePositions: { Id: $("#cbHingePositions").val() },                            
                            Width: $("#iptWidth").val(),
                            Height: $("#iptHeight").val(),
                            Quantity: $("#iptQuantity").val(),
                            Picture: 'PruebaPicture',
                            ProfilePicture: 'PruebaPP',
                            CreatorUser: 6,
                            ModificationUser: 6,
                            


                           
                        }
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
                            alert("yes");
                        } else {
                            alert("no");
                        }
                    },
                    error: function (err) {
                        alert("error");
                    },
              
                });
}

