$(document).ready(function () {
    $(document).on('click', '#btnSAVE', function (event) {
        var idGETOr = $(this).attr('data-id');
        _IdOrderModificar = idGETOr;
        $("#editBCK").hide();
        $("#btnsave").hide();
        $('#editDXU').removeClass("active");
        $("#editBCK").trigger("click");
        $('#dxoPanel').removeClass("active");
        GetDoorsByOrderInvo(idGETOr);
    });

    $('#fc-datepicker').datepicker({
        showOtherMonths: true,
        selectOtherMonths: true
    });

    $(".read-more-target").hide();
    $("#read-less-state").hide(); 
    $("#Record_Paymend").hide();
    $("#infoMore").hide();
    $("#btOculDis").hide(); 

    $(document).on('click', "#btAdd", function () {
        $("#addFile").trigger('click');
    });

    $(document).on('click', "#btNewPay", function () {
        $("#RecordPaymend").trigger("click");
    });

    $("#RecordPaymend").on("click", function () {
        $("#Invoice").hide();
        $("#Record_Paymend").show();
    });

    $("#btCancelar").on("click", function () {
        $("#Invoice").show();
        $("#Record_Paymend").hide();
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

    $(document).on('click', "#btLinkAdd", function () {
        $("#btFile").trigger("click");
    });

    $(document).on('click', '#btModi', function (event) {
        $("#lblTituloModal").text("Modify Invoice");
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

    $("#createDoor").on('click', function () {
        $(".editDoor").trigger("click");
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
