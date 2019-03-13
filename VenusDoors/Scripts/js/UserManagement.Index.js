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
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<tr role="row" class="odd">';
                    option += '<td tabindex="0"  >' + data[i].Id + '</td>';
                    option += '<td>' + data[i].Email + '</td>';
                    option += '<td>' + data[i].Person.Name + '</td>';
                    option += '<td>' + data[i].Company.Name + '</td>';
                    option += '<td>' + data[i].Status.Description + '</td>';
                    option += '<td>';
                    option += '<button value="' + data[i].Id + '" style="margin-right: 5px;" class="Approved Cursor btn btn-primary btn-icon"><div><i class="fa fa-check"></i></div></button>';
                    if (data[i].Status.Id != 12) {
                        option += '<button value="' + data[i].Id + '" style="margin-right: 5px;" class="Refuse Cursor btn btn-danger btn-icon"><div><i class="fa fa-close"></i></div></button>';
                    }      
                  
                    option += '</td></tr>';

                }
                $("#datatable1 > tbody").empty().append(option);
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