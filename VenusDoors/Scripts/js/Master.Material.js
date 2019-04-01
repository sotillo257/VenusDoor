$(document).ready(function () {
    GetAllStatus();

    $("#btInsertMaterial").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertMaterial();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateMaterial").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateMaterial();
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
        $("#btnUpdateMaterial").hide();
        $("#btInsertMaterial").show();
        QuitarClaseErrorACombos();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateMaterial").show();
        $("#btInsertMaterial").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        QuitarClaseErrorACombos();
        Limpiar();
            for (var i = 0; i < listMaterial.length; i++) {
                if (listMaterial[i].Id == $(this).attr('value')) {
                    var aux = listMaterial[i].Id;
                    var aux1 = listMaterial[i].Status.Id;
                    var aux2 = listMaterial[i].Description;
                    var aux3 = listMaterial[i].PriceFlatPanel;
                    var aux4 = listMaterial[i].PriceRaisedPanel;
                    $('#inId').val(listMaterial[i].Id);
                    llenarComboEstatus(listMaterial[i].Status.Id);
                    $('#inDescription').val(listMaterial[i].Description);
                    $('#inPriceFlatPanel').val(listMaterial[i].PriceFlatPanel);
                    $('#inPriceRaisedPanel').val(listMaterial[i].PriceRaisedPanel);
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
    $('#inId').val(0);
    $('#inDescription').removeClass("is-invalid");
    $('#inDescription').val("");

    $('#inPriceFlatPanel').removeClass("is-invalid");
    $('#inPriceFlatPanel').val("");

    $('#inPriceRaisedPanel').removeClass("is-invalid");
    $('#inPriceRaisedPanel').val("");

    $('#inStatus').removeClass("is-invalid");
    llenarComboEstatus(0);
}

function QuitarClaseErrorACombos() {
    $('#select2-inStatus-container').removeClass("cbError");
}

function ValidarCamposVacios() {
    var aux = true;

    if ($('#inDescription').val() == "" || $('#inDescription').val() == null) {
        $('#inDescription').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDescription').removeClass("is-invalid");
    }

    if ($('#inPriceFlatPanel').val() == "") {
        $('#inPriceFlatPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPriceFlatPanel').removeClass("is-invalid");
    }

    if ($('#inPriceRaisedPanel').val() == "") {
        $('#inPriceRaisedPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPriceRaisedPanel').removeClass("is-invalid");
    }

    if ($('#inStatus').val() == 0 || $('#inStatus').val() == null) {
        $('#select2-inStatus-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inStatus-container').removeClass("cbError");
    }

    return aux;
}

function InsertMaterial() {

    var datos =
    {
        pMaterial: {
            Description: $("#inDescription").val(),
            PriceFlatPanel: parseFloat($("#inPriceFLatPanel").val()),
            PriceRaisedPanel: parseFloat($("#inPriceRaisedPanel").val()),
            Status: { Id: $("#inStatus").val() },

        }
    };
   
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertMaterial,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                llenarTablaurlGetAllMaterial();
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateMaterial() {

    var datos =
    {
        uMaterial: {
            Id: $("#inId").val(),
            Description: $("#inDescription").val(),
            PriceFlatPanel: parseFloat($("#inPriceFlatPanel").val()),
            PriceRaisedPanel: parseFloat($("#inPriceRaisedPanel").val()),
            Status: { Id: $("#inStatus").val() },

        }
    };
    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateMaterial,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaurlGetAllMaterial();
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
        modMaterial: {
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateStatusMaterial,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaurlGetAllMaterial();
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

function llenarTablaurlGetAllMaterial() {
    $.ajax({
        url: urlGetAllMaterial,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                listMaterial = data;
                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);

                for (var i = 0; i < data.length; i++) {
                    var Botones = '<center><button data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" style="width: 25px;height: 25px; margin-left: 10px;" class="Modificar Cursor btn btn-primary btn-icon"><i class="fa fa-edit"></i></button>' +
                    '<button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button>' +
                        '</center>';

                    t.row.add([
                        data[i].Id,
                        data[i].Description,
                        data[i].PriceFlatPanel,
                        data[i].PriceRaisedPanel,
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