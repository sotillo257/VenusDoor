$(document).ready(function () {
    $("#btInsert").on("click", function (event) {
        InsertBottomRail();
    });
    $("#btInsertDoors").on("click", function (event) {
        InsertDoors();
    });
    $("#btnInsertBP").on("click", function (event) {
        InsertDoorPrice();
    });
    $("#btnInsertDS").on("click", function (event) {
        InsertDoorStyle();
    });
}); 

function InsertBottomRail() {

    var datos =
    {
        pBottomRail: {

            Description: $("#inDescription").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,




        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertBottomRail,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $("#modalError").modal('toggle');
            } else {
                $("#modalCongra").modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertDoors() {

    var datos =
    {
        pDoors: {

            DoorStyle: { Id: $("#inDoorStyle").val() },
            Material: { Id: $("#inMatarial").val() },
            TopRail: { Id: $("#inTopRail").val() },
            BottomRail: { Id: $("#inBottomRail").val() },
            Preparation: { Id: $("#inPreparation").val() },
            Join: { Id: $("#inJoin").val() },
            OutsideEdgeProfile: { Id: $("#inOutsideEdgeProfile").val() },
            InsideEdgeProfile: { Id: $("#inInsideEdgeProfile").val() },
            VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
            HorizontalDivisions: { Id: $("#inHorizontalDivisions").val() },
            HingeDirection: { Id: $("#inHingeDirection").val() },
            HingePositions: { Id: $("#inHingePositions").val() },
            Panel: { Id: $("#inPanel").val() },
            PanelMaterial: { Id: $("#inPanelMaterial").val() },
            Drill: { Id: $("#inDrill").val() },
            Width: $("#inWidth").val(),
            Height: $("#inHeight").val(),
            OpeningMeasurement: { Id: $("#inOpeningMeasurement").val() },
            Picture: $("#inPicture").val(),
            ProfilePicture: $("#inProfilePicture").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,




        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoors,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $("#modalError").modal('toggle');
            } else {
                $("#modalCongra").modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertDoorPrice() {

    var datos =
    {
        pDoorPrice: {

            DoorStyle: { Id: $("#inDoorStyle").val() },
            Material: { Id: $("#inMatarial").val() },
            TopRail: { Id: $("#inTopRail").val() },
            BasePrice: $("#inBasePrice").val(),
            AdditinalSFPrice: $("#inAdditinalSFPrice").val(),
            Status: { Id: $("#inStatus").val() },
            VerticalBase1FLPrice: $("#inVerticalBase1FLPrice").val(),
            HorizontalBase1FLPrice: $("#inHorizontalBase1FLPrice").val(),
            Picture: $("#inPicture").val(),
            ProfilePicture: $("#inProfilePicture").val(),
            HorizontalAdditionalInchPrice: $("#inHorizontalAdditionalInchPrice").val(),
            CreatorUser: 6,
            ModificationUser: 6,




        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorPrice,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $("#modalError").modal('toggle');
            } else {
                $("#modalCongra").modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertDoorStyle() {

    var datos =
    {
        pDoorStyle: {

            
            Description: $("#inDescription").val(),
            CreatorUser: 6,
            ModificationUser: 6,




        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorStyle,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $("#modalError").modal('toggle');
            } else {
                $("#modalCongra").modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}