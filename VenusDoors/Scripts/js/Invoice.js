$(document).ready(function () {
    $(document).on('click', '#btnSAVE', function (event) {
        var idGETOr = $(this).attr('data-id');
        _IdOrderModificar = idGETOr;
        $("#editBCK").hide();
        $("#btnsave").hide();
        $('#editDXU').removeClass("active");
        $("#editBCK").trigger("click");
        $('#dxoPanel').removeClass("active");
        GetDoorsByOrder(idGETOr);
});

    $(".read-more-target").hide();
    $("#read-less-state").hide(); 
    $("#Record_Paymend").hide();
    $("#infoMore").hide();
    $("#btOculDis").hide();

    $(document).on('click', "#btAdd", function () {
        $("#addFile").trigger('click');
    });

    $("#RecordPaymend").on("click", function () {
        $("#Invoice").hide();
        $("#Record_Paymend").show();
    });

    $("#read-more-state").on("click", function () {
        $("#read-more-state").hide();
        $("#read-less-state").show();
        $(".read-more-target").show();
    });

    $("#read-less-state").on("click", function () {
        $("#read-more-state").show();
        $("#read-less-state").hide();
        $(".read-more-target").hide();
    });

    $("#ocultarCampo").on("click", function () {
        $(".showInput").hide();
        $(".AddComment").hide();
        $(".ocultarTitulo").show();
    });

    $("#mostrarCampo").on("click", function () {
        $(".showInput").show();
        $(".AddComment").show();
        $(".ocultarTitulo").hide();
    });

    $("#btLinkAdd").on('click', function () {
        $("#btFile").trigger("click");
    });

    $("#btnBack").on('click', function () {
        $("#createBACK").trigger("click");
    });

    $("#btDisplay").on('click', function () {
        $("#infoMore").show();
        $("#btOculDis").show();
        $("#btDisplay").hide();
    });

    $("#btOculDis").on('click', function () {
        $("#infoMore").hide();
        $("#btOculDis").hide();
        $("#btDisplay").show();
    });

    $("#btNew").on('click', function () {
        $("#lblTituloModal").text("New Invoice"); 
        $("#btnCON").show();
        $("#NEWINVOICE").show();
        $("#detailBACK").hide();
        $("#btnAtras").hide();
        $("#btSaveChan").hide();
        $('#createBACK').hide();
        $("#btnSAVE").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $("#NEWORDER").hide();
        $("#DETAILORDER").hide();
        $("#btGuardar").hide();
        $("#MODIFYOR").hide();
        $("#btCancel").hide();
    });

    $("#createBACK").on('click', function () {
        $("#lblTituloModal").text("New Invoice");
        $("#NEWINVOICE").show();
        $("#btnCON").show();
        $("#detailBACK").hide();
        $("#btnAtras").hide();
        $("#btSaveChan").hide();
        $('#createBACK').hide();
        $("#btnSAVE").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $('#NEWORDER').hide();
        $("#MODIFYOR").hide();
        $("#btGuardar").hide();
        $('#btnAtras').removeClass("active");
        $("#btCancel").hide();
    });

    $("#detailBACK").on('click', function () {
        $("#btnAtras").trigger("click");
    });

    $("#btnAtras").on('click', function () {
        $("#lblTituloModal").text("Create order");
        $("#NEWORDER").show();
        $("#createBACK").show();
        $("#btnSAVE").show();
        $("#btnBack").show();
        $("#btnClose").show();
        $("#detailBACK").hide();
        $("#createBACK").show();
        $("#btnAtras").hide();
        $("#btSaveChan").hide();
        $("#btnCON").hide();
        $("#DETAILORDER").hide();
        $("#MODIFYOR").hide();
        $("#btGuardar").hide();
        $('#createBACK').removeClass("active");
        $("#btCancel").hide();
    });

    $("#btnCON").on('click', function () {
        $("#lblTituloModal").text("Create order");
        $("#createBACK").show();
        $("#btnSAVE").show();
        $("#btnBack").show();
        $("#NEWORDER").show();
        $("#detailBACK").hide();
        $("#btnClose").show();
        $("#btnAtras").hide();
        $("#btSaveChan").hide();
        $("#btnCON").hide();
        $("#NEWINVOICE").hide();
        $("#DETAILORDER").hide();
        $("#MODIFYOR").hide();
        $("#btGuardar").hide();
        $('#createBACK').removeClass("active");
        $("#btCancel").hide();
    });

    $("#btCancel").on('click', function () {
        $("#btnSAVE").trigger("click");
    });

    $("#btnSAVE").on('click', function () {
        $("#lblTituloModal").text("Details of the order #");
        $("#btnClose").show();
        $("#btnAtras").show();
        $("#detailBACK").show();
        $('#DETAILORDER').show();
        $("#btGuardar").show();
        $("#createBACK").hide();
        $("#btnBack").hide();
        $("#btSaveChan").hide();
        $("#btnSAVE").hide();
        $("#btnCON").hide();
        $("#NEWORDER").hide();
        $("#NEWINVOICE").hide();
        $("#MODIFYOR").hide();
        $("#btCancel").hide();
    });

    $(document).on('click', '.editDoor', function (event) {
        var id = $(this).attr('data-id'); 
        $("#btGuardar").hide();
        $("#detailBACK").hide(); 
        $("#MODIFYOR").show();
        $("#btCancel").show();
        $("#btnSAVE").hide();
        $("#btnCON").hide();
        $("#btnAtras").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $("#NEWINVOICE").hide();
        $("#NEWORDER").hide();
        $("#DETAILORDER").hide();
        $('#createBACK').removeClass("active");
        $('#btnAtras').removeClass("active");
        $("#btSaveChan").show();
        QuitarClaseErrorACombos();


        for (var i = 0; i < DxOl.length; i++) {
            if (DxOl[i].Id == $(this).attr('data-id')) {


                var PictureProfile = '<img style="height: 100px;width: 235px;margin-top: 20px;" id="ProfilePicture" src="' + DxOl[i].ProfilePicture + '">';
                var PicturePanel = '<img style="width: 230px;height: 230px;" id="DoorPicture" src="' + DxOl[i].Picture + '">';
                $('#PictureProfile').html(PictureProfile);
                $('#PicturePanel').html(PicturePanel);
                $('#idDoorxO').val(DxOl[i].Id);
                $('#idDxuXO').val(DxOl[i].DoorxUser.Id);
                $('#descDXO').val(DxOl[i].Descuento);
                $('#iptWidth').val(DxOl[i].Width);
                $('#iptHeight').val(DxOl[i].Height);
                $('#CantidadFila').val(DxOl[i].Quantity);
                //$('#descDXO').val(DxOl[i].Descuento);
                if ($('#cbDoorStyle').val() != 1010) {
                    llenarComboPanelStyle(DxOl[i].Panel.Id);
                }

                llenarComboDoorType(DxOl[i].DoorType.Id);
                selectDoorOption(DxOl[i].DoorOption.Id);
                llenarComboDecimalW(DxOl[i].DecimalsWidth.Id);
                llenarComboDecimalH(DxOl[i].DecimalsHeight.Id);
                break;
            }
        }
    });

    var container = $('#Demo');
    var conta = $('#listaInvoices');

    container.pagination({
        className: 'paginationjs-theme-blue paginationjs-small',
        dataSource: listInvoice,
        callback: function (data, pagination) {
            var option = '';
            for (var i = 0; i < data.length; i++) {
                if (i == 0) {
                    if (inicio) {
                        inicio = false;
                        LlenarVistaPrincipal(data[i]);
                    option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Invoice active">';
                } else {
                        if (_IdInvoice == data[i].Id) {
                            option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Invoice active">';
                        } else {
                            option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Invoice">';
                }

                    }

                } else {
                    if (_IdInvoice == data[i].Id) {
                        option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Invoice active">';
                    } else {
                        option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Invoice">';
                    }
                }
               
                                 
                option += '  <div class="d-flex justify-content-between mg-b-5">';
                option += ' <div>';
                option += '   <h6 class="tx-14 mg-b-10 tx-gray-800">' + data[i].UserCliente.Person.Name + '</h6>';
                option += '</div>';
                var attach =' ';
                if (data[i].Document > 0) {
                    attach += '<i class="icon ion-android-attach"></i>';
                }
                option += '  <h6 class="tx-14 mg-b-10 tx-gray-800">'+attach+' $' + Moneda(data[i].TotalDue) + '</h6>';
                option +='  </div>'
                option +='  <div class="d-flex justify-content-between mg-b-5">'
                option += '       <div>';

                var Fecha1 = new Date(parseInt(re.exec(data[i].CreationDate)[0]));
                option += '         <h6 class="tx-14 mg-b-10 tx-gray-800">' + data[i].IdFolio + ' | ' + Fecha1.ddmmyyyy() + '</h6>'
                option +='      </div>'
                option += '   <h6 class="tx-14 mg-b-10 tx-gray-800" style="color: ' + Colores(data[i].Status.Id) + ';">' + data[i].Status.Description + '</h6>'
                option += '  </div>'
                option += ' </div><!-- br-mailbox-list-item -->';
            }
            conta.html(option);
        }
    });
});

