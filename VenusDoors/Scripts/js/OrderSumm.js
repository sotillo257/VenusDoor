$(document).ready(function () {

    $(document).on("click", ".btnn-dele", function (e) {
       // e.preventDefault();
        var id = $(this).parentsUntil('#id-table').find('.btnn-dele').attr('data-id');
        $('#modalDelete').modal('toggle');
        $('#deleteidhidden').val(id);
    });

    $(document).on("click", "#btnDelete", function () {
        DltItem();
    });

    $(document).on("click", "#dxoCancel", function () {
        LimpiarCamposRapidos();
        $('.trEdit').removeClass("trEdit");
        $("#dxoAdd").show();
        $("#dxoSave").hide();
        $("#dxoCancel").hide();
    });

    $(document).on('click', '.btnn-edit', function (event) {
        $('.trEdit').removeClass("trEdit");
        var id = $(this).parentsUntil('#id-table').find('.btnn-edit').attr('data-id');
        $(this).closest('tr').addClass("trEdit");
        for (var i = 0; i < listDXO.length; i++) {
            if (listDXO[i].Id == id) {
                $("#idDoorxOrder").val(listDXO[i].Id)
                $("#CantidadFila").val(listDXO[i].Quantity);
                $("#iptWidth").val(listDXO[i].Width);
                $("#iptHeight").val(listDXO[i].Height);
                llenarComboHingeDirection(listDXO[i].HingeDirection.Id);
                llenarComboDecimalW(listDXO[i].DecimalsWidth.Id);
                llenarComboDecimalH(listDXO[i].DecimalsHeight.Id);
                llenarComboDoorOption(listDXO[i].DoorOption.Id);
                llenarComboDoorType(listDXO[i].DoorType.Id);
                break;
            }
        }
        $("#dxoAdd").hide();
        $("#dxoSave").show();
        $("#dxoCancel").show();
        $('body,html').animate({ scrollTop: 0 }, 500);
        $('#CantidadFila').addClass("clickedEdit");
        $('#iptWidth').addClass("clickedEdit");
        $('#select2-cbDecimalsW-container').addClass("clickedEdit");
        $('#iptHeight').addClass("clickedEdit");
        $('#select2-cbDecimalsH-container').addClass("clickedEdit");
        $('#select2-cbHingeDirection-container').addClass("clickedEdit");
        $('#select2-cbDoorType-container').addClass("clickedEdit");
        $('#select2-cbDoorOpt-container').addClass("clickedEdit");
        setTimeout(function () {
            $('#CantidadFila').removeClass("clickedEdit");
            $('#iptWidth').removeClass("clickedEdit");
            $('#select2-cbDecimalsW-container').removeClass("clickedEdit");
            $('#iptHeight').removeClass("clickedEdit");
            $('#select2-cbDecimalsH-container').removeClass("clickedEdit");
            $('#select2-cbHingeDirection-container').removeClass("clickedEdit");
            $('#select2-cbDoorType-container').removeClass("clickedEdit");
            $('#select2-cbDoorOpt-container').removeClass("clickedEdit");
        }, 1600);
    });   

    $(document).on('click', '.SaveDoor', function (event) {
        UpdateDoorsxOrder();
    });
   
    $(document).on("click", "#button-cnt", function () {
        window.location.href = '/OrderStatus/Index';
    });

    $(document).on('click', "#btnupp", function () {
        $("#File1").trigger('click');
    });

    $(document).on("click", ".btn-continue", function () {
        LlammarModal("ConfirmOrdenSummary", "Confirm", "Do you want to process your order?",
        '<button onclick="SendOrder();" class="Cursor btn btn-primary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium">Confirm order</button>' +
        '<button type="button" class="btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
    });
    
});

$(function () {
    'use strict';

    $('#idOrderSummary').DataTable({
        ordering: false,
        responsive: true,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ items/page',
        }
    });

    $('#tbOrderSummary').DataTable({
        ordering: false,
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

function SendOrder() {
    //if (ValidarShipping()) {
        ConfirmOrder();
    //} else {
    //    LlammarModal("Danger", "Select the shipping address or add a new one.", " ");
    //}
}

function DltItem() {
    var datos =
                    {
                        itemID: $('#deleteidhidden').val(),
                        orderid: $("#idorder").val(),
                    };
              
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlDeleteItem,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                //llenarTablaOrderSumary();
                //llenarheaderOrder();
                $('#modalDelete').modal('hide');
                LlammarModal("CongDelete", "Success! It has been removed correctly.", " ");
                llenarTablaOrderSumary();
            } else {
                $('#modalDelete').modal('hide');
                LlammarModal("Danger", "Error! An error occurred while deleting..", " ");
            }
        },
        error: function (err) {
            $('#modalDelete').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },
    });
}

