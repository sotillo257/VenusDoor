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

    // Select2
    $('.dataTables_length select').select2({ minimumResultsForSearch: Infinity });

});

$(document).ready(function () {
    llenarComboMaterial(0);
    llenarComboIEP(0);
    llenarComboOEP(0);
    llenarComboDoorStyle(0);
    llenarComboRailWidth(0);
    llenarComboStileWidth(0);
    llenarComboDoorAssembly(0);
    llenarComboPanelStyle(0);
    llenarComboPanelMaterial(0, _DoorSt);
    llenarComboVerticalDivisions(0);
    llenarComboHorizontalDivisions(0);
    llenarComboHingeDirection(0);
    llenarComboDoorType(0);
    llenarComboDoorOption(0);
    llenarComboDecimalW(0);
    llenarComboDecimalH(0);
    PrintDoorOverlay(_DoorSt);

    //Ordersumm.js

    $(document).on("click", ".btnn-dele", function (e) {
        // e.preventDefault();
        var id = $(this).parentsUntil('#id-table').find('.btnn-dele').attr('data-id');
        $('#modalDelete').modal('toggle');
        $('#deleteidhidden').val(id);
    });

    $(document).on("click", "#btnDelete", function () {
        DltItem();
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

    //ConfigDoor.index.js

    $(document).on('click', ".AddDoor", function () {
        if (ValidarCamposFront()) {
            if (ValidadWH()) {
                InsertDoorsxOrder();
            } else {
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Danger", "The inches are not within our limits.", " ");
            }
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }

    });

    $(document).on('click', "#btnLogo", function () {
        $("#File1").trigger('click');
    });     

    $(document).on('change', '#cbisDrill', function () {
        HingeShow();
    });

    $(document).on('change', '#cbMaterial', function () {
        var pMaterial = $("#cbMaterial").val();
        var pDoorStyle = $("#cbDoorStyle").val();
        llenarComboPanelMaterial(pMaterial, pDoorStyle);
    });

    $(document).on('change', '.Profile', function () {
        ChangeProfile();
    });

    $(document).on('change', '.Doors', function () {
        changeDoorPicture();
    });

    $(document).on('change', '#File1', function () {
        $('input[type=file][data-max-size]').each(function () {
            if (typeof this.files[0] !== 'undefined') {
                var maxSize = parseInt($(this).attr('data-max-size'), 10),
                size = this.files[0].size;
                isOk = maxSize > size;
                return isOk;
            }
        });
        if (!isOk) {
            LlammarModal("Danger", "Image size execeeds maximun allowable size", "Maximun file size 5MB");
        } else {
            var compania = new Array();
            var formData = new FormData();
            if ($("#File1")[0].files.length > 0) {
                //alert($("#File1")[0].files[0].name);
                formData.append('Files', $("#File1")[0].files[0], $("#File1")[0].files[0].name);
            }
            compania.push(formData);
            $.ajax({
                url: urlUploadExcel,
                type: 'POST',
                data: compania[0],
                contentType: false,
                processData: false,
                success: function (data) {
                    if (data == true) {
                        LlammarModal("ConfigM", "Successful doors creation!", "Your doors has been added successfully.");
                        llenarTablaOrderSumary();
                        $("#ModalUpload").modal("hide");
                    } else {
                        LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
                    }

                },
                error: function (err) {

                },
                complete: function (data) {
                    $("#btnCerrarModalCompania").prop("disabled", false);
                    $("#btnAgregarComapania").button('reset');
                }
            });
        }
    });

    $(document).on('change', '#cbDoorStyle', function () {
        ChangeDoorStylePanel($("#cbDoorStyle").val());
        GetInsideAndOutside($("#cbDoorStyle").val());
    });


});

function SendOrder() {
    ConfirmOrder();
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
            ShippingAddress: { Id: $("#cbShippingAddress").val() }
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
                LlammarModal("Congratuletions", "Congratulations! Your order is being processed.", "At this time you will be redirected to the Order Status view. Check your email to see your order details.");
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

function ValidarCamposFront() {
    var aux = true;

    if ($('#cbDecimalsW').val() == 0 || $('#cbDecimalsW').val() == null) {
        $('#cbDecimalsW').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDecimalsW').removeClass("is-invalid");
    }
    if ($('#cbDecimalsH').val() == 0 || $('#cbDecimalsH').val() == null) {
        $('#cbDecimalsH').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDecimalsH').removeClass("is-invalid");
    }

    if ($('#iptWidth').val() == "" || $('#iptWidth').val() == null) {
        $('#iptWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptWidth').removeClass("is-invalid");
    }

    if ($('#iptHeight').val() == "" || $('#iptHeight').val() == null) {
        $('#iptHeight').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptHeight').removeClass("is-invalid");
    }

    if ($('#CantidadFila').val() == "" || $('#CantidadFila').val() == null) {
        $('#CantidadFila').addClass("is-invalid");
        aux = false;
    } else {
        $('#CantidadFila').removeClass("is-invalid");
    }

    if ($('#cbisDrill').val() == 0 || $('#cbisDrill').val() == null) {
        $('#select2-cbisDrill-container').addClass("cbError");
        aux = false;
    } else {
        if ($('#cbisDrill').val() == 2) {
            if ($('#cbHingeDirection').val() == 0 || $('#cbHingeDirection').val() == null) {
                $('#select2-cbHingeDirection-container').addClass("cbError");
                aux = false;
            } else {
                $('#select2-cbHingeDirection-container').removeClass("cbError");
            }
        }
        $('#select2-cbisDrill-container').removeClass("cbError");
    }

    if ($('#cbDoorType').val() == 0 || $('#cbDoorType').val() == null) {
        $('#select2-cbDoorType-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorType-container').removeClass("cbError");
    }
    if ($('#cbDoorOpt').val() == 0 || $('#cbDoorOpt').val() == null) {
        $('#select2-cbDoorOpt-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorOpt-container').removeClass("cbError");
    }
    return aux;
}

function ValidadWH() {
    var aux = true;
    if ($('#iptWidth').val() < 5 || $('#iptWidth').val() > 42) {
        $('#iptWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptWidth').removeClass("is-invalid");
    }
    if ($('#iptHeight').val() < 5 || $('#iptHeight').val() > 100) {
        $('#iptHeight').addClass("is-invalid");
        aux = false;
    } else {
        $('#iptHeight').removeClass("is-invalid");
    }
    return aux;
}

function InsertDoorsxOrder() {
    var itemCost = parseFloat($("#iptCost").val());
    var DoorQuantity = $("#CantidadFila").val();
    var DoorOp = $("#cbDoorOpt").val();
    var drillingV = ($("#cbisDrill").val() == 1) ? false : true;
    var HingeDirection = $("#cbHingeDirection").val();
    var HingePositions;
    if (drillingV == true) {
        HingeDirection = $("#cbHingeDirection").val();
        HingePositions = 0;
    } else {
        HingeDirection = 3;
        HingePositions = 2;
    }

    var datos =
         {

             pDoorsxOrder: {
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
                 isDrill: drillingV,
                 HingeDirection: { Id: HingeDirection },
                 HingePositions: { Id: HingePositions },
             }
         };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorsxOrder,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("ConfigM", "The door has been created successfully!", "");
                llenarTablaOrderSumary();
                LimpiarCamposRapidos();
                llenarheaderOrder();
            } else {
                $('#modalInsert').modal('hide');
                $('#modalConfirmOrderSummary').modal('hide');
                LlammarModal("Danger", "Error in the process.", "An error occurred when creating the door.");
            }
        },
        error: function (err) {
            $('#modalInsert').modal('hide');
            $('#modalConfirmOrderSummary').modal('hide');
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}

function HingeShow() {
    var drilling = $("#cbisDrill").val();
    if (drilling == 2) {
        $("#HingeDirectionDiv").css('display', 'block');
        //$("#HingePositionsDiv").css('display', 'block');
        HingeCalculate();
    } else {
        $("#HingeDirectionDiv").css('display', 'none');
        //$("#HingePositionsDiv").css('display', 'none');
    }
}