$(function () {
    $('#datepickerNoOfMonths').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true,
        numberOfMonths: 2
    });

    $('#modalToggle').click(function () {
        $('#modal').modal({
            backdrop: 'static'
});
    });

})

function Colores(IdStatus) {
    var Color = "#94a5a6";
    switch (IdStatus) {
        case 13:
            Color = "#94a5a6";
            break;
        case 14:
            Color = "#15806f";
            break;
        case 15:
            Color = "#f59d00";
            break;
        case 16:
            Color = "#15806f";
            break;
        case 17:
            Color = "#15806f";
            break;
        default:

    }

    return Color;
}

function Iconos(IdType) {
    var Icono = "fa fa-sticky-note-o";
    switch (IdType) {
        case 10:
            Icono = "fa fa-plus";
            break;
        case 11:
            Icono = "fa fa-envelope-o";
            break;
        case 12:
            Icono = "fa fa-comment-o";
            break;
        case 13:
            Icono = "fa fa-file-text-o";
            break;
        case 14:
            Icono = "fa fa-paperclip";
            break;
        case 15:
            Icono = "fa fa-trash-o";
            break;
        case 16:
            Icono = "fa fa-edit";
            break;
        case 17:
            Icono = "fa fa-times";
            break;
        case 18:
            Icono = "fa fa-check";
            break;
        case 19:
            Icono = "a fa-paper-plane-o";
            break;
        case 20:
            Icono = "fa fa-usd";
            break;
        case 21:
            Icono = "fa fa-files-o";
            break;
        default:

    }

    return Icono;
}

