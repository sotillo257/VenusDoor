$(document).ready(function () {
    $(".orderreff").click(function (e) {
        e.preventDefault();
        var id = $(this).parentsUntil('#ordenestable').find('.orderreff').attr('data-id');
        GetDoorsByOrder(id);
    });
});

function GetDoorsByOrder(id) {
    var datos =
                    {
                        IdOrder: id,
                    }

    console.log(datos);
    $.ajax({
        data: JSON.stringify(datos),
        url: urlGetDoorsByOrder,
        cache: false,
        type: 'POST',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var head = '<h5 class="modal-title" id="exampleModalLabel">Order #' + id + '</h5>'
            var table = '<table><thead><tr>';
            table +='<th>Material</th>' +
            '<th>Inside profile</th>' +
            '<th>Outside profile</th>' +
            '<th>Panel type</th>' +
            '<th>Quantity</th>' +
            '<th>Item cost</th>' +
            '<th>SubTotal</th>';
            table += '</tr></thead><tbody>';                           
            for (var i = 0; i < data.length; i++) {
                table += '<tr><td>' + data[i].Material.Description + '</td>' +
                    '<td>' + data[i].InsideEdgeProfile.Description + '</td>' +
                    '<td>' + data[i].OutsideEdgeProfile.Description + '</td>' +
                    '<td>' + data[i].Panel.Description + '</td>' +
                    '<td>' + data[i].Quantity + '</td>' +
                    '<td>' + data[i].ItemCost + '</td>' +
                    '<td>' + data[i].SubTotal + '</td></tr>';
            }
            table += '</tbody></table>';
            $("#orderhead").html(head);
            $("#ordertable").html(table);            
            $('#ModalOrderInfo').modal('toggle');
            //$("#ordertable > tbody").empty().append(option);            
        },
    });
}

function guardardatotable(Festivos) {
    var meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "junio", "julio", "Agosto", "Septiembre", "Obtubre", "Noviembre", "Diciembre"];
    var tr = '<table id="TablaFestivos" class=" striped">' +
                            '<thead>' +
                                '<tr>' +
                                    '<th data-field="name">Descripcion de dia festivo</th>' +
                                    '<th data-field="price">Dia</th>' +
                                    '<th data-field="price">Mes</th>' +
                                    '<th data-field="price">Año</th>' +
                                    '<th class="col-md-2 text-center no-sort"></th>';

    tr += '</tr></thead><tbody>';
    for (var i = 0; i < Festivos.length; i++) {
        var mes = Festivos[i].Mes;
        console.log(parseInt(mes));
        console.log(meses);
        tr += '<tr><td>' + Festivos[i].Descripcion + '</td><td>' + Festivos[i].Dia + '</td><td>' + meses[parseInt(mes) - 1] + '</td><td>' + Festivos[i].Anio + '</td>';

        tr += '<td class="col-md-2 text-center">' +
            ' <a id="editar" href="#myModal" onclick=' + "'" + 'AbrirModal(' + Festivos[i].Cod_DiaFeriado + ',"' + Festivos[i].Descripcion + '", "' + Festivos[i].TipoFeriado.Cod_Tipo + '", "' + Festivos[i].Dia + '", "' + Festivos[i].Mes + '", "' + Festivos[i].Anio + '")' + "'" + ' class="btn-edit-del"><i id="icono" class="fa fa-pencil fa-lg icon-table-edit"></i></a>' +
            '<a onclick="ModalConfirmarEliminar(' + Festivos[i].Cod_DiaFeriado + ')" class="btn-edit-del"><i id="icono" class="fa fa-times fa-lg icon-table-del"></i></a>';

        tr += '</td></tr>';
    }
    tr += '</tbody></table>';
    $("#TablaAqui").html(tr);

    PluginTabla("TablaFestivos");
}