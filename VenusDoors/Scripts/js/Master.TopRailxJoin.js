$(document).ready(function () {
    GetAllTopRail();
    GetAllStatus();
    GetAllJoin();

    $("#btnInsertTopRJ").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertTopRailByJoin();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateTRJoin").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateTopRailByJoin();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateTRJoin").hide();
        $("#btnInsertTopRJ").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateTRJoin").show();
        $("#btnInsertTopRJ").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listTRJ.length; i++) {
            if (listTRJ[i].Id == $(this).attr('value')) {
                var aux = listTRJ[i].Id;
                var aux1 = listTRJ[i].TopRail.Id;
                var aux2 = listTRJ[i].Join.Id;
                var aux3 = listTRJ[i].Status.Id;
                $('#inId').val(listTRJ[i].Id);
                llenarComboTopRail(listTRJ[i].TopRail.Id);
                llenarComboJoin(listTRJ[i].Join.Id);
                llenarComboEstatus(listTRJ[i].Status.Id);
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
    $('#inTopRail').removeClass("is-invalid");
    llenarComboTopRail(0);

    $('#inJoin').removeClass("is-invalid");
    llenarComboJoin(0);

    $('#inStatus').removeClass("is-invalid");
    llenarComboEstatus(0);

}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    if ($('#inTopRail').val() == 0) {
        $('#inTopRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTopRail').removeClass("is-invalid");
    }

    if ($('#inJoin').val() == 0) {
        $('#inJoin').addClass("is-invalid");
        aux = false;
    } else {
        $('#inJoin').removeClass("is-invalid");
    }

    return aux;
}

function InsertTopRailByJoin() {

    var datos =
    {
        pTopRailByJoin: {
            TopRail: { Id: $("#inTopRail").val() },
            Join: { Id: $("#inJoin").val() },
            Status: { Id: $("#inStatus").val() },

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
                llenarTablaGetAllTopRailxJoin();
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
            Id: $("#inId").val(),
            TopRail: { Id: $("#inTopRail").val() },
            Join: { Id: $("#inJoin").val() },
            Status: { Id: $("#inStatus").val() },

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
                llenarTablaGetAllTopRailxJoin();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

var allTopRail = '';
function llenarComboTopRail(pTopRail) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allTopRail.length; i++) {
        if (allTopRail[i].Status.Id == 1) {
            option += '<option value="' + allTopRail[i].Id + '">' + allTopRail[i].Description + '</option>';
        }


    }
    $("#inTopRail").empty().append(option);
    if (pTopRail != 0) {
        $("#inTopRail").val(pTopRail);
    }
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
                allTopRail = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inTopRail").empty().append(option);

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

var allJoin = '';
function llenarComboJoin(pJoin) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allJoin.length; i++) {
        if (allJoin[i].Status.Id == 1) {
            option += '<option value="' + allJoin[i].Id + '">' + allJoin[i].Description + '</option>';
        }


    }
    $("#inJoin").empty().append(option);
    if (pJoin != 0) {
        $("#inJoin").val(pJoin);
    }
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
                allJoin = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                }
                $("#inJoin").empty().append(option);

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

function llenarTablaGetAllTopRailxJoin() {
    $.ajax({
        url: urlGetAllTopRailxJoin,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                listTRJ = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<tr role="row" class="odd">';
                    option += '<td tabindex="0"  >' + data[i].Id + '</td>';
                    option += '<td>' + data[i].TopRail.Description + '</td>';
                    option += '<td>' + data[i].Join.Description + '</td>';
                    option += '<td>' + data[i].Status.Description + '</td>';
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