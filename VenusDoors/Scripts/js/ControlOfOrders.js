$(document).ready(function () {
    $(document).on('click', '.Detalle', function (event) { 
        var id = $(this).attr('data-id');
        GetDoorsByOrder(id);
    });

    $(document).on('click', '.Approved', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Confirm", "Are you sure you want to approve this order?",
        '<button onclick="UpdateOrderStatus5(id)" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Confirm</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });

    $(document).on('click', '.Process', function (event) { 
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Confirm", "Are you sure to process this order?",
        '<button onclick="UpdateOrderStatus6(id)" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Confirm</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });

    $(document).on('click', '.Completed', function (event) {  
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Confirm", "Are you sure you mark this order as completed?",
        '<button onclick="UpdateOrderStatus7(id)" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Confirm</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });

    $(document).on('click', '.Remove', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Warning!", "You are about to delete an article. What would you like to do?",
        '<button onclick="UpdateOrderStatus3(id)" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
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
        },
        ordering: false,
    });

    $('#datatable2').DataTable({
        bLengthChange: false,
        searching: false,
        responsive: true,
        ordering: false,
    });

    // Select2
    $('.dataTables_length select').select2({ minimumResultsForSearch: Infinity });

});

function GetDoorsByOrder(id) {
    var datos =
                    {
                        IdOrder: id,
                    }

    $.ajax({
        data: JSON.stringify(datos),
        url: urlGetDoorsByOrder,
        cache: false,
        type: 'POST',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (Result) {  
            var headBtn = '';
            if (Result.Order.Status.Id == 5 || Result.Order.Status.Id == 11) {
                headBtn += '<h3 id="lblTitulo" class="tx-inverse mg-b-5">Details of the order #<span style="color:#014d41">' + id + '</span></h3>';
                headBtn += '<a style="margin-left: 20px;" title="Click here to change the configuration of your doors" data-toggle="tab" href="#modalDoorConfiguration" class="btModify btn btn-primary btn-icon">';
                headBtn += '<div><i class="fa fa-edit"></i></div></a>';
            }
            else
            {
                headBtn += '<h3 id="lblTitulo" class="tx-inverse mg-b-5">Details of the order #<span style="color:#014d41">' + id + '</span></h3>';
            }
            var dxu = '';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label id="Material" style="margin-top: 10px;">Wood Species: <span style="color: #868ba1" style="color: #868ba1">' + Result.Material.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label id="DoorStyle" style="margin-top: 10px;">Door Style: <span style="color: #868ba1">' + Result.DoorStyle.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            if (Result.isOverlay == false) {
                dxu += '<label for="Overlay" style="margin-top: 10px;">Door Place: <span style="color: #868ba1">Insert Door Type</span></label>';
            }
            else {
                dxu += '<label for="Overlay" style="margin-top: 10px;">Door Place: <span style="color: #868ba1">Overlay Door Type</span></label>';
            }
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="StileWidth" style="margin-top: 10px;">Stile Width: <span style="color: #868ba1">' + Result.BottomRail.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="RailWidth" style="margin-top: 10px;">Rail Width: <span style="color: #868ba1">' + Result.TopRail.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="InsideProfile" style="margin-top: 10px;">Inside Edge Profile: <span style="color: #868ba1">' + Result.InsideEdgeProfile.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="OutsideProfile" style="margin-top: 10px;">Outside Edge Profile: <span style="color: #868ba1">' + Result.OutsideEdgeProfile.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="DoorAssembly" style="margin-top: 10px;">Door Assembly: <span style="color: #868ba1">' + Result.Join.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="PanelMaterial" style="margin-top: 10px;">Panel Material: <span style="color: #868ba1">' + Result.PanelMaterial.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            if (Result.IsOpeningMeasurement == false) {
                dxu += '<label for="Openeing" style="margin-top: 10px;">Opening Measurement: <span style="color: #868ba1">No</span></label>';
            }
            else {
                dxu += '<label for="Openeing" style="margin-top: 10px;">Opening Measurement: <span style="color: #868ba1">Yes</span></label>';
            }
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="VerticalD" style="margin-top: 10px;">Vertical Divisions: <span style="color: #868ba1">' + Result.VerticalDivisions.Quantity + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="HorizontalD" style="margin-top: 10px;">Horizontal Divisions: <span style="color: #868ba1">' + Result.HorizontalDivisions.Quantity + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            if (Result.isDrill == false) {
                dxu += '<label for="Drill" style="margin-top: 10px;">Hinge Drilling: <span style="color: #868ba1">No Drill</span></label>';
            }
            else {
                dxu += '<label for="Drill" style="margin-top: 10px;">Hinge Drilling: <span style="color: #868ba1">Is Drill</span></label>';
            }
            dxu += '</div><!-- col -->';
            if (Result.isDrill == true) {
                dxu += '<div class="col-xs-4 col-md-3">';
                dxu += '<label for="HingeDirection" style="margin-top: 10px;">Hinge Direction: <span style="color: #868ba1">' + Result.HingeDirection.Direction + '</span></label>';
                dxu += '</div><!-- col -->';
            }
            dxu += '<div class="col-xs-4 col-md-3">';
            if (Result.isFingerPull == false) {
                dxu += '<label for="Finger" style="margin-top: 10px;">Finger Pull: <span style="color: #868ba1">No</span></label>';
            }
            else {
                dxu += '<label for="Finger" style="margin-top: 10px;">Finger Pull: <span style="color: #868ba1">Yes</span></label>';
            }
            dxu += '</div><!-- col -->';

            var option = '<table width="100%"><thead><tr>';
            option += '<th>PREVIEW</th><th>QUANTITY</th>' +
            '<th>WIDHT</th>' +
            '<th>HEIGHT</th>' +
            '<th>PANEL STYLE</th>' +
            '<th>DOOR TYPE</th>' +
            '<th>DOOR OPTION</th>' +
            '<th>U. PRICE</th>' +
                '<th>TOTAL</th>';
            option += '</tr></thead><tbody>';
            data = Result.DoorsxOrder;
            for (var i = 0; i < data.length; i++) {
                option += '<tr><td><img width="65px" src="' + data[i].Picture + '"/></td>';

                option += '<td>' + data[i].Quantity.toString().replace(',', '.') + '</td>';
                option += '<td>' + Math.trunc(data[i].Width);
                if (data[i].DecimalsWidth.Value != 0) {
                    option += ' <span>' + data[i].DecimalsWidth.Description + '</span>';
                }
                option += '</td>';
                option += '<td>' + Math.trunc(data[i].Height);
                if (data[i].DecimalsHeight.Value != 0) {
                    option += ' <span>' + data[i].DecimalsHeight.Description + '</span>';
                }
                option += '</td>';
                option += '<td>' + data[i].Panel.Description + '</td>';
                option += '<td>' + data[i].DoorType.Description + '</td>';
                option += '<td>' + data[i].DoorOption.Description + '</td>';
                option += '<td><span>$</span>' + data[i].ItemCost.toString().replace(',', '.') + '</td>';
                option += '<td><span>$</span>' + data[i].SubTotal.toString().replace(',', '.') + '</td>';
            }
            option += '</tbody></table>';
            $("#tituloConBTNEdit").html(headBtn);
            $("#ordertable").html(option);
            $('#ModalOrderInfo').modal('toggle');
            $("#HeaderOptions").html(dxu);
            //$("#ordertable > tbody").empty().append(option);            
        },
    });
}

function UpdateOrderStatus5(id) {
    var status = 6;
    var datos =
    {
        modOrder: {
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };
   
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateOrderStatus,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalConfim').modal('hide');
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
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };
    
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
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };
    
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

function UpdateOrderStatus3(id) {
    var status = 11;
    var datos =
    {
        modOrder: {
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };
    
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
                    option += '<button href="#" data-id="' + data[i].Id + '" id="" value="" class="Detalle Cursor btn btn-info btn-icon" s style="width: 25px;height: 25px; margin-left: 10px;" ><i class="fa fa-eye" ></i></button>';
                    if (data[i].Status.Id == 5)
                    {
                        option += '<button title="Approve order." value="' + data[i].Id + '" class="Approved Cursor btn btn-primary btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-check"></i></button>';
                        option += '<button  data-toggle="modal" data-target="" id="" title="Remove order." value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px; "><i class="fa fa-close"></i></button>';
                    }
                    else if (data[i].Status.Id == 6)
                    { option += '<button title="Process order." value="' + data[i].Id + '" class="Process Cursor btn btn-warning btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-check"></i> </button>'; }
                    else if (data[i].Status.Id == 7)
                    { option += '<button title="Complete order." value="' + data[i].Id + '" class="Completed Cursor btn btn-success btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-check"></i>  </button>'; }
                   
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