$(document).ready(function () {

    $("#btnInsertUser").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertUsuario();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btUpdateUser").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateUsuario();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        Limpiar();
        for (var i = 0; i < ListUsuario.length; i++) {
            if (ListUsuario[i].Id == $(this).attr('value')) {
                var aux = ListUsuario[i].Id;
                var aux1 = ListUsuario[i].Email;
                var aux2 = ListUsuario[i].Password;
                var aux3 = ListUsuario[i].Type.Id;
                var aux4 = ListUsuario[i].Person.Id;
                var aux5 = ListUsuario[i].Status.Id;
                $('#txtId').val(ListUsuario[i].Id);
                $('#txtEmail').val(ListUsuario[i].Email);
                $('#txtPassword').val(ListUsuario[i].Password);
                $('#IdType').val(ListUsuario[i].Type.Id);
                $('#cbPerson').val(ListUsuario[i].Person.Id);
                $('#IdStatus').val(ListUsuario[i].Status.Id);
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
    $('#inEmail').removeClass("is-invalid");
    $('#inEmail').val(" ");

    $('#txtEmail').removeClass("is-invalid");
    $('#txtEmail').val("");

    $('#inPassword').removeClass("is-invalid");
    $('#inPassword').val(" ");

    $('#txtPassword').removeClass("is-invalid");
    $('#txtPassword').val("");

    $('#inType').removeClass("is-invalid");
    $('#inType').val(0);

    $('#IdType').removeClass("is-invalid");
    $('#IdType').val(0);

    $('#inPerson').removeClass("is-invalid");
    $('#inPerson').val(0);

    $('#cbPerson').removeClass("is-invalid");
    $('#cbPerson').val(0);

    $('#inStatus').removeClass("is-invalid");
    $('#inStatus').val(0);

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

    if ($('#inEmail').val() == " ") {
        $('#inEmail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inEmail').removeClass("is-invalid");
    }

    if ($('#txtEmail').val() == " ") {
        $('#txtEmail').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtEmail').removeClass("is-invalid");
    }


    if ($('#inPassword').val() == " ") {
        $('#inPassword').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPassword').removeClass("is-invalid");
    }

    if ($('#txtPassword').val() == "") {
        $('#txtPassword').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtPassword').removeClass("is-invalid");
    }


    if ($('#inType').val() == 0) {
        $('#inType').addClass("is-invalid");
        aux = false;
    } else {
        $('#inType').removeClass("is-invalid");
    }

    if ($('#IdType').val() == 0) {
        $('#IdType').addClass("is-invalid");
        aux = false;
    } else {
        $('#IdType').removeClass("is-invalid");
    }


    if ($('#inPerson').val() == 0) {
        $('#inPerson').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPerson').removeClass("is-invalid");
    }

    if ($('#cbPerson').val() == 0) {
        $('#cbPerson').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbPerson').removeClass("is-invalid");
    }

    return aux;
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