function Moneda(entrada) {
    var resul = "";
    entrada = entrada.toString().split(".");
    var num = entrada[0];
    var nums = new Array();
    var simb = ","; //Éste es el separador
    num = num.toString();
    num = num.replace(/\D/g, "");   //Ésta expresión regular solo permitira ingresar números
    nums = num.split(""); //Se vacia el valor en un arreglo
    var long = nums.length - 1; // Se saca la longitud del arreglo
    var patron = 3; //Indica cada cuanto se ponen las comas
    var prox = 2; // Indica en que lugar se debe insertar la siguiente coma

    while (long > prox) {
        nums.splice((long - prox), 0, simb); //Se agrega la coma
        prox += patron; //Se incrementa la posición próxima para colocar la coma
    }

    for (var i = 0; i <= nums.length - 1; i++) {
        resul += nums[i]; //Se crea la nueva cadena para devolver el valor formateado
    }

    if (entrada[1] == null) {
        resul = resul + ".00";
    } else {
        resul = resul + "." + entrada[1];
    }
   
    return resul;
}
$(function () {
    'use strict';
    $('.br-mailbox-list').perfectScrollbar();

    $('#showMailBoxLeft').on('click', function (e) {
        e.preventDefault();
        if ($('body').hasClass('show-mb-left')) {
            $('body').removeClass('show-mb-left');
            $(this).find('.fa').removeClass('fa-arrow-left').addClass('fa-arrow-right');
        } else {
            $('body').addClass('show-mb-left');
            $(this).find('.fa').removeClass('fa-arrow-right').addClass('fa-arrow-left');
        }
    });
});
var meses = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic");
Date.prototype.ddmmyyyy = function () {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();

    return (dd[1] ? dd : "0" + dd[0]) + " " + meses[mm] + " " + yyyy;
};

