var IdUser = 0
$(document).ready(function () {
    $(document).on('click', '.Approved', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Confirm", "Are you sure to approve this user?",
        '<button onclick="ApprovedUser(id)" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Confirm</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });

    $(document).on('click', '.Refuse', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Warning!", "Are you sure to cancel this user's request?",
        '<button onclick="RefuseUser(id)" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });
    
    $(document).on('click', '.Descuento', function (event) {
        IdUser = $(this).attr('value');       
    });

    $(document).on('click', '#btnInsertDescuento', function (event) {
        UserDescuento(IdUser, $("#inDescuento").val());       
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

function ApprovedUser(id) {
    var status = 1;
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
        url: urlUpdateUserStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaUserManegement();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function UserDescuento(Id, Descuento) {
    var status = 1;
    var datos =
    {
        IdUser: Id,
        Descuento: Descuento
      
    };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateUserDescuento,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! the discount has been added.", " ");
                llenarTablaUserManegement();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function RefuseUser(id) {
    var status = 12;
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
        url: urlUpdateUserStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaUserManegement();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function llenarTablaUserManegement() {
    $.ajax({
        url: urlGetAllUserManagement,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                id = data;
                
                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);
                $("#modalInsert").modal("hide");
                for (var i = 0; i < data.length; i++) {                    
                    var Botones = '<button value="' + data[i].Id + '" class="Approved Cursor btn btn-primary btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-check"></i></button>';
                    Botones += '   <button value="' + data[i].Id + '" data-toggle="modal" data-target="#modalInsert" style="width: 25px;height: 25px; margin-left: 10px;" id="btInsert" class="Cursor btn btn-success btn-icon Descuento"><i class="fa fa-percent"></i></button>';
                    if (data[i].Status.Id != 12) {
                        Botones += '<button value="' + data[i].Id + '"  class="Refuse Cursor btn btn-danger btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-close"></i></button>';
                    }  
                    t.row.add([
                        data[i].Id,
                        data[i].Email,
                        data[i].Person.Name,
                        data[i].Company.Name,
                        data[i].Descuento + "%",
                        data[i].Status.Description,
                        Botones                       
                    ]).draw(false);
                }
            }            
            else {
                LlammarModal("Danger", "Error al llenar la tabla", "UserManagement.Index.js line:136");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });

}