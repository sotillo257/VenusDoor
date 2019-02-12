$(document).ready(function () {

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
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateStatus() {

    var datos =
    {
        uStatus: {
            Id: $("#txtId").val(),
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
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
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
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateTopRail() {

    var datos =
    {
        uTopRail: {
            Id: $("#txtId").val(),
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
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
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
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateTopRailxHorizontalDivisions() {

    var datos =
    {
        uTopRailByHorizontalDivisions: {
            Id: $("#txtId").val(),
            TopRail: { Id: $("#cbTopRail").val() },
            HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
            Status: { Id: $("#mStatus").val() },
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
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function InsertTopRailByJoin() {

    var datos =
    {
        pTopRailByJoin: {
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
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateTopRailByJoin() {

    var datos =
    {
        uTopRailByJoin: {
            Id: $("#txtId").val(),
            TopRail: { Id: $("#cbTopRail").val() },
            Join: { Id: $("#cbJoin").val() },
            Status: { Id: $("#mStatus").val() },
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
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function InsertTopRailByVerticalDivisions() {

    var datos =
    {
        pTopRailByVerticalDivisions: {
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
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateTopRailByVerticalDivisions() {

    var datos =
    {
        uTopRailByVerticalDivisions: {
            Id: $("#txtId").val(),
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
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function InsertType() {

    var datos =
    {
        pTypes: {
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
        url: urlInsertType,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateType() {

    var datos =
    {
        uTypes: {
            Id: $("#txtId").val(),
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
        url: urlUpdateType,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
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
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateUsuario() {

    var datos =
    {
        uUsuario: {
            Id: $("#txtId").val(),
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
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
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
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateVerticalDivisions() {

    var datos =
    {
        uVerticalDivisions: {
            Id: $("#txtId").val(),
            Quantity: $("#txtQuanty").val(),
            Status: { Id: $("#IdStatus").val() },
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
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
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
