$(document).ready(function () {
	GetAllDoorStyle();
	
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