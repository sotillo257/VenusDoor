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
$(document).ready(function () {
    $(".read-more-target").hide();
    $("#read-less-state").hide();
    $("#Record_Paymend").hide();

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

    $(document).on('click', "#btnBack", function () {
        $("#editBCK").trigger("click");
    });

    $(document).on('click', "#btNew", function () {
        $("#lblTituloModal").text("New Invoice");
        $('#datePanel').show();
        $('#editBCK').hide();
        $("#editDXU").hide();
        $("#btnsave").hide();
        $("#btnsaveDxO").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $('#doorPanel').removeClass("active");
        $('#editDXU').removeClass("active");
        $('#dxoPanel').removeClass("active");
    });

    $(document).on('click', "#editBCK", function () {
        $("#lblTituloModal").text("New Invoice");
        $('#datePanel').show();
        $('#editBCK').hide();
        $('#btContinue').show();
        $("#editDXU").hide();
        $("#btnsave").hide();
        $("#btnsaveDxO").hide();
        $("#btnBack").hide();
        $("#btnClose").hide();
        $('#doorPanel').removeClass("active");
        $('#editDXU').removeClass("active");
        $('#dxoPanel').removeClass("active");
    });

    $(document).on('click', "#btContinue", function () {
        $("#lblTituloModal").text("Create order");
        $('#doorPanel').show();
        $("#editDXU").show();
        $("#editBCK").show();
        $("#btnsave").show();
        $("#btnsaveDxO").hide();
        $("#btContinue").hide();
        $("#btnBack").show();
        $("#btnClose").show();
        $('#editDXU').removeClass("active");
        $('#dxoPanel').removeClass("active");
        $('#datePanel').removeClass("active");
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
                    option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Esimate active">';
                } else {
                    option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Esimate ">';
                }


                option += '  <div class="d-flex justify-content-between mg-b-5">';
                option += ' <div>';
                option += '   <h6 class="tx-14 mg-b-10 tx-gray-800">' + data[i].UserCliente.Person.Name + '</h6>';
                option += '</div>';
                var attach = ' ';
                if (data[i].Document > 0) {
                    attach += '<i class="icon ion-android-attach"></i>';
                }
                option += '  <h6 class="tx-14 mg-b-10 tx-gray-800">' + attach + ' $' + Moneda(data[i].Total) + '</h6>';
                option += '  </div>'
                option += '  <div class="d-flex justify-content-between mg-b-5">'
                option += '       <div>';

                var Fecha1 = new Date(parseInt(re.exec(data[i].CreationDate)[0]));
                option += '         <h6 class="tx-14 mg-b-10 tx-gray-800">' + data[i].IdFolio + ' | ' + Fecha1.ddmmyyyy() + '</h6>'
                option += '      </div>'
                option += '   <h6 class="tx-14 mg-b-10 tx-gray-800">' + data[i].Status.Description + '</h6>'
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
            if (IdEstimate == listInvoice[i].Id) {
                LlenarVistaPrincipal(listInvoice[i]);
                break;
            }
        }
    }
    $('.Invoice').removeClass("active");
    $(this).addClass("active");
    });

var claseAnterior = 'paid';
function LlenarVistaPrincipal(listEstimate) {
    GetHistoryEstmate(listEstimate.Id);
    $("#lblFolio").text(listEstimate.IdFolio);
    var Fecha1 = new Date(parseInt(re.exec(listEstimate.CreationDate)[0]));
    $("#lblFechaTitulo").text(Fecha1.ddmmyyyy());

    $('<style type="text/css">  .paid-' + listEstimate.Status.Description + ' {box-sizing:border-box; margin: calc(50vh - 170px) auto;position:relative;} .paid-' + listEstimate.Status.Description + '::before { position:absolute;' +
   ' top:13px; left:-39px; box-sizing:border-box;content:"' + listEstimate.Status.Description + '!";text-transform:uppercase; font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif;' +
    'font-size: 13px;text-align:center;font-weight: 700;color: #fff;background: transparent;height:0;width:155px;border:25px solid transparent;border-bottom:25px solid ' + Colores(listEstimate.Status.Id) + ';' +
    'transform: rotate(-45deg);line-height:23px;} </style>').appendTo("head");

    $("#divMarca").removeClass(claseAnterior);
    claseAnterior = 'paid-' + listEstimate.Status.Description;
    $("#divMarca").addClass('paid-' + listEstimate.Status.Description);
}

function GetHistoryEstmate(id) {
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
