$(document).ready(function () {
    $("#SendMs").hide();
    $("#infoMore").hide();
    $("#btOculDis").hide();

    $("#Send").on('click', function () {
        $("#SendMs").show();
        $("#Payments").hide();
    });

    $("#btVolver").on("click", function () {
        $("#SendMs").hide();
        $("#Payments").show();
    });

    $(document).on('click', "#btLinkAdd", function () {
        $("#btFile").trigger("click");
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
                var attach = ' ';
                if (data[i].Document > 0) {
                    attach += '<i class="icon ion-android-attach"></i>';
                }
                option += '  <h6 class="tx-14 mg-b-10 tx-gray-800">' + attach + ' $' + Moneda(data[i].TotalDue) + '</h6>';
                option += '  </div>'
                option += '  <div class="d-flex justify-content-between mg-b-5">'
                option += '       <div>';

                var Fecha1 = new Date(parseInt(re.exec(data[i].CreationDate)[0]));
                option += '         <h6 class="tx-14 mg-b-10 tx-gray-800">' + data[i].IdFolio + ' | ' + Fecha1.ddmmyyyy() + '</h6>'
                option += '      </div>'
                option += '   <h6 class="tx-14 mg-b-10 tx-gray-800" style="color: ' + Colores(data[i].Status.Id) + ';">' + data[i].Status.Description + '</h6>'
                option += '  </div>'
                option += ' </div><!-- br-mailbox-list-item -->';
            }
            conta.html(option);
        }
    });
});