Date.prototype.ddmmyyyyHH = function () {



    var day = this.getDate().toString();
    var month = this.getMonth().toString();
    var year = this.getFullYear().toString();
    var hour = this.getHours().toString();
    var minute = this.getMinutes().toString();
    var time = (day[1] ? day : "0" + day[0]) + " " + meses[month] + " " + year + " " + (hour[1] ? hour : "0" + hour[0]) + ':' + (minute[1] ? minute : "0" + minute[0]);
    return time;
};
var re = /-?\d+/;
var inicio = true;

function Desactivar() {
  //  $('#inStatus').removeClass("is-invalid");
    $('#inDescription').removeClass("active");
}


var _IdInvoice = 0;
$(document).on('click', '.Invoice', function (event) {
    $("#txtComment").val("");
    $(".showInput").hide();
    $(".AddComment").hide();
    $(".ocultarTitulo").show();
    $("#read-more-state").show();
    $("#read-less-state").hide();

    var IdInvoice = $(this).attr('data-id');
    _IdInvoice = $(this).attr('data-id');
    if (!$(this).hasClass("active")) {
        for (var i = 0; i < listInvoice.length; i++) {
            if (IdInvoice == listInvoice[i].Id) {
                LlenarVistaPrincipal(listInvoice[i]);
                break;
            }
        }
    }
    $('.Invoice').removeClass("active");
    $(this).addClass("active");
    });

var claseAnterior = 'paid';
//function LlenarVistaPrincipal(listInvoice) {
//    GetHistoryInvoice(listInvoice.Id);
//    $("#lblFolio").text(listInvoice.IdFolio);
//    $("#tmp_entity_number").text("# " + listInvoice.IdFolio);

//    var balancs = listInvoice.TotalDue - listInvoice.Total;
//    $("#tmp_balance_due").text("$" + Moneda(balancs));
//    $("#tmp_balance_due_bottom").text("$" + Moneda(balancs));

//    var Fecha1 = new Date(parseInt(re.exec(listInvoice.CreationDate)[0]));
//    $("#lblFechaTitulo").text(Fecha1.ddmmyyyy());
//    $("#tmp_entity_date").text(Fecha1.ddmmyyyy());

//    $("#btNameBill").text(listInvoice.UserCliente.Person.Name);

//    $('<style type="text/css">  .paid-' + listInvoice.Status.Description + ' {box-sizing:border-box; margin: calc(50vh - 170px) auto;position:relative;} .paid-' + listInvoice.Status.Description + '::before { position:absolute;' +
//   ' top:29px; left:-48px; box-sizing:border-box;content:"' + listInvoice.Status.Description + '!";text-transform:uppercase; font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif;' +
//    'font-size: 13px;text-align:center;font-weight: 700;color: #fff;background: transparent;height:0;width:155px;border:25px solid transparent;border-bottom:25px solid ' + Colores(listInvoice.Status.Id) + ';' +
//    'transform: rotate(-45deg);line-height:23px;} </style>').appendTo("head");

//    $("#divMarca").removeClass(claseAnterior);
//    claseAnterior = 'paid-' + listInvoice.Status.Description;
//    $("#divMarca").addClass('paid-' + listInvoice.Status.Description);
//    GetDoorsByOrder(listInvoice.Order.Id);
//}

