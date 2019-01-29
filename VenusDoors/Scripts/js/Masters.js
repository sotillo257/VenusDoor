$(document).ready(function () {
    $("#btInsert").on("click", function () {
        InsertBottomRail();
    });
    $("#btnModify").on("click", function () {
        UpdateBottomRail();
    });

    $("#btInsertDoors").on("click", function () {
        InsertDoors();
    });
    $("#btnUpdateDoors").on("click", function () {
        UpdateDoors();
    });

    $("#btnInsertDP").on("click", function () {
        InsertDoorsPrices();
    });
    $("#btUpdateDoorPrice").on("click", function () {
        UpdateDoorPrice();
    });

    $("#btnInsertDS").on("click", function () {
        InsertDoorStyle();
    });
    $("#btnUpdateDoorStyle").on("click", function () {
        UpdateDoorStyle();
    });

    $("#btInsertGroup").on("click", function () {
        InsertGroup();
    });
    $("#btUpdateGroup").on("click", function () {
        UpdateGroup();
    });

    $("#btInsertHingeDirection").on("click", function () {
        InserHingeDirection();
    });
    $("#btUpdateHingeDirec").on("click", function () {
        UpdateHingeDirection();
    });

    $("#btnInsertHP").on("click", function () {
        InserHingePositions();
    });
    $("#btnUpdateHingePosi").on("click", function () {
        UpdateHingePositions();
    });

    $("#btnInsertHD").on("click", function () {
        InserHorizontalDivisions();
    });
    $("#btnUpdateHorizontalDivi").on("click", function () {
        UpdateHorizontalDivisions();
    });

    $("#btnInsertIEP").on("click", function () {
        InsertInsideEdgeProfile();
    });
    $("#btUpdateInsideEdgeProfile").on("click", function () {
        UpdateInsideEdgeProfile();
    });

    $("#btInsertJoin").on("click", function () {
        InsertJoin();
    });
    $("#btUpdateJoin").on("click", function () {
        UpdateJoin();
    });

    $("#btInsertMaterial").on("click", function () {
        InsertMaterial();
    });
    $("#btnUpdateMaterial").on("click", function () {
        UpdateMaterial();
    });

    $("#InsertMaterialxBottomRail").on("click", function () {
        InsertMaterialxBottomRail();
    });
    $("#btnUpdateMaterialxBottom").on("click", function () {
        UpdateMaterialxBottomRail();
    });

    $("#btInsertOrder").on("click", function () {
        InsertOrder();
    });
    $("#btnUpdateOrder").on("click", function () {
        UpdateOrder();
    });

    $("#btnInserOutside").on("click", function () {
        InsertOutsideEdgeProfile();
    });
    $("#btnUpdateOutsideEdgePro").on("click", function () {
        UpdateOutsideEdgeProfile();
    });

    $("#btInsertPanel").on("click", function () {
        InsertPanel();
    });
    $("#btnUpdatePanel").on("click", function () {
        UpdatePanel();
    });

    $("#btInsertPanelMaterial").on("click", function () {
        InsertPanelMaterial();
    });
    $("#btnUpdatePanelMaterial").on("click", function () {
        UpdatePanelMaterial();
    });

    $("#btnInsertPerson").on("click", function () {
        InsertPerson();
    });
    $("#btnUpdatePerson").on("click", function () {
        UpdatePerson();
    });

    $("#btInsertPreparation").on("click", function () {
        InsertPreparation();
    });
    $("#btnUpdatePreparation").on("click", function () {
        UpdatePreparation();
    });

    $("#btnInsertStatus").on("click", function () {
        InsertStatus();
    });
    $("#btnUpdateStatus").on("click", function () {
        UpdateStatus();
    });

    $("#btnInsertTopRail").on("click", function () {
        InsertTopRail();
    });
    $("#btnUpdateTopRail").on("click", function () {
        UpdateTopRail();
    });

    $("#btInserTRHD").on("click", function () {
        InsertTopRailxHorizontalDivisions();
    });
    $("#btbUpdateTRHorizonatlDivi").on("click", function () {
        UpdateTopRailxHorizontalDivisions();
    });

    $("#btnInsertTopRJ").on("click", function () {
        InsertTopRailByJoin();
    });
    $("#btnUpdateTRJoin").on("click", function () {
        UpdateTopRailByJoin();
    });

    $("#btnInsertTopVD").on("click", function () {
        InsertTopRailByVerticalDivisions();
    });
    $("#btUpdateTRVDivi").on("click", function () {
        UpdateTopRailByVerticalDivisions();
    });

    $("#btInsertType").on("click", function () {
        InsertType();
    });
    $("#btnUpdateType").on("click", function () {
        UpdateType();
    });

    $("#btnInsertUser").on("click", function () {
        InsertUsuario();
    });
    $("#btUpdateUser").on("click", function () {
        UpdateUsuario();
    });

    $("#btInsertVerticalDivi").on("click", function () {
        InsertVerticalDivisions();
    });
    $("#btUpdateVerticalDivision").on("click", function () {
        UpdateVerticalDivisions();
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
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateBottomRail() {

    var datos =
    {
        uBottomRail: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateBottomRail,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
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
            Id: { Id: $("#inputID").val() },
            DoorStyle: { Id: $("#inDoorStyle").val() },
            Matarial: { Id: $("#inMatarial").val() },
            TopRail: { Id: $("#inTopRail").val() },
            BottomRail: { Id: $("#inBottomRail").val() },
            Preparation: { Id: $("#inPreparation").val() },
            Join: { Id: $("#inJoin").val() },
            OutsideEdgeProfile: { Id: $("#inOutsideEdgeProfile").val() },
            InsideEdgeProfile: { Id: $("#inInsideEdgeProfile").val() },
            VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
            HorizontalDivisions: { Id: $("#inHorizontalDivisions").val() },
            HingeDirection: { Id: $("#inHingeDirection").val() },
            HingePositions: { Id: 1},
            Panel: { Id: $("#inPanel").val() },
            PanelMaterial: { Id: $("#inPanelMaterial").val() },
            Drill: { Id: $("#inDrill").val() },
            Width: $("#inWidth").val(),
            Height: $("#inHeight").val(),
            Picture: $("#inPicture").val(),
            ProfilePicture: $("#inProfilePicture").val(),
            Status: { Id: $("#inStatus").val() },
            OpeningMeasurement: { Id: $("#inOpeningMeasurement").val() },
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
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateDoors() {

    var datos =
    {
        uDoors: {
            Id: { Id: $("#txtId").val() },
            DoorStyle: { Id: $("#cbDoorStyle").val() },
            Matarial: { Id: $("#cbMatarial").val() },
            TopRail: { Id: $("#cbTopRail").val() },
            BottomRail: { Id: $("#cbBottomRail").val() },
            Preparation: { Id: $("#cbPreparation").val() },
            Join: { Id: $("#cbJoin").val() },
            OutsideEdgeProfile: { Id: $("#cbOutsideEdgeProfile").val() },
            InsideEdgeProfile: { Id: $("#cbInsideEdgeProfile").val() },
            VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
            HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
            HingeDirection: { Id: $("#cbHingeDirection").val() },
            HingePositions: { Id: 1},
            Panel: { Id: $("#cbPanel").val() },
            PanelMaterial: { Id: $("#cbPanelMaterial").val() },
            Drill: { Id: $("#isDrill").val() },
            Width: $("#txtWidth").val(),
            Height: $("#txtHeight").val(),
            Picture: $("#txtPicture").val(),
            ProfilePicture: $("#txtProfilePicture").val(),
            Status: { Id: $("#IdStatus").val() },
            OpeningMeasurement: { Id: $("#isOpeningMeasurement").val() },
            CreatorUser: 6,
            ModificationUser: 6,
        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoors,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertDoorsPrices() {

    var datos =
    {
        pDoorsPrices: {
            DoorStyle: { Id: $("#inDoorStyle").val() },
            Material: { Id: $("#inMaterial").val() },
            RailThickness: { Id: $("#inRailThickness").val() },
            BasePrice: $("#inBasePrice").val(),
            AdditionalSFPrice: $("#inAdditionalSFPrice").val(),
            Status: { Id: $("#inStatus").val() },
            Picture: $("#inPicture").val(),
            ProfilePicture: $("#inProfilePicture").val(),
            VerticalBase1FLPrice: $("#inVerticalBase1FLPrice").val(),
            VerticalAdditionalInchPrice: $("#inVerticalAdditionalInchPrice").val(),
            HorizontalBase1FLPrice: $("#inHorizontalBase1FLPrice").val(),
            HorizontalAdditionalInchPrice: $("#inHorizontalAdditionalInchPrice").val(),
            CreatorUser: 6,
            ModificationUser: 6,
        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorsPrices,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateDoorPrice() {

    var datos =
    {
        uDoorPrice: {
            Id: { Id: $("#txtId").val() },
            DoorStyle: { Id: $("#cbDoorStyle").val() },
            Matarial: { Id: $("#cbMatarial").val() },
            RailThickness: { Id: $("#cbRailThickness").val() },
            BasePrice: $("#txtBasePrice").val(),
            AdditinalSFPrice: $("#txtAdditinalSFPrice").val(),
            Status: { Id: $("#IdStatus").val() },
            Picture: $("#txtPicture").val(),
            ProfilePicture: $("#txtProfilePicture").val(),
            VerticalBase1FLPrice: $("#txtVerticalBase1FLPrice").val(),
            HorizontalBase1FLPrice: $("#txtHorizontalBase1FLPrice").val(),
            HorizontalAdditionalInchPrice: $("#txtHorizontalAdditionalInchPrice").val(),
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoorPrice,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
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
            Status: { Id: $("#inStatus").val() },
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
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateDoorStyle() {

    var datos =
    {
        uDoorStyle: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoorStyle,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertGroup() {

    var datos =
    {
        pGroup: {
            Description: $("#inDescription").val(),
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertGroup,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateGroup() {

    var datos =
    {
        uGroup: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateGroup,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InserHingeDirection() {

    var datos =
    {
        pHingeDirection: {
            Direction: $("#inDirection").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInserHingeDirection,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateHingeDirection() {

    var datos =
    {
        uHingeDirection: {
            Id: { Id: $("#txtId").val() },
            Direction: $("#txtDirection").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateHingeDirection,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InserHingePositions() {

    var datos =
    {
        pHingePositions: {
            Position: $("#inPosition").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInserHingePositions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateHingePositions() {

    var datos =
    {
        uHingePositions: {
            Id: { Id: $("#txtId").val() },
            Position: $("#txtPosition").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateHingePositions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InserHorizontalDivisions() {

    var datos =
    {
        pHorizontalDivisions: {
            Quantity: $("#inQuantity").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInserHorizontalDivisions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateHorizontalDivisions() {

    var datos =
    {
        uHorizontalDivisions: {
            Id: { Id: $("#txtId").val() },
            Quantity: $("#txtQuantity").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateHorizontalDivisions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertInsideEdgeProfile() {

    var datos =
    {
        pInsideEdgeProfile: {
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
        url: urlInsertInsideEdgeProfile,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateInsideEdgeProfile() {

    var datos =
    {
        pInsideEdgeProfile: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateInsideEdgeProfile,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertJoin() {

    var datos =
    {
        pJoin: {
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
        url: urlInsertJoin,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateJoin() {

    var datos =
    {
        uJoin: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateJoin,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertMaterial() {

    var datos =
    {
        pMaterial: {
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
        url: urlInsertMaterial,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateMaterial() {

    var datos =
    {
        uMaterial: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateMaterial,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertMaterialxBottomRail() {

    var datos =
    {
        pMaterialxBottomRail: {
            Matarial: { Id: $("#inMatarial").val() },
            BottomRail: { Id: $("#inBottomRail").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertMaterialxBottomRail,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateMaterialxBottomRail() {

    var datos =
    {
        uMaterialxBottomRail: {
            Id: { Id: $("#txtId").val() },
            Matarial: { Id: $("#cbMatarial").val() },
            BottomRail: { Id: $("#cbBottomRail").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateMaterialxBottomRail,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertOrder() {

    var datos =
    {
        pOrder: {
            User: { Id: $("#inUser").val() },
            Quantity: $("#inQuantity").val(),
            Total: $("#inTotal").val(),
            Type: { Id: $("#inType").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateOrder() {

    var datos =
    {
        uOrder: {
            Id: { Id: $("#txtId").val() },
            User: { Id: $("#cbUser").val() },
            Quantity: $("#txtQuantity").val(),
            Total: $("#txtTotal").val(),
            Type: { Id: $("#IdType").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertOutsideEdgeProfile() {

    var datos =
    {
        pOutsideEdgeProfiler: {
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
        url: urlInsertOutsideEdgeProfile,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateOutsideEdgeProfile() {

    var datos =
    {
        uOutsideEdgeProfiler: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOutsideEdgeProfile,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertPanel() {

    var datos =
    {
        pPanel: {
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
        url: urlInsertPanel,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdatePanel() {

    var datos =
    {
        uPanel: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdatePanel,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertPanelMaterial() {

    var datos =
    {
        pPanelMaterial: {
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
        url: urlInsertPanelMaterial,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdatePanelMaterial() {

    var datos =
    {
        uPanelMaterial: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdatePanelMaterial,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertPerson() {

    var datos =
    {
        pPerson: {
            Name: $("#inName").val(),
            Lastname: $("#inLastname").val(),
            Telephone: $("#inTelephone").val(),
            Direction: $("#inDirection").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertPerson,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdatePerson() {

    var datos =
    {
        uPerson: {
            Id: { Id: $("#txtId").val() },
            Name: $("#txtName").val(),
            Lastname: $("#txtLastname").val(),
            Telephone: $("#txtTelephone").val(),
            Direction: $("#txtDirection").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdatePerson,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertPreparation() {

    var datos =
    {
        pPreparation: {
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
        url: urlInsertPreparation,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdatePreparation() {

    var datos =
    {
        uPreparation: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdatePreparation,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertStatus() {

    var datos =
    {
        pStatus: {
            Description: $("#inDescription").val(),
            Group: { Id: $("#inGroup").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateStatus() {

    var datos =
    {
        uStatus: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Group: { Id: $("#IdGroup").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertTopRail() {

    var datos =
    {
        pTopRail: {
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
        url: urlInsertTopRail,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateTopRail() {

    var datos =
    {
        uTopRail: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateTopRail,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertTopRailxHorizontalDivisions() {

    var datos =
    {
        pTopRailByHorizontalDivisions: {
            TopRail: { Id: $("#inTopRail").val() },
            HorizontalDivisions: { Id: $("#inHorizontalDivisions").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertTopRailxHorizontalDivisions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateTopRailxHorizontalDivisions() {

    var datos =
    {
        uTopRailByHorizontalDivisions: {
            Id: { Id: $("#txtId").val() },
            TopRail: { Id: $("#cbTopRail").val() },
            HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateTopRailxHorizontalDivisions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertTopRailByJoin() {

    var datos =
    {
        pTopRailByHorizontalDivisions: {
            TopRail: { Id: $("#inTopRail").val() },
            Join: { Id: $("#inJoin").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertTopRailByJoin,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateTopRailByJoin() {

    var datos =
    {
        uTopRailByHorizontalDivisions: {
            Id: { Id: $("#txtId").val() },
            TopRail: { Id: $("#cbTopRail").val() },
            Join: { Id: $("#cbJoin").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateTopRailByJoin,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertTopRailByVerticalDivisions() {

    var datos =
    {
        pTopRailByHorizontalDivisions: {
            TopRail: { Id: $("#inTopRail").val() },
            VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertTopRailByVerticalDivisions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateTopRailByVerticalDivisions() {

    var datos =
    {
        uTopRailByHorizontalDivisions: {
            Id: { Id: $("#txtId").val() },
            TopRail: { Id: $("#cbTopRail").val() },
            VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateTopRailByVerticalDivisions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertType() {

    var datos =
    {
        pTypes: {
            Description: $("#inDescription").val(),
            Group: { Id: $("#inGroup").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertType,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateType() {

    var datos =
    {
        uTypes: {
            Id: { Id: $("#txtId").val() },
            Description: $("#txtDescription").val(),
            Group: { Id: $("#IdGroup").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateType,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertUsuario() {

    var datos =
    {
        pUsuario: {
            Email: $("#inEmail").val(),
            Password: $("#inPassword").val(),
            Type: { Id: $("#inType").val() },
            Person: { Id: $("#inPerson").val() },
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertUsuario,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateUsuario() {

    var datos =
    {
        uUsuario: {
            Id: { Id: $("#txtId").val() },
            Email: $("#txtEmail").val(),
            Password: $("#txtPassword").val(),
            Type: { Id: $("#IdType").val() },
            Person: { Id: $("#cbPerson").val() },
            Status: { Id: $("#IdStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateUsuario,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

function InsertVerticalDivisions() {

    var datos =
    {
        pVerticalDivisions: {
            Quantity: $("#inQuantity").val(),
            Status: { Id: $("#inStatus").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertInsertVerticalDivisions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}
function UpdateVerticalDivisions() {

    var datos =
    {
        uVerticalDivisions: {
            Id: { Id: $("#txtId").val() },
            Quantity: $("#IdStatus").val(),
            Status: { Id: $("#txtQuanty").val() },
            CreatorUser: 6,
            ModificationUser: 6,

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateVerticalDivisions,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}

$(document).ready(function () {
    $(".txtHeight").keyup(function (e) {
        var Height = parseFloat($(this).val())
        if ($(this).val() <= 36) {
            if (e.keyup = true) {
                var ip1 = 3.5;
                var ip2 = Height - 3.5;
                $('#HingePositions1').val(ip1);
                $('#HingePositions2').val(ip2);
                $('#HingePositions3').val("No hinge");
                $('#HingePositions4').val("No hinge");
                $('#HingePositions5').val("No hinge");
            }
        }
        else if ($(this).val() <= 60) {
            if (e.keyup = true) {
                var ip1 = 3.5;
                var ip2 = Height / 2;
                var ip3 = Height - 3.5;
                $('#HingePositions1').val(ip1);
                $('#HingePositions2').val(ip2);
                $('#HingePositions3').val(ip3);
                $('#HingePositions4').val("No hinge");
                $('#HingePositions5').val("No hinge");
            }
        } else if ($(this).val() <= 80) {
            if (e.keyup = true) {
                var ip1 = 3.5;
                var ip2 = ((Height - 7) / 3) + 3.5;
                var ip3 = Height - (((Height - 7) / 3) + 3.5);
                var ip4 = Height - 3.5;
                $('#HingePositions1').val(ip1);
                $('#HingePositions2').val(ip2);
                $('#HingePositions3').val(ip3);
                $('#HingePositions4').val(ip4);
                $('#HingePositions5').val("No hinge");
            }
        } else if ($(this).val() > 80) {
            if (e.keyup = true) {
                var ip1 = 3.5;
                var ip2 = 3.5 + (((Height / 2) - 3.5) / 2);
                var ip3 = Height / 2;
                var ip4 = Height - (3.5 + (((Height / 2) - 3.5) / 2));
                var ip5 = Height - 3.5;
                $('#HingePositions1').val(ip1);
                $('#HingePositions2').val(ip2);
                $('#HingePositions3').val(ip3);
                $('#HingePositions4').val(ip4);
                $('#HingePositions5').val(ip5);
            }
        }
        else {

        }
    });
});
