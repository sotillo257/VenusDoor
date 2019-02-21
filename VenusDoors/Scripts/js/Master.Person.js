$(document).ready(function () {
    GetAllStatus();

    $("#btnInsertPerson").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertPerson();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdatePerson").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdatePerson();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdatePerson").hide();
        $("#btnInsertPerson").show();
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdatePerson").show();
        $("#btnInsertPerson").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
        for (var i = 0; i < listPer.length; i++) {
            if (listPer[i].Id == $(this).attr('value')) {

                var aux = listPer[i].Id;
                var aux1 = listPer[i].Name;
                var aux2 = listPer[i].Lastname;
                var aux3 = listPer[i].Telephone;
                var aux4 = listPer[i].Direction;
                var aux5 = listPer[i].Status.Id;

                $('#inId').val(listPer[i].Id);
                $('#inName').val(listPer[i].Name);
                $('#inLastname').val(listPer[i].Lastname);
                $('#inTelephone').val(listPer[i].Telephone);
                $('#inDirection').val(listPer[i].Direction);
                llenarComboEstatus(listPer[i].Status.Id);
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
    $('#inName').removeClass("is-invalid");
    $('#inName').val("");

    $('#inLastname').removeClass("is-invalid");
    $('#inLastname').val("");

    $('#inTelephone').removeClass("is-invalid");
    $('#inTelephone').val("");

    $('#inDirection').removeClass("is-invalid");
    $('#inDirection').val("");

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

    if ($('#inName').val() == "") {
        $('#inName').addClass("is-invalid");
        aux = false;
    } else {
        $('#inName').removeClass("is-invalid");
    }

    if ($('#inLastname').val() == "") {
        $('#inLastname').addClass("is-invalid");
        aux = false;
    } else {
        $('#inLastname').removeClass("is-invalid");
    }

    if ($('#inTelephone').val() == "") {
        $('#inTelephone').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTelephone').removeClass("is-invalid");
    }

    if ($('#inDirection').val() == "") {
        $('#inDirection').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDirection').removeClass("is-invalid");
    }

    return aux;
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
function UpdatePerson() {

    var datos =
    {
        uPerson: {
            Id: $("#inId").val(),
            Name: $("#inName").val(),
            Lastname: $("#inLastname").val(),
            Telephone: $("#inTelephone").val(),
            Direction: $("#inDirection").val(),
            Status: { Id: $("#inStatus").val() },

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