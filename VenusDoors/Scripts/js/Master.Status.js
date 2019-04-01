$(document).ready(function () {
    GetAllGroup();

    $("#btnInsertStatus").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertStatus();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateStatus").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateStatus();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateStatus").hide();
        $("#btnInsertStatus").show();
        QuitarClaseErrorACombos();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateStatus").show();
        $("#btnInsertStatus").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        QuitarClaseErrorACombos();
        Limpiar();
        for (var i = 0; i < listSTS.length; i++) {
            if (listSTS[i].Id == $(this).attr('value')) {

                var aux = listSTS[i].Id;
                var aux1 = listSTS[i].Group.Id;
                var aux2 = listSTS[i].Description;

                $('#inId').val(listSTS[i].Id);
                llenarComboGroup(listSTS[i].Group.Id);
                $('#inDescription').val(listSTS[i].Description);
            }
        }
    });
});

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "abcdefghijklmnñopqrstuvwxyz &";
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

    $('#inGroup').removeClass("is-invalid");
    llenarComboGroup(0);

}

function QuitarClaseErrorACombos() {
    $('#select2-inGroup-container').removeClass("cbError");
}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inGroup').val() == 0 || $('#inGroup').val() == null) {
        $('#select2-inGroup-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inGroup-container').removeClass("cbError");
    }

    if ($('#inDescription').val() == "") {
        $('#inDescription').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDescription').removeClass("is-invalid");
    }

    return aux;
}

function InsertStatus() {

    var datos =
    {
        pStatus: {
            Description: $("#inDescription").val(),
            Group: { Id: $("#inGroup").val() },

        }
    };
    
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
                llenarTablaGetAllStatus();
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
            Id: $("#inId").val(),
            Description: $("#inDescription").val(),
            Group: { Id: $("#inGroup").val() },

        }
    };
    
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
                llenarTablaGetAllStatus();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

var allGroup = '';
function llenarComboGroup(pGroup) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allGroup.length; i++) {
        option += '<option value="' + allGroup[i].Id + '">' + allGroup[i].Description + '</option>';
        
    }
    $("#inGroup").empty().append(option);
    if (pGroup != 0) {
        $("#inGroup").val(pGroup);
    }
}
function GetAllGroup() {
    $.ajax({
        url: urlGetAllGroup,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allGroup = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inGroup").empty().append(option);

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

function llenarTablaGetAllStatus() {
    $.ajax({
        url: urlGetAllStatus,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                listSTS = data;
                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);

                for (var i = 0; i < data.length; i++) {
                    var Botones = '<center><button data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" style="width: 25px;height: 25px; margin-left: 10px;" class="Modificar Cursor btn btn-primary btn-icon"><i class="fa fa-edit"></i></button>' +
                    '</center>';

                    t.row.add([
                        data[i].Id,
                        data[i].Description,
                        data[i].Group.Description,
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