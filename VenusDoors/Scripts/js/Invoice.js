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

var re = /-?\d+/;
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
    var conta = $('#conta');

    container.pagination({
        className: 'paginationjs-theme-blue paginationjs-small',
        dataSource: listInvoice,
        callback: function (data, pagination) {
            var option = '';
            for (var i = 0; i < data.length; i++) {
                if (i == 0) {
                    option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Invoice active">';
                } else {
                    option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Invoice ">';
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
