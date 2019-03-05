$(document).ready(function () {
    GetAllUser();
    GetAllStatus();
    GetAllType();
    GetAllShippingAddress();

    $("#btInsertOrder").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertOrder();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateOrder").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateOrder();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateOrder").hide();
        $("#btInsertOrder").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateOrder").show();
        $("#btInsertOrder").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listORDER.length; i++) {
            if (listORDER[i].Id == $(this).attr('value')) {

                var aux = listORDER[i].Id;
                var aux1 = listORDER[i].User.Id;
                var aux2 = listORDER[i].Quantity;
                var aux3 = listORDER[i].Total;
                var aux4 = listORDER[i].Type.Id;
                var aux5 = listORDER[i].Status.Id;

                $('#inId').val(listORDER[i].Id);
                llenarComboUser(listORDER[i].User.Id);
                $('#inQuantity').val(listORDER[i].Quantity);
                $('#inTotal').val(listORDER[i].Total),
                $("#inObservations").val(listORDER[i].Observations),
                llenarComboType(listORDER[i].Type.Id);
                llenarComboEstatus(listORDER[i].Status.Id);
                llenarComboShip(listORDER[i].ShippingAddress.Id);
            }
        }
    });
});

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
    $('#inId').val(0);
    $('#inUser').removeClass("is-invalid");
    llenarComboUser(0);

    $('#inQuantity').removeClass("is-invalid");
    $('#inQuantity').val("");

    $('#inTotal').removeClass("is-invalid");
    $('#inTotal').val("");

    $('#inType').removeClass("is-invalid");
    llenarComboType(0);

    $('#inStatus').removeClass("is-invalid");
    llenarComboEstatus(0);

    $('#inObservations').removeClass("is-invalid");
    $('#inObservations').val("");

    $('#inShip').removeClass("is-invalid");
    llenarComboShip(0);

}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inUser').val() == 0) {
        $('#inUser').addClass("is-invalid");
        aux = false;
    } else {
        $('#inUser').removeClass("is-invalid");
    }

    if ($('#inQuantity').val() == "") {
        $('#inQuantity').addClass("is-invalid");
        aux = false;
    } else {
        $('#inQuantity').removeClass("is-invalid");
    }

    if ($('#inTotal').val() == "") {
        $('#inTotal').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTotal').removeClass("is-invalid");
    }

    if ($('#inType').val() == 0) {
        $('#inType').addClass("is-invalid");
        aux = false;
    } else {
        $('#inType').removeClass("is-invalid");
    }

    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    if ($('#inObservations').val() == "") {
        $('#inObservations').addClass("is-invalid");
        aux = false;
    } else {
        $('#inObservations').removeClass("is-invalid");
    }

    if ($('#inShip').val() == 0) {
        $('#inShip').addClass("is-invalid");
        aux = false;
    } else {
        $('#inShip').removeClass("is-invalid");
    }

    return aux;
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
            Observations: $("#inObservations").val(),
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
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                llenarTablaGetAllOrder()
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateOrder() {

    var datos =
    {
        uOrder: {
            Id: $("#inId").val(),
            User: { Id: $("#inUser").val() },
            Quantity: $("#inQuantity").val(),
            Total: parseFloat($("#inTotal").val()),
            ShippingAddress: { Id: $("#inShip").val() },
            Type: { Id: $("#inType").val() },
            Status: { Id: $("#inStatus").val() },
            Observations: $("#inObservations").val(),

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
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaGetAllOrder()
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function GetAllStatus() {
    $.ajax({
        url: urlGetAllStatus,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allEstatus = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inStatus").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}

var allEstatus = '';
function llenarComboEstatus(pStatus) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allEstatus.length; i++) {
        if (allEstatus[i].Group.Id == 2) {
            option += '<option value="' + allEstatus[i].Id + '">' + allEstatus[i].Description + '</option>';
        }


    }
    $("#inStatus").empty().append(option);
    if (pStatus != 0) {
        $("#inStatus").val(pStatus);
    }
}

function GetAllUser() {
    $.ajax({
        url: urlGetAllUser,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allUser = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Email + '</option>';
                }
                $("#inUser").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}

var allUser = '';
function llenarComboUser(pUser) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allUser.length; i++) {
        if (allUser[i].Status.Id == 1) {
            option += '<option value="' + allUser[i].Id + '">' + allUser[i].Email + '</option>';
        }


    }
    $("#inUser").empty().append(option);
    if (pUser != 0) {
        $("#inUser").val(pUser);
    }
}

function GetAllType() {
    $.ajax({
        url: urlGetAllType,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allType = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inType").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}

var allType = '';
function llenarComboType(pType) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allType.length; i++) {
        if (allType[i].Group.Id == 1) {
            option += '<option value="' + allType[i].Id + '">' + allType[i].Description + '</option>';
        }


    }
    $("#inType").empty().append(option);
    if (pType != 0) {
        $("#inType").val(pType);
    }
}

function GetAllShippingAddress() {
    $.ajax({
        url: urlGetAllShip,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allShip = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                }
                $("#inShip").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Shipping Address", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}

var allShip = '';
function llenarComboShip(pShip) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allShip.length; i++) {
        if (allShip[i].Status.Id == 1) {
            option += '<option value="' + allShip[i].Id + '">' + allShip[i].Name + '</option>';
        }


    }
    $("#inShip").empty().append(option);
    if (pShip != 0) {
        $("#inShip").val(pShip);
    }
}

function llenarTablaGetAllOrder() {
    $.ajax({
        url: urlGetAllOrder,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                listORDER = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<tr role="row" class="odd">';
                    option += '<td tabindex="0"  >' + data[i].Id + '</td>';
                    option += '<td>' + data[i].User.Id + '</td>';
                    option += '<td>' + data[i].Quantity + '</td>';
                    option += '<td>' + data[i].Type.Description + '</td>';
                    option += '<td>' + data[i].Status.Description + '</td>';
                    option += '<td>' + data[i].Total + '</td>';
                    option += '<td>';
                    option += '<center>';
                    option += '<a href="#" data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" class="Modificar btn btn-primary btn-icon">';
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