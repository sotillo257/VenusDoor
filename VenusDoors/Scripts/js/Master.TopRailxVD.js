$(document).ready(function () {
    GetAllTopRail();
    GetAllVerticalDivisions();
    GetAllStatus();

    $("#btnInsertTopVD").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertTopRailByVerticalDivisions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btUpdateTRVDivi").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateTopRailByVerticalDivisions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btUpdateTRVDivi").hide();
        $("#btnInsertTopVD").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btUpdateTRVDivi").show();
        $("#btnInsertTopVD").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listTRV.length; i++) {
            if (listTRV[i].Id == $(this).attr('value')) {
                var aux = listTRV[i].Id;
                var aux1 = listTRV[i].TopRail.Id;
                var aux2 = listTRV[i].VerticalDivisions.Id;
                var aux3 = listTRV[i].Status.Id;
                $('#intId').val(listTRV[i].Id);
                llenarComboTopRail(listTRV[i].TopRail.Id);
                llenarCombVerticalDivisions(listTRV[i].VerticalDivisions.Id);
                llenarComboEstatus(listTRV[i].Status.Id);
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
    $('#intId').val(0);
    $('#inTopRail').removeClass("is-invalid");
    llenarComboTopRail(0);

    $('#inVerticalDivisions').removeClass("is-invalid");
    llenarCombVerticalDivisions(0);

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

    if ($('#inVerticalDivisions').val() == 0) {
        $('#inVerticalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#inVerticalDivisions').removeClass("is-invalid");
    }

    return aux;
}

function InsertTopRailByVerticalDivisions() {

    var datos =
    {
        pTopRailByVerticalDivisions: {
            TopRail: { Id: $("#inTopRail").val() },
            VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
            Status: { Id: $("#inStatus").val() },

        }
    };
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
                llenarTablaGetAllTopRailxVerticalDivisions();
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
            Id: $("#intId").val(),
            TopRail: { Id: $("#inTopRail").val() },
            VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
            Status: { Id: $("#inStatus").val() },

        }
    };
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
                llenarTablaGetAllTopRailxVerticalDivisions();
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

var allVerticalDivisions = '';
function llenarCombVerticalDivisions(pVerticalDivisions) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allVerticalDivisions.length; i++) {
        if (allVerticalDivisions[i].Status.Id == 1) {
            option += '<option value="' + allVerticalDivisions[i].Id + '">' + allVerticalDivisions[i].Quantity + '</option>';
        }


    }
    $("#inVerticalDivisions").empty().append(option);
    if (pVerticalDivisions != 0) {
        $("#inVerticalDivisions").val(pVerticalDivisions);
    }
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
                allVerticalDivisions = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Quantity + '</option>';
                }
                $("#inVerticalDivisions").empty().append(option);

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

function llenarTablaGetAllTopRailxVerticalDivisions() {
    $.ajax({
        url: urlGetAllTopRailxVerticalDivisions,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                listTRV = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<tr role="row" class="odd">';
                    option += '<td tabindex="0"  >' + data[i].Id + '</td>';
                    option += '<td>' + data[i].TopRail.Description + '</td>';
                    option += '<td>' + data[i].VerticalDivisions.Quantity + '</td>';
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