function LlenarVistaPrincipal(listInvoice) {

    GetHistoryInvoice(listInvoice.Id);

    GetDoorsByOrder(listInvoice.Order.Id);

    GetDocAdjuntosInvoice(listInvoice.Id);

    $("#lblFolio").text(listInvoice.IdFolio);
    $("#tmp_entity_number").text("# " + listInvoice.IdFolio);
    var Fecha1 = new Date(parseInt(re.exec(listInvoice.CreationDate)[0]));
    $("#lblFechaTitulo").text(Fecha1.ddmmyyyy());
    $("#tmp_entity_date").text(Fecha1.ddmmyyyy());

    $("#btNameBill").text(listInvoice.UserCliente.Person.Name);

    $('<style type="text/css">  .paid-' + listInvoice.Status.Description + ' {box-sizing:border-box; margin: calc(50vh - 170px) auto;position:relative;} .paid-' + listInvoice.Status.Description + '::before { position:absolute;' +
   ' top:29px; left:-48px; box-sizing:border-box;content:"' + listInvoice.Status.Description + '!";text-transform:uppercase; font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif;' +
    'font-size: 13px;text-align:center;font-weight: 700;color: #fff;background: transparent;height:0;width:155px;border:25px solid transparent;border-bottom:25px solid ' + Colores(listInvoice.Status.Id) + ';' +
    'transform: rotate(-45deg);line-height:23px;} </style>').appendTo("head");

    $("#divMarca").removeClass(claseAnterior);
    claseAnterior = 'paid-' + listInvoice.Status.Description;
    $("#divMarca").addClass('paid-' + listInvoice.Status.Description);
}

function GetHistoryInvoice(id) {
    var datos =
         {
             idInvoice: id
         };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlGetHistoryInvoice,
        dataType: "json",
        async: true,
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result.Success) {

                MostrarHistoryAndComment(result.listHistory);

                $("#txtComment").val("");
                $(".read-more-target").hide();
            } else {
                LlammarModal("Danger", "Error.", result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Error getting History & Comments");
        },

    });
}

