$(document).ready(function () {
    $(document).on('click', '.Detalle', function (event) { 
        var id = $(this).attr('data-id');
        GetDoorsByOrder(id);
    });

    $(document).on('click', '.Approved', function (event) {  
        var id = $(this).attr('value');
        UpdateOrderStatus5(id);
    });

    $(document).on('click', '.Process', function (event) { 
        var id = $(this).attr('value');
        UpdateOrderStatus6(id);
    });

    $(document).on('click', '.Completed', function (event) {  
        var id = $(this).attr('value');
        UpdateOrderStatus7(id);
    });

    $(document).on('click', '.Remove', function (event) {   
        var id = $(this).attr('value');
        $('#modalDelete').modal('toggle');
        $('#deleteidhidden').val(id);
    });

    $(document).on('click', '#btnDelete', function (event) {  
        var id = $(this).attr('value');
        UpdateOrderStatus3(id);
    });
});

function GetDoorsByOrder(id) {
    var datos =
                    {
                        IdOrder: id,
                    }

    console.log(datos);
    $.ajax({
        data: JSON.stringify(datos),
        url: urlGetDoorsByOrder,
        cache: false,
        type: 'POST',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var head = '<h5 class="modal-title" id="exampleModalLabel">Details of the order <span style="color:#014d41">#' + id + '</span></h5>'
            var table = '<table width="100%"><thead><tr>';
            table +='<th>Preview</th><th>Material</th>' +
            '<th>Inside profile</th>' +
            '<th>Outside profile</th>' +
            '<th>Panel type</th>' +
            '<th>Quantity</th>' +
            '<th>Item cost</th>' +
            '<th>SubTotal</th>' +
             '<th><i class="fa fa-flash"></i></th>';
            table += '</tr></thead><tbody>';                           
            for (var i = 0; i < data.length; i++) {
                table += '<tr><td><img width="65px" class="Cursor" src="' + data[i].Picture + '"/></td><td>' + data[i].Material.Description + '</td>' +
                    '<td>' + data[i].InsideEdgeProfile.Description + '</td>' +
                    '<td>' + data[i].OutsideEdgeProfile.Description + '</td>' +
                    '<td>' + data[i].Panel.Description + '</td>' +
                    '<td>' + data[i].Quantity + '</td>' +
                    '<td>' + data[i].ItemCost + '$</td>' +
                    '<td>' + data[i].SubTotal + '$</td>' +
                    '<td><center><button href="#"  data-target="#modalInsert" data-toggle="modal" data-id="@item.Id" id="Details" value="" class="btn btn-info btn-icon">' +
                        '<div><i class="fa fa-eye"></i></div></button></center></td>' +
                    '</tr>';
            }
            table += '</tbody></table>';
            $("#orderhead").html(head);
            $("#ordertable").html(table);            
            $('#ModalOrderInfo').modal('toggle');
            //$("#ordertable > tbody").empty().append(option);            
        },
    });
}

function UpdateOrderStatus5(id) {
    var status = 6;
    var datos =
    {
        modOrder: {
            Id: id,
            Status: { Id: status }

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOrderStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaOrderControl();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function UpdateOrderStatus6(id) {
    var status = 7;
    var datos =
    {
        modOrder: {
            Id: id,
            Status: { Id: status }

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOrderStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaOrderControl();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function UpdateOrderStatus7(id) {
    var status = 8;
    var datos =
    {
        modOrder: {
            Id: id,
            Status: { Id: status }

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOrderStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaOrderControl();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function UpdateOrderStatus3() {
    var status = 3;
    var datos =
    {
        modOrder: {
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOrderStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaOrderControl();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

function llenarTablaOrderControl() {
    $.ajax({
        url: urlGetAllOrderControl,
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
                    option += '<td>' + data[i].Quantity + '</td>';
                    option += '<td>' + data[i].Total + '</td>';
                    option += '<td>';
                    if (data[i].Status.Id == 7) {
                        option += '<span class="square-8 bg-success mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 6) {
                        option += '<span class="square-8 btn-primary mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 5) {
                        option += '<span class="square-8 bg-warning mg-r-5 rounded-circle"></span>';
                    }
                    option += data[i].Status.Description + '</td>';
                    option += '<td>';
                    option += '<button href="#" data-id="' + data[i].Id + '" id="" value="" class="Detalle Cursor btn btn-info btn-icon" style="margin-right: 5px;" ><div><i class="fa fa-eye" ></i></div></button>';
                    if (data[i].Status.Id == 5)
                    {
                        option += '<button title="Approve order." value="' + data[i].Id + '" class="Approved btn btn-primary btn-icon" style="margin-right: 5px;"><div><i class="fa fa-check"></i></div></button>';
                        option += '<button  data-toggle="modal" data-target="" id="" title="Remove order." value="' + data[i].Id + '" style="margin-right: 5px;" class="Remove btn btn-danger btn-icon"><div><i class="fa fa-close"></i></div></button>';
                    }
                    else if (data[i].Status.Id == 6)
                    { option += '<button title="Process order." value="' + data[i].Id + '" class="Process btn btn-warning btn-icon" style="margin-right: 5px;" > <div> <i class="fa fa-check"></i> </div> </button>'; }
                    else if (data[i].Status.Id == 7)
                    { option += '<button title="Complete order." value="' + data[i].Id + '" class="Completed btn btn-success btn-icon" style="margin-right: 5px;" > <div> <i class="fa fa-check"></i> </div> </button>'; }
                   
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