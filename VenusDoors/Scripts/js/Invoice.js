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

$(function () {
    $("#add").click(function () {
        var n = $('tr:last', $("#mitabla")).length;
        var tds = '<tr>';
        for (var i = 0; i < n; i++) {
            tds += '<td> </td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td><div contenteditable></div></td>';
            tds += '<td></td>';
        }
        tds += '</tr>';
        $("#mitabla").append(tds);
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

$(document).ready(function () {
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
        $('#btnAtras').removeClass("active");
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
        $('#createBACK').removeClass("active");
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
        $('#createBACK').removeClass("active");
    });

    $("#btnSAVE").on('click', function () {
        $("#lblTituloModal").text("Details of the order #");
        $("#btnClose").show();
        $("#btnAtras").show();
        $("#detailBACK").show();
        $('#DETAILORDER').show();
        $("#createBACK").hide();
        $("#btnBack").hide();
        $("#btSaveChan").hide();
        $("#btnSAVE").hide();
        $("#btnCON").hide();
        $("#NEWORDER").hide();
        $("#NEWINVOICE").hide();
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
function LlenarVistaPrincipal(listInvoice) {
    GetHistoryInvoice(listInvoice.Id);
    $("#lblFolio").text(listInvoice.IdFolio);
    $("#tmp_entity_number").text("# " + listInvoice.IdFolio);

    var balancs = listInvoice.TotalDue - listInvoice.Total;
    $("#tmp_balance_due").text("$" + Moneda(balancs));
    $("#tmp_balance_due_bottom").text("$" + Moneda(balancs));

    var Fecha1 = new Date(parseInt(re.exec(listInvoice.CreationDate)[0]));
    $("#lblFechaTitulo").text(Fecha1.ddmmyyyy());
    $("#tmp_entity_date").text(Fecha1.ddmmyyyy());

    $("#btNameBill").text(listInvoice.UserCliente.Person.Name);

    $('<style type="text/css">  .paid-' + listInvoice.Status.Description + ' {box-sizing:border-box; margin: calc(50vh - 170px) auto;position:relative;} .paid-' + listInvoice.Status.Description + '::before { position:absolute;' +
   ' top:13px; left:-39px; box-sizing:border-box;content:"' + listInvoice.Status.Description + '!";text-transform:uppercase; font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif;' +
    'font-size: 13px;text-align:center;font-weight: 700;color: #fff;background: transparent;height:0;width:155px;border:25px solid transparent;border-bottom:25px solid ' + Colores(listInvoice.Status.Id) + ';' +
    'transform: rotate(-45deg);line-height:23px;} </style>').appendTo("head");

    $("#divMarca").removeClass(claseAnterior);
    claseAnterior = 'paid-' + listInvoice.Status.Description;
    $("#divMarca").addClass('paid-' + listInvoice.Status.Description);
    GetDoorsByOrder(listInvoice.Order.Id);
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
                var option = '';
                var x = result.listHistory.length - 4;
                for (var i = 0; i < result.listHistory.length; i++) {
                    if (i > x) {
                        option += ' <li id="ember1553" class="ember-view">';
                    } else {
                        option += ' <li id="ember1553" class="read-more-target ember-view">';
                    }

                    option += '                          <div class="clearfix" data-test-title="comments-list-row">';
                    option += '                               <div class="date-section pull-left">';
                    option += '                                   <div class="font-xxs text-draft">';


                    var Fecha1 = new Date(parseInt(re.exec(result.listHistory[i].CreationDate)[0]));
                    option += Fecha1.ddmmyyyyHH();
                    option += '                                   </div></div>';
                    option += '                               <div class="comment-section pull-left">';
                    option += '                                  <div class="pull-left">';
                    option += '                                      <div class="txn-comment-icon circle-box"></div>';
                    option += '                                    </div>';
                    option += '                                    <div class="media-body" style="margin-left: 50px;">';
                    option += '                                        <div class="comment">';
                    option += '                                          <span class="IconStatus ' + Iconos(result.listHistory[i].Type.Id) + '" style="padding-right: 2px;padding-left: 6px;height: 24px;width: 26px;padding-bottom: 2px;padding-top: 3px;"></span>';
                    option += '                                          <span class="description"><strong>' + result.listHistory[i].History + '</strong></span>';
                    option += '                                          <label class="font-xs text-muted tx-12"> by ' + result.listHistory[i].NameCreador + '</label>';
                    option += '                                     </div></div></div></div></li>';
                }

                $("#divHistoryComm").empty().append(option);
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