function MostrarHistoryAndComment(listHistory) {
    var option = '';
    var x = listHistory.length - 4;
    for (var i = 0; i < listHistory.length; i++) {
        if (i > x) {
            option += ' <li id="ember1553" class="ember-view">';
        } else {
            option += ' <li id="ember1553" class="read-more-target ember-view">';
        }

        option += '                          <div class="clearfix" data-test-title="comments-list-row">';
        option += '                               <div class="date-section pull-left">';
        option += '                                   <div class="font-xxs text-draft">';


        var Fecha1 = new Date(parseInt(re.exec(listHistory[i].CreationDate)[0]));
        option += Fecha1.ddmmyyyyHH();
        option += '                                   </div></div>';
        option += '                               <div class="comment-section pull-left">';
        option += '                                  <div class="pull-left">';
        option += '                                      <div class="txn-comment-icon circle-box"></div>';
        option += '                                    </div>';
        option += '                                    <div class="media-body" style="margin-left: 50px;">';
        option += '                                        <div class="comment">';
        option += '                                          <span class="IconStatus ' + Iconos(listHistory[i].Type.Id) + '" style="padding-right: 2px;padding-left: 6px;height: 24px;width: 26px;padding-bottom: 2px;padding-top: 3px;"></span>';
        option += '                                          <span class="description"><strong>' + listHistory[i].History + '</strong></span>';
        option += '                                          <label class="font-xs text-muted tx-12"> by ' + listHistory[i].NameCreador + '</label>';
        option += '                                     </div></div></div></div></li>';
    }

    $("#divHistoryComm").empty().append(option);

}

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
            console.log(Result);
            var tableH = '';
            tableH += '<tr style="height:32px;">';
            tableH += '<td style="padding: 5px 0px 5px 5px;width: 11%;text-align: center;" id="" class="pcs-itemtable-header pcs-itemtable-breakword">';
            tableH += 'Door Option';
            tableH += '</td>';
            tableH += '<td style="padding: 5px 10px 5px 20px;width: ;text-align: left;" id="" class="pcs-itemtable-header pcs-itemtable-breakword">';
            tableH += 'Description';
            tableH += '</td>';
            tableH += '<td style="padding: 5px 10px 5px 5px;width: 11%;text-align: right;" id="" class="pcs-itemtable-header pcs-itemtable-breakword">';
            tableH += 'Qty';
            tableH += '</td>';
            tableH += '<td style="padding: 5px 10px 5px 5px;width: 11%;text-align: right;" id="" class="pcs-itemtable-header pcs-itemtable-breakword">U. Price</td>';
            if (Result.DescuentoActivos) {
                tableH += '<td style="padding: 5px 10px 5px 5px;width: 11%;text-align: right;" id="" class="pcs-itemtable-header pcs-itemtable-breakword';
                tableH += 'Discount';
                tableH += '</td>';
            }
            tableH += '<td style="padding: 5px 10px 5px 5px;width: 15%;text-align: right;" id="" class="pcs-itemtable-header pcs-itemtable-breakword">';
            tableH += 'Sub Total';
            tableH += '</td></tr>';
            var table = '';
            for (var i = 0; i < Result.DoorsxOrder.length; i++) {
                table += ' <tr><td rowspan="1" valign="top" style="padding: 10px 0 10px 5px;text-align: center;word-wrap: break-word;" class="pcs-item-row">';
                table += Result.DoorsxOrder[i].DoorOption.Description;
                table += '</td>';
                table += '<td rowspan="1" valign="top" style="padding: 10px 0px 10px 20px;" class="pcs-item-row">';
                table += '<div><div>';
                var dec = '';
                var deci = '';
                if (Result.DoorsxOrder[i].DecimalsWidth.Value != 0) {
                    dec += ' <span>' + Result.DoorsxOrder[i].DecimalsWidth.Description + '</span>';
                }
                if (Result.DoorsxOrder[i].DecimalsHeight.Value != 0) {
                    deci += ' <span>' + Result.DoorsxOrder[i].DecimalsHeight.Description + '</span>';
                }
                table += '<span style="word-wrap: break-word;" id="tmp_item_name">Width: ' + Math.trunc(Result.DoorsxOrder[i].Width) + ' ' + dec + ', Height: ' + Math.trunc(Result.DoorsxOrder[i].Height) + ' ' + dec + '</span><br>';
                table += '<span style="white-space: pre-wrap;word-wrap: break-word;" class="pcs-item-desc" id="tmp_item_description">Panel: ' + Result.DoorsxOrder[i].Panel.Description + ', Door Type:' + Result.DoorsxOrder[i].DoorType.Description + '</span>';
                table += '</div></div></td>';
                table += '<td rowspan="1" class="pcs-item-row lineitem-column text-align-right">';
                table += '<span id="tmp_item_qty">' + Result.DoorsxOrder[i].Quantity.toString().replace(',', '.') + '</span>';
                table += '</td>';
                table += '<td rowspan="1" class="pcs-item-row lineitem-column text-align-right"><span>$</span>' + Moneda(Result.DoorsxOrder[i].ItemCost) + '</td>';
                if (Result.DescuentoActivos) {
                    table += '<td rowspan="1" class="pcs-item-row lineitem-column text-align-right">';
                    table += '<span id="tmp_item_rate">' + Result.DoorsxOrder[i].Descuento + '%</span>';
                    table += '</td>';
                }
                table += '<td rowspan="1" class="pcs-item-row lineitem-column lineitem-content-right text-align-right">';
                table += '<span id="tmp_item_amount"><span>$</span>' + Moneda(Result.DoorsxOrder[i].SubTotal) + '</span>';
                table += '</td></tr>';
            }
            $("#tmp_subtotal").text('$' + Moneda(Result.Order.SubTotal));
            $("#tmp_Tax").text('$' + Moneda(Result.Order.Tax));
            $("#tmp_total").text('$' + Moneda(Result.Order.Total));
            $("#tmp_Notes").text(Result.Order.Observations);

            $("#tbInvoice > thead").empty().append(tableH);
            $("#tbInvoice > tbody").empty().append(table);

        },
    });
}

