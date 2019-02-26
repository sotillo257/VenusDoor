$(document).ready(function () {

    $("#btInsertGroup").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertGroup();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btUpdateGroup").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateGroup();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btUpdateGroup").hide();
        $("#btInsertGroup").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btUpdateGroup").show();
        $("#btInsertGroup").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar()
        for (var i = 0; i < listGroup.length; i++) {
            if (listGroup[i].Id == $(this).attr('value')) {
                var aux = listGroup[i].Id;
                var aux1 = listGroup[i].Description;
                $('#inId').val(listGroup[i].Id);
                $('#inDescription').val(listGroup[i].Description);
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
    $('#inDescription').removeClass("is-invalid");
    $('#inDescription').val("");

}
function ValidarCamposVacios() {
    var aux = true;
    if ($('#inDescription').val() == "") {
        $('#inDescription').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDescription').removeClass("is-invalid");
    }

    return aux;
}

function InsertGroup() {

    var datos =
    {
        pGroup: {
            Description: $("#inDescription").val(),

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
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                llenarTablaGroup();
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateGroup() {

    var datos =
    {
        uGroup: {
            Id: $("#inId").val(),
            Description: $("#inDescription").val(),

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
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaGroup();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function llenarTablaGroup() {
    $.ajax({
        url: urlGetAllGroup,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                listGroup = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<tr role="row" class="odd">';
                    option += '<td tabindex="0"  >' + data[i].Id + '</td>';
                    option += '<td>' + data[i].Description + '</td>';
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