function ConfirmOrder() {
    var observa = $("#inObservations").val();
    if (observa != "") {
        observa = observa + " \n Thanks for your business."
    }
    var datos =
    {
        ord: {
            Id: $("#idorder").val(),
            Total: $("#idtotal").val(),
            Status: { Id: $("#idstatus").val() },
            Observations: observa,
            ShippingAddress: { Id: $("#cbShippingAddress").val()}
        },

    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlConfirmOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            if (data == true) {
                $('#modalInsert').modal('hide');
                $('#modalConfirmOrderSummary').modal('hide');
                $("button").prop('disabled', true);                 
                LlammarModal("OrderSummary", "Congratulations! Your order is being processed.", "At this time you will be redirected to the Order Status view. Check your email to see your order details.");
                $(".react").prop('disabled', false);
                setTimeout(function () {
                    window.location.href = '/OrderStatus/Index';
                }, 10000);
            } else {
                LlammarModal("Danger", "An error occurred during the process.", " ");
                $("#btn-continue").prop('disabled', false);
                $('#modalConfirmOrderSummary').modal('hide');
            }
        },
        error: function (err) {
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}

//function ValidarShipping() {
//    var aux = true;
//    if ($('#cbShippingAddress').val() == 0) {
//        $('#cbShippingAddress').addClass("is-invalid");
//        aux = false;
//    } else {
//        $('#cbShippingAddress').removeClass("is-invalid");
//    }

//    return aux;
//}

$(function () {
    'use strict';

    $('#datatable1').DataTable({
        ordering: false,
        responsive: true,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ items/page',
        }
    });

   
    // Select2
    $('.dataTables_length select').select2({ minimumResultsForSearch: Infinity });

});

function UpdateDoorsxOrder() {
    var itemCost = parseFloat($("#iptCost").val());
    var DoorQuantity = $("#CantidadFila").val();
    var DoorOp = $("#cbDoorOpt").val();
    var drillingV = ($("#idDrill").val() == 1) ? false : true;
    var HingeDirection = $("#cbHingeDirection").val();
    var HingePositions = "";
    if (drillingV == true) {
        HingeDirection = $("#cbHingeDirection").val();
        HingePositions = 2;
    } else {
        HingeDirection = 3;
        HingePositions = 2;
    }

    var datos =
         {
             idOrder: $("#idorder").val(),
             pDoorsxOrder: {
                 Id: $("#idDoorxOrder").val(),
                 DoorsxUser: CodigoDoorxUser,
                 Width: parseFloat($("#iptWidth").val()),
                 DecimalsWidth: { Id: $("#cbDecimalsW").val() },
                 Height: parseFloat($("#iptHeight").val()),
                 DecimalsHeight: { Id: $("#cbDecimalsH").val() },
                 Quantity: DoorQuantity,
                 ItemCost: 0,
                 SubTotal: 0,
                 Picture: '',
                 ProfilePicture: '',
                 DoorType: { Id: $("#cbDoorType").val() },
                 DoorOption: { Id: DoorOp },
                 User: { Id: 0 },
                 Status: { Id: 1 },
                 HingeDirection: { Id: HingeDirection },
                 HingePositions: { Id: HingePositions },
             }
         };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoorsxOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("ConfigM", "The door has been modified successfully!", "");               
                llenarTablaOrderSumary();
                LimpiarCamposRapidos();
                $("#dxoAdd").show();
                $("#dxoSave").hide();
                $("#dxoCancel").hide();
                $('.trEdit').removeClass("trEdit");
            } else {                               
                LlammarModal("Danger", "Error in the process.", "An error occurred when modified the door.");
            }
        },
        error: function (err) {            
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}