function GetDocAdjuntosInvoice(id) {
    var datos =
         {
             idInvoice: id
         };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlGetDocAdjuntosInvoice,
        dataType: "json",
        async: true,
        contentType: 'application/json; charset=utf-8',
        success: function (result) {
            if (result.Success) {
                var option = '';
                var x = result.listDocAdj.length;
                option += ' <a id="closeMail" href="" class="nav-link pd-x-5 mg-l-15">';
                option += ' <i class="fa fa-paperclip"></i> ';
                option += x + ' Attachment(s) added';
                option += ' </a>';
                $("#divDocumentosAdjuntos").html(option);
            } else {
                LlammarModal("Danger", "Error.", result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Error getting History & Comments");
        },

    });
}

//function GetDoorsByOrder(idOrden) {
//    var datos =
//                    {
//                        IdOrder: idOrden,
//                    }
//    $.ajax({
//        data: JSON.stringify(datos),
//        url: urlGetDoorsByOrder,
//        cache: false,
//        type: 'POST',
//        async: false,
//        contentType: 'application/json; charset=utf-8',
//        success: function (Result) {
//            _IdDoorxUser = Result.Order.Id;
//            $('#idDxUorder').val(Result.Id);
//            $('#descDXU').val(Result.Order.Descuento);
//            var fingerPull = Result.isFingerPull;
//            if (fingerPull == false) {
//                fingerPull = 1;
//            } else {
//                fingerPull = 2;
//            }
           
//            var info = "";
//            info += '<tr>';
//            info += '<td>' + Result.User.Person.Name + ' ' + Result.User.Person.Lastname + '</td>';
//            info += '<td>' + Result.User.Email + '</td>';
//            info += '<td>' + Result.User.Person.Telephone + '</td>';
//            info += '<td>' + Result.User.Person.Direction + '</td>';
//            info += '</tr>';

//            var dxu = '';
//            //Primera fila
//            dxu += '<tr>';
//            dxu += '<td>Wood Species: <span style="color: #868ba1">' + Result.Material.Description + '</span></td>';
//            dxu += '<td>Door Style: <span style="color: #868ba1">' + Result.DoorStyle.Description + '</span></td>';
//            if (Result.isOverlay == false) {
//                dxu += '<td>Door Place: <span style="color: #868ba1">Inset Door Type</span></td>';
//            }
//            else {
//                dxu += '<td>Door Place: <span style="color: #868ba1">Overlay Door Type</span></td>';
//            }
//            dxu += '<td>Stile Width: <span style="color: #868ba1">' + Result.BottomRail.Description + '</span></td>';
//            dxu += '</tr>';

//            //Segunda fila
//            dxu += '<tr>';
//            dxu += '<td>Rail Width: <span style="color: #868ba1">' + Result.TopRail.Description + '</span></td>';
//            dxu += '<td>Inside Edge Profile: <span style="color: #868ba1">' + Result.InsideEdgeProfile.Description + '</span></td>';
//            dxu += '<td>Outside Edge Profile: <span style="color: #868ba1">' + Result.OutsideEdgeProfile.Description + '</span></td>';
//            dxu += '<td>Door Assembly: <span style="color: #868ba1">' + Result.Join.Description + '</span></td>';
//            dxu += '</tr>';

//            //tercera fila
//            dxu += '<tr>';
//            dxu += '<td>Panel Material: <span style="color: #868ba1">' + Result.PanelMaterial.Description + '</span></td>';
//            if (Result.IsOpeningMeasurement == false) {
//                dxu += '<td>Opening Measurement: <span style="color: #868ba1">No</span></td>';
//            }
//            else {
//                dxu += '<td>Opening Measurement: <span style="color: #868ba1">Yes</span></td>';
//            }
//            dxu += '<td>Vertical Divisions: <span style="color: #868ba1">' + Result.VerticalDivisions.Quantity + '</span></td>';
//            dxu += '<td>Horizontal Divisions: <span style="color: #868ba1">' + Result.HorizontalDivisions.Quantity + '</span></td>';
//            dxu += '</tr>';

