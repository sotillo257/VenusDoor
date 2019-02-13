$(document).ready(function () {

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
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < listPer.length; i++) {
            if (listPer[i].Id == $(this).attr('value')) {

                var aux = listPer[i].Id;
                var aux1 = listPer[i].Name;
                var aux2 = listPer[i].Lastname;
                var aux3 = listPer[i].Telephone;
                var aux4 = listPer[i].Direction;
                var aux5 = listPer[i].Status.Id;

                $('#txtId').val(listPer[i].Id);
                $('#txtName').val(listPer[i].Name);
                $('#txtLastname').val(listPer[i].Lastname);
                $('#txtTelephone').val(listPer[i].Telephone);
                $('#txtDirection').val(listPer[i].Direction);
                $('#IdStatus').val(listPer[i].Status.Id);
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
    $('#inName').removeClass("is-invalid");
    $('#inName').val("");

    $('#inLastname').removeClass("is-invalid");
    $('#inLastname').val("");

    $('#inTelephone').removeClass("is-invalid");
    $('#inTelephone').val("");

    $('#inDirection').removeClass("is-invalid");
    $('#inDirection').val("");

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);


    $('#txtName').removeClass("is-invalid");
    $('#txtName').val("");

    $('#txtLastname').removeClass("is-invalid");
    $('#txtLastname').val("");

    $('#txtTelephone').removeClass("is-invalid");
    $('#txtTelephone').val("");

    $('#txtDirection').removeClass("is-invalid");
    $('#txtDirection').val("");

    $('#IdStatus').removeClass("is-invalid");
    $('#IdStatus').val(0);

}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    if ($('#IdStatus').val() == 0) {
        $('#IdStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#IdStatus').removeClass("is-invalid");
    }

    if ($('#inName').val() == "") {
        $('#inName').addClass("is-invalid");
        aux = false;
    } else {
        $('#inName').removeClass("is-invalid");
    }

    if ($('#txtName').val() == "") {
        $('#txtName').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtName').removeClass("is-invalid");
    }

    if ($('#inLastname').val() == "") {
        $('#inLastname').addClass("is-invalid");
        aux = false;
    } else {
        $('#inLastname').removeClass("is-invalid");
    }

    if ($('#txtLastname').val() == "") {
        $('#txtLastname').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtLastname').removeClass("is-invalid");
    }


    if ($('#inTelephone').val() == "") {
        $('#inTelephone').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTelephone').removeClass("is-invalid");
    }

    if ($('#txtTelephone').val() == "") {
        $('#txtTelephone').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtTelephone').removeClass("is-invalid");
    }

    if ($('#inDirection').val() == "") {
        $('#inDirection').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDirection').removeClass("is-invalid");
    }

    if ($('#txtDirection').val() == "") {
        $('#txtDirection').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtDirection').removeClass("is-invalid");
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
            Id: $("#txtId").val(),
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