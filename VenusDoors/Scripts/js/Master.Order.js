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

    $(document).on('click', '.Remove', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Warning!", "You are about to delete an article. What would you like to do?",
        '<button onclick="UpdateStatus3(id)" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });

    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateOrder").hide();
        $("#btInsertOrder").show();
        QuitarClaseErrorACombos();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateOrder").show();
        $("#btInsertOrder").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        QuitarClaseErrorACombos();
        Limpiar();
        for (var i = 0; i < listORDER.length; i++) {
            if (listORDER[i].Id == $(this).attr('value')) {

                var aux = listORDER[i].Id;
                var aux1 = listORDER[i].User.Id;
                var aux2 = listORDER[i].Quantity;
                var aux3 = listORDER[i].Observations;
                var aux4 = listORDER[i].ShippingAddress;
                var aux5 = listORDER[i].Total;
                var aux6 = listORDER[i].Type.Id;
                var aux7 = listORDER[i].Status.Id;

                $('#inId').val(listORDER[i].Id);
                llenarComboUser(listORDER[i].User.Id);
                $('#inQuantity').val(listORDER[i].Quantity);
                $('#inObservations').val(listORDER[i].Observations);
                $('#inTotal').val(listORDER[i].Total);
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

function Limpiar() {
    $('#inId').val(0);
    $('#inUser').removeClass("is-invalid");
    llenarComboUser(0);

    $('#inQuantity').removeClass("is-invalid");
    $('#inQuantity').val("");

    $('#inObservations').removeClass("is-invalid");
    $('#inObservations').val("");

    $('#inShippingAddress').removeClass("is-invalid");
    $('#inShippingAddress').val("");

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

function QuitarClaseErrorACombos() {
    $('#select2-inStatus-container').removeClass("cbError");
    $('#select2-inShip-container').removeClass("cbError");
    $('#select2-inType-container').removeClass("cbError");
    $('#select2-inUser-container').removeClass("cbError");
}

function ValidarCamposVacios() {
    var aux = true;

    if ($('#inUser').val() == 0 || $('#inUser').val() == null) {
        $('#select2-inUser-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inUser-container').removeClass("cbError");
    }

    if ($('#inQuantity').val() == "") {
        $('#inQuantity').addClass("is-invalid");
        aux = false;
    } else {
        $('#inQuantity').removeClass("is-invalid");
    }

    if ($('#inShip').val() == 0 || $('#inShip').val() == null) {
        $('#select2-inShip-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inShip-container').removeClass("cbError");
    }

    if ($('#inTotal').val() == "") {
        $('#inTotal').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTotal').removeClass("is-invalid");
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

    if ($('#inObservations').val() == "") {
        $('#inObservations').addClass("is-invalid");
        aux = false;
    } else {
        $('#inObservations').removeClass("is-invalid");
    }

    return aux;
}

function InsertOrder() {

    var datos =
    {
        pOrder: {
            User: { Id: $("#inUser").val() },
            Quantity: $("#inQuantity").val(),
            Observations: $("#inObservations").val(),
            ShippingAddress: $("#inShippingAddress").val(),
            Total: $("#inTotal").val(),
            Type: { Id: $("#inType").val() },
            Status: { Id: $("#inStatus").val() },
            Observations: $("#inObservations").val(),
        }
    };
    
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
            Observations: $("#inObservations").val(),
            ShippingAddress: $("#inShip").val(),
            Total: $("#inTotal").val(),
            Type: { Id: $("#inType").val() },
            Status: { Id: $("#inStatus").val() },
            Observations: $("#inObservations").val(),

        }
    };
    
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

function UpdateStatus3(id) {
    var status = 3;
    var datos =
    {
        modOrder: {
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateStatusOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaGetAllOrder();
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
                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);

                for (var i = 0; i < data.length; i++) {
                    var Botones = '<center><button data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" style="width: 25px;height: 25px; margin-left: 10px;" class="Modificar btn btn-primary btn-icon"><i class="fa fa-edit"></i></button>' +
                    '<button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button>' +
                        '</center>';

                    t.row.add([
                        data[i].Id,
                        data[i].User.Id,
                        data[i].Quantity,
                        data[i].ShippingAddress.Name,
                        data[i].Type.Description,
                        data[i].Status.Description,
                        data[i].Total.toString().replace(',', '.'),
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