//            //Cuarta fila
//            dxu += '<tr>';
//            if (Result.isDrill == false) {
//                dxu += '<td>Hinge Drilling: <span style="color: #868ba1">No</span></td>';
//            }
//            else {
//                dxu += '<td>Hinge Drilling: <span style="color: #868ba1">Yes (' + Result.HingeDirection.Direction + ')</span></td>';
//            }
//            if (Result.isFingerPull == false) {
//                dxu += '<td style="border-right: 1px solid #ADADAD;">Finger Pull: <span style="color: #868ba1">No</span></td>';
//            }
//            else {
//                dxu += '<td style="border-right: 1px solid #ADADAD;">Finger Pull: <span style="color: #868ba1">Yes</span></td>';
//            }
//            dxu += '<td colspan="2"><textarea disabled rows="1" style="background: #fff!important" class="form-control">Observations: ' + Result.Order.Observations + '</textarea></td>';
//            dxu += '</tr>';

//            var option = '<table id="ordertable" style="width:100%">';
//            option += '<thead><tr>';
//            option += '<th>PREVIEW</th>';
//            option += '<th>QUANTITY</th>';
//            option += '<th>WIDHT</th>';
//            option += '<th>HEIGHT</th>';
//            option += '<th>PANEL STYLE</th>';
//            option += '<th>DOOR TYPE</th>';
//            option += '<th>DOOR OPTION</th>';
//            option += '<th>U. PRICE</th>';
//            if (Result.DescuentoActivos) {
//                option += '<th>DISCOUNT</th>';
//            }
//            option += '<th>TOTAL</th>';
//            option += '<th><i class="fa fa-flash"></i></th></tr></thead><tbody>';
//            DxOl = Result.DoorsxOrder;
//            for (var i = 0; i < Result.DoorsxOrder.length; i++){
                
//                        option += '<tr><td><img width="65px" src="' + Result.DoorsxOrder[i].Picture + '"/></td>';

//                        option += '<td>' + Result.DoorsxOrder[i].Quantity.toString().replace(',', '.') + '</td>';
//                        option += '<td>' + Math.trunc(Result.DoorsxOrder[i].Width);
//                        if (Result.DoorsxOrder[i].DecimalsWidth.Value != 0) {
//                            option += ' <span>' + Result.DoorsxOrder[i].DecimalsWidth.Description + '</span>';
//                        }
//                        option += '</td>';
//                        option += '<td>' + Math.trunc(Result.DoorsxOrder[i].Height);
//                        if (Result.DoorsxOrder[i].DecimalsHeight.Value != 0) {
//                            option += ' <span>' + Result.DoorsxOrder[i].DecimalsHeight.Description + '</span>';
//                        }
//                        option += '</td>';
//                        option += '<td>' + Result.DoorsxOrder[i].Panel.Description + '</td>';
//                        option += '<td>' + Result.DoorsxOrder[i].DoorType.Description + '</td>';
//                        option += '<td>' + Result.DoorsxOrder[i].DoorOption.Description + '</td>';
//                        option += '<td><span>$</span>' + Result.DoorsxOrder[i].ItemCost.toString().replace(',', '.') + '</td>';
//                        if (Result.DescuentoActivos) {
//                            option += '<td>' + Result.DoorsxOrder[i].Descuento + '%</td>';
//                        }
//                        option += '<td><span>$</span>' + Result.DoorsxOrder[i].SubTotal.toString().replace(',', '.') + '</td>';
//                        if (Result.Order.Status.Id == 5) {
//                            option += '<td><button title="Edit Door" data-id="' + Result.DoorsxOrder[i].Id + '"data-toggle="tab" href="#MODIFYOR" role="tab"  class="editDoor Cursor btn btn-primary btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-edit"></i></button></td>';
//                        } else {
//                            option += '<td><button title="Not available" disabled data-id="" data-toggle="tab" href="#MODIFYOR" role="tab"  class="editDoor btn btn-primary btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-edit"></i></button></td>';
//                        }
//                        option += '</tr>';
//                    }

//            option += '</tbody></table>';
//            $("#orreff").text(idOrden);
//            $("#divTable").empty().append(option);
//            $("#HeaderOptions > tbody").empty().append(dxu);
//            $("#UserOrderInfo > tbody").empty().append(info);
//            if (Result.Order.Status.Id == 5) {
//                $("#editDXU").show();
//            } else {
//                $("#editDXU").hide();
//            }
//        },
//});
//    }