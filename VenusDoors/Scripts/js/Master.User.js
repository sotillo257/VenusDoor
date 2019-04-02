$(document).ready(function () {
    GetAllStatus();
    GetAllType();
    GetAllPerson();
    GetAllCompany();

    $("#btnInsertUser").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertUser();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btUpdateUser").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateUser();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btUpdateUser").hide();
        $("#btnInsertUser").show(); 
        $("#Password").hide();
        $(".CampoDesha").hide();
        $(".CampoHa").show();
        $("#Password").show();
        QuitarClaseErrorACombos();
        Limpiar();
    });

    $(document).on('click', '.Remove', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Warning!", "You are about to delete an article. What would you like to do?",
        '<button onclick="UpdateStatus3(id)" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });

    $(document).on('click', '.Modificar', function (event) {
        $("#Password").show(); 
        $("#Password").hide();
        $(".CampoHa").hide();
        $(".CampoDesha").show();
        $("#btUpdateUser").show();
        $("#btnInsertUser").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        QuitarClaseErrorACombos();
        Limpiar();
        for (var i = 0; i < ListUsuario.length; i++) {
            if (ListUsuario[i].Id == $(this).attr('value')) {
                var aux = ListUsuario[i].Id;
                var aux1 = ListUsuario[i].Email;
                var aux2 = ListUsuario[i].Password;
                var aux3 = ListUsuario[i].Type.Id;
                var aux4 = ListUsuario[i].Person.Id;
                var aux5 = ListUsuario[i].Company.Id;
                var aux6 = ListUsuario[i].Status.Id;
                $('#inId').val(ListUsuario[i].Id);
                $('#Email').val(ListUsuario[i].Email);
                $('#inPassword').val(ListUsuario[i].Password);
                llenarComboType(ListUsuario[i].Type.Id);
                llenarComboPerson(ListUsuario[i].Person.Id);
                llenarComboCompany(ListUsuario[i].Company.Id);
                llenarComboEstatus(ListUsuario[i].Status.Id);
                $('#descU').val(ListUsuario[i].Descuento);
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
    $('#inEmail').removeClass("is-invalid");
    $('#inEmail').val("");

    $('#descU').removeClass("is-invalid");
    $('#descU').val(0);

    $('#inPassword').removeClass("is-invalid");
    $('#inPassword').val("");

    $('#inType').removeClass("is-invalid");
    llenarComboType(0);

    $('#inPerson').removeClass("is-invalid");
    llenarComboPerson(0);

    $('#inStatus').removeClass("is-invalid");
    llenarComboEstatus(0);

    $('#inCompany').removeClass("is-invalid");
    llenarComboCompany(0);

}

function QuitarClaseErrorACombos() {
    $('#select2-inStatus-container').removeClass("cbError");
    $('#select2-inType-container').removeClass("cbError");
    $('#select2-inCompany-container').removeClass("cbError");
    $('#select2-inPerson-container').removeClass("cbError");
}

function ValidarCamposVacios() {
    var aux = true;

    if ($('#Email').val() == "") {
        $('#Email').addClass("is-invalid");
        aux = false;
    } else {
        $('#Email').removeClass("is-invalid");
    }

    if ($('#descU').val() == "") {
        $('#descU').addClass("is-invalid");
        aux = false;
    } else {
        $('#descU').removeClass("is-invalid");
    }

    if ($('#inPassword').val() == "") {
        $('#inPassword').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPassword').removeClass("is-invalid");
    }

    if ($('#inType').val() == 0 || $('#inType').val() == null) {
        $('#select2-inType-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inType-container').removeClass("cbError");
    }

    if ($('#inCompany').val() == 0 || $('#inCompany').val() == null) {
        $('#select2-inCompany-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inCompany-container').removeClass("cbError");
    }

    if ($('#inStatus').val() == 0 || $('#inStatus').val() == null) {
        $('#select2-inStatus-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inStatus-container').removeClass("cbError");
    }

    if ($('#inPerson').val() == 0 || $('#inPerson').val() == null) {
        $('#select2-inPerson-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-inPerson-container').removeClass("cbError");
    }

    return aux;
}

function InsertUser() {

    var datos =
    {
        pUser: {
            Email: $("#inEmail").val(),
            Password: $("#inPassword").val(),
            Type: { Id: $("#inType").val() },
            Person: { Id: $("#inPerson").val() },
            Company: { Id: $("#inCompany").val() },
            Status: { Id: $("#inStatus").val() },
            Descuento: $("#descU").val()
        }
    };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertUser,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                llenarTablaGetAllUser();
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateUser() {

    var datos =
    {
        uUser: {
            Id: $("#inId").val(),
            Email: $("#Email").val(),
            Password: $("#inPassword").val(),
            Type: { Id: $("#inType").val() },
            Person: { Id: $("#inPerson").val() },
            Company: { Id: $("#inCompany").val() },
            Status: { Id: $("#inStatus").val() },
            Descuento: $("#descU").val()
        }
    };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateUser,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaGetAllUser();
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
        modUser: {
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateStatusUser,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaGetAllUser();
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

var allPerson = '';
function llenarComboPerson(pPerson) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allPerson.length; i++) {
        if (allPerson[i].Status.Id == 1) {
            option += '<option value="' + allPerson[i].Id + '">' + allPerson[i].Name + '</option>';
        }


    }
    $("#inPerson").empty().append(option);
    if (pPerson != 0) {
        $("#inPerson").val(pPerson);
    }
}
function GetAllPerson() {
    $.ajax({
        url: urlGetAllPerson,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allPerson = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                }
                $("#inPerson").empty().append(option);

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

var allCompany = '';
function llenarComboCompany(pCompany) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allCompany.length; i++) {
        if (allCompany[i].Status.Id == 1) {
            option += '<option value="' + allCompany[i].Id + '">' + allCompany[i].Name + '</option>';
        }

    }
    $("#inCompany").empty().append(option);
    if (pCompany != 0) {
        $("#inCompany").val(pCompany);
    }
}
function GetAllCompany() {
    $.ajax({
        url: urlGetAllCompany,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allCompany = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                }
                $("#inCompany").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Company", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
        }
    });
}

function llenarTablaGetAllUser() {
    $.ajax({
        url: urlGetAllUser,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                ListUsuario = data;

                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);
                $("#modalInsert").modal("hide");

                for (var i = 0; i < data.length; i++) {
                    var Botones = '<center><button data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" style="width: 25px;height: 25px; margin-left: 10px;" class="Modificar Cursor btn btn-primary btn-icon"><i class="fa fa-edit"></i></button>' +
                    '<button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button>' +
                        '</center>';
                    t.row.add([
                        data[i].Id,
                        data[i].Email,
                        data[i].Type.Description,
                        data[i].Person.Name,
                        data[i].Company.Name,
                        data[i].Descuento + "%",
                        data[i].Status.Description,
                        Botones
                    ]).draw(false);
                }               
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