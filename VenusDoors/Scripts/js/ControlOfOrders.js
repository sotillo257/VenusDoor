$(document).ready(function () {
     
    $(document).on('click', '.Detalle', function (event) { 
        var idGETOr = $(this).attr('data-id');
        _IdOrderModificar = idGETOr;      
        $("#editBCK").hide();
        $("#btnsave").hide();
        $('#editDXU').removeClass("active");        
        $("#editBCK").trigger("click");
        $('#dxoPanel').removeClass("active");     
        GetDoorsByOrder(idGETOr);
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
    $(document).on('change', '#cbSearch', function (event) {
        llenarTablaOrderControlxUser($("#cbSearch").val());
});
});

$(function () {
    'use strict';

    $('#datatable1').DataTable({
        responsive: true,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_  '// <label for="Panel" style="margin-top: 25px;">Search: </label><select style="width:100%;" class="form-control select2 " id="cbSearch"></select>',
        },
        ordering: false,
        searching: false,
        bLengthChange: false,
    });

    $('#datatable2').DataTable({
        bLengthChange: false,
        searching: false,
        responsive: true,
        ordering: false,
    });
    GetAllStatus();
    // Select2
    $('.dataTables_length select').select2({ minimumResultsForSearch: Infinity });

});

function GetDoorsByOrder(idOrden) {
    var datos =
                    {
                        IdOrder: idOrden,
                    }    
    $.ajax({
        data: JSON.stringify(datos),
        url: urlGetDoorsByOrder,
        cache: false,
        type: 'POST',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (Result) {
            _IdDoorxUser = Result.Order.Id;
            $('#idDxUorder').val(Result.Order.Id);
            $('#descDXU').val(Result.Order.Descuento);
            var fingerPull = Result.isFingerPull;
            if (fingerPull == false) {
                fingerPull = 1;
            } else {
                fingerPull = 2;
            }
            llenarComboFinger(fingerPull);

            var isDrill = Result.isDrill;
            if (isDrill == false) {
                isDrill = 1;
            } else {
                isDrill = 2;
            }
            llenarComboIsDrill(isDrill);
            HingeCalculate();
            HingeShow();

            var isOpen = Result.IsOpeningMeasurement;
            if (isOpen == false) {
                isOpen = 1;
            } else {
                isOpen = 2;
            }
            llenarComboIsOpen(isOpen);

            var isOver = Result.isOverlay;
            if (isOver == false) {
                isOver = 1;
            } else {
                isOver = 2;
            }
            checkIsOverlay(isOver);
            llenarComboMaterial(Result.Material.Id);
            llenarComboDoorStyle(Result.DoorStyle.Id);
            llenarComboIEP(Result.InsideEdgeProfile.Id);
            llenarComboOEP(Result.OutsideEdgeProfile.Id);
            llenarComboStileWidth(Result.BottomRail.Id);
            llenarComboRailWidth(Result.TopRail.Id);
            llenarComboDoorAssembly(Result.Join.Id);
            llenarComboPanelMaterial(Result.Material.Id);
            llenarComboVerticalDivisions(Result.VerticalDivisions.Id);
            llenarComboHorizontalDivisions(Result.HorizontalDivisions.Id);
            llenarComboHingeDirection(Result.HingeDirection.Id);

            var info = "";
            info += '<tr>';
            info += '<td>' + Result.User.Person.Name + ' '+  Result.User.Person.Lastname +'</td>';                
            info += '<td>' + Result.User.Email + '</td>';               
            info += '<td>' + Result.User.Person.Telephone + '</td>';                       
            info += '<td>' + Result.User.Person.Direction + '</td>';
            info += '</tr>';

            var dxu = '';
            //Primera fila
            dxu += '<tr>';
            dxu += '<td>Wood Species: <span style="color: #868ba1">' + Result.Material.Description + '</span></td>';
            dxu += '<td>Door Style: <span style="color: #868ba1">' + Result.DoorStyle.Description + '</span></td>';
            if (Result.isOverlay == false) {
                dxu += '<td>Door Place: <span style="color: #868ba1">Inset Door Type</span></td>';
            }
            else {
                dxu += '<td>Door Place: <span style="color: #868ba1">Overlay Door Type</span></td>';                
            }
            dxu += '<td>Stile Width: <span style="color: #868ba1">' + Result.BottomRail.Description + '</span></td>';
            dxu += '</tr>';

            //Segunda fila
            dxu += '<tr>';
            dxu += '<td>Rail Width: <span style="color: #868ba1">' + Result.TopRail.Description + '</span></td>';
            dxu += '<td>Inside Edge Profile: <span style="color: #868ba1">' + Result.InsideEdgeProfile.Description + '</span></td>';
            dxu += '<td>Outside Edge Profile: <span style="color: #868ba1">' + Result.OutsideEdgeProfile.Description + '</span></td>';
            dxu += '<td>Door Assembly: <span style="color: #868ba1">' + Result.Join.Description + '</span></td>';
            dxu += '</tr>';

            //tercera fila
            dxu += '<tr>';
            dxu += '<td>Panel Material: <span style="color: #868ba1">' + Result.PanelMaterial.Description + '</span></td>';
            if (Result.IsOpeningMeasurement == false) {
                dxu += '<td>Opening Measurement: <span style="color: #868ba1">No</span></td>';
            }
            else {
                dxu += '<td>Opening Measurement: <span style="color: #868ba1">Yes</span></td>';
            }
            dxu += '<td>Vertical Divisions: <span style="color: #868ba1">' + Result.VerticalDivisions.Quantity + '</span></td>';
            dxu += '<td>Horizontal Divisions: <span style="color: #868ba1">' + Result.HorizontalDivisions.Quantity + '</span></td>';
            dxu += '</tr>';

            //Cuarta fila
            dxu += '<tr>';
            if (Result.isDrill == false) {
                dxu += '<td>Hinge Drilling: <span style="color: #868ba1">No Drill</span></td>';
            }
            else {
                dxu += '<td>Hinge Drilling: <span style="color: #868ba1">Drill (' + Result.HingeDirection.Direction + ')</span></td>';
            }
            if (Result.isFingerPull == false) {
                dxu += '<td style="border-right: 1px solid #ADADAD;">Finger Pull: <span style="color: #868ba1">No</span></td>';
            }
            else {
                dxu += '<td style="border-right: 1px solid #ADADAD;">Finger Pull: <span style="color: #868ba1">Yes</span></td>';
            }
            dxu += '<td colspan="2">Observations: ' + Result.Order.Observations + '</td>';
            dxu += '</tr>';

            var option = '<table id="ordertable" style="width:100%">';
            option += '<thead><tr>';
            option += '<th>PREVIEW</th>';
            option += '<th>QUANTITY</th>';
            option += '<th>WIDHT</th>';
            option += '<th>HEIGHT</th>';
            option += '<th>PANEL STYLE</th>';
            option += '<th>DOOR TYPE</th>';
            option += '<th>DOOR OPTION</th>';
            option += '<th>U. PRICE</th>';
            if (Result.DescuentoActivos) {
                option += '<th>DISCOUNT</th>';
            }
            option += '<th>TOTAL</th>';
            option += '<th><i class="fa fa-flash"></i></th></tr></thead><tbody>';   
            DxOl = Result.DoorsxOrder;
            for (var i = 0; i < Result.DoorsxOrder.length; i++) {
                option += '<tr><td><img width="65px" src="' + Result.DoorsxOrder[i].Picture + '"/></td>';

                option += '<td>' + Result.DoorsxOrder[i].Quantity.toString().replace(',', '.') + '</td>';
                option += '<td>' + Math.trunc(Result.DoorsxOrder[i].Width);
                if (Result.DoorsxOrder[i].DecimalsWidth.Value != 0) {
                    option += ' <span>' + Result.DoorsxOrder[i].DecimalsWidth.Description + '</span>';
                }
                option += '</td>';
                option += '<td>' + Math.trunc(Result.DoorsxOrder[i].Height);
                if (Result.DoorsxOrder[i].DecimalsHeight.Value != 0) {
                    option += ' <span>' + Result.DoorsxOrder[i].DecimalsHeight.Description + '</span>';
                }
                option += '</td>';
                option += '<td>' + Result.DoorsxOrder[i].Panel.Description + '</td>';
                option += '<td>' + Result.DoorsxOrder[i].DoorType.Description + '</td>';
                option += '<td>' + Result.DoorsxOrder[i].DoorOption.Description + '</td>';
                option += '<td><span>$</span>' + Result.DoorsxOrder[i].ItemCost.toString().replace(',', '.') + '</td>';
                if (Result.DescuentoActivos) {
                    option += '<td>' + Result.DoorsxOrder[i].Descuento + '%</td>';
                }
                option += '<td><span>$</span>' + Result.DoorsxOrder[i].SubTotal.toString().replace(',', '.') + '</td>';
                if (Result.Order.Status.Id == 5) {
                option += '<td><button title="Edit Door" data-id="' + Result.DoorsxOrder[i].Id + '"data-toggle="tab" href="#dxoPanel" role="tab"  class="editDoor Cursor btn btn-primary btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-edit"></i></button></td>';
                } else {
                    option += '<td><button title="Not available" disabled data-id="" data-toggle="tab" href="#dxoPanel" role="tab"  class="editDoor btn btn-primary btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-edit"></i></button></td>';
                }               
                option += '</tr>';
            }
            option += '</tbody></table>';
            $("#orreff").text(idOrden);
            $("#divTable").empty().append(option);
            $("#HeaderOptions > tbody").empty().append(dxu);
            $("#UserOrderInfo > tbody").empty().append(info);           
            if(Result.Order.Status.Id == 5){
                $("#editDXU").show();
            }else{
                $("#editDXU").hide();
            }
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
                
                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);
                for (var i = 0; i < data.length; i++) {
                    var option = '';
                    if (data[i].Status.Id == 4) {
                        option += '<span class="square-8 bg-pink mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 5) {
                        option += '<span class="square-8 bg-warning mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 6) {
                        option += '<span class="square-8 btn-purple mg-r-5 rounded-circle"></span> ';
                    } else if (data[i].Status.Id == 7) {
                        option += '<span class="square-8 bg-success mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 8) {
                        option += '<span class="square-8 bg-info mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 11) {
                        option += '<span class="square-8 bg-danger mg-r-5 rounded-circle"></span>';
                    }
                    var Botones = '<button href="#" data-id="' + data[i].Id + '" value="" data-toggle="modal" data-target=".ModalOrderInfo" class="Detalle Cursor btn btn-info btn-icon" s style="width: 25px;height: 25px; margin-left: 10px;" ><i class="fa fa-eye" ></i></button>';
                    if (data[i].Status.Id == 5) {
                        Botones += '<button title="Approve order." value="' + data[i].Id + '" class="Approved Cursor btn btn-primary btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-check"></i></button>';
                        Botones += '<button  data-toggle="modal" data-target="" id="" title="Remove order." value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px; "><i class="fa fa-close"></i></button>';
                    }
                    else if (data[i].Status.Id == 6)
                    { Botones += '<button title="Process order." value="' + data[i].Id + '" class="Process Cursor btn btn-warning btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-check"></i> </button>'; }
                    else if (data[i].Status.Id == 7) {
                        Botones += '<button title="Complete order." value="' + data[i].Id + '" class="Completed Cursor btn btn-success btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-check"></i>  </button>';
                    }
                    t.row.add([
                         data[i].Id,
                        data[i].Quantity,
                         option + ' ' + data[i].Status.Description,
                        data[i].Total,                       
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

function GetAllStatus() {
    $.ajax({
        url: urlGetAllStatus,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                AllRailWidth = data;
                var option = '<option value="0">All Order</option>';
                for (var i = 0; i < data.length; i++) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';

                }
                $("#cbSearch").empty().append(option);
                $("#cbSearch").val(5);

            }
            else {
                LlammarModal("Danger", "Error obtaining Status.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Internal Error obtaining Status.", " ");
        }
    });
}

function llenarTablaOrderControlxUser(pIdStatus) {
    var datos =
   {
       IdStatus: pIdStatus
   };
    $.ajax({
        url: urlGetOrderxStatus,
        data: JSON.stringify(datos),
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (Result) {

            if (!Result.Error) {
                var data = Result.Data;

                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);
                for (var i = 0; i < data.length; i++) {
                    var option = '';
                    if (data[i].Status.Id == 4) {
                        option += '<span class="square-8 bg-pink mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 5) {
                        option += '<span class="square-8 bg-warning mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 6) {
                        option += '<span class="square-8 btn-purple mg-r-5 rounded-circle"></span> ';
                    } else if (data[i].Status.Id == 7) {
                        option += '<span class="square-8 bg-success mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 8) {
                        option += '<span class="square-8 bg-info mg-r-5 rounded-circle"></span>';
                    } else if (data[i].Status.Id == 11) {
                        option += '<span class="square-8 bg-danger mg-r-5 rounded-circle"></span>';
                    }
                    var Botones = '<button href="#" data-id="' + data[i].Id + '" value="" data-toggle="modal" data-target=".ModalOrderInfo" class="Detalle Cursor btn btn-info btn-icon" s style="width: 25px;height: 25px; margin-left: 10px;" ><i class="fa fa-eye" ></i></button>';
                    if (data[i].Status.Id == 5) {
                        Botones += '<button title="Approve order." value="' + data[i].Id + '" class="Approved Cursor btn btn-primary btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-check"></i></button>';
                        Botones += '<button  data-toggle="modal" data-target="" id="" title="Remove order." value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px; "><i class="fa fa-close"></i></button>';
                    }
                    else if (data[i].Status.Id == 6)
                    { Botones += '<button title="Process order." value="' + data[i].Id + '" class="Process Cursor btn btn-warning btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-check"></i> </button>'; }
                    else if (data[i].Status.Id == 7) {
                        Botones += '<button title="Complete order." value="' + data[i].Id + '" class="Completed Cursor btn btn-success btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-check"></i>  </button>';
                    }
                    t.row.add([
                         data[i].Id,
                        data[i].Quantity,
                         option + ' ' + data[i].Status.Description,
                        data[i].Total,
                        Botones
                    ]).draw(false);
                }
            }
            else {
                LlammarModal("Danger", "Error obtaining Type", Result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", err.Mensaje);
        }
    });

}
