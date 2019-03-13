$(document).ready(function () {
    $(".orderreff").click(function (e) {
        //e.preventDefault();
        var id = $(this).attr('data-id');
        GetDoorsByOrder(id);
    });
});

function GetDoorsByOrder(id) {
    var datos =
                    {
                        IdOrder: id,
                    }

    $.ajax({
        data: JSON.stringify(datos),
        url: urlGetDoorsByOrder,
        cache: false,
        type: 'POST',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (data) {
            var head = '<h5 class="modal-title" id="exampleModalLabel">Details of the order <span style="color:#014d41">#' + id + '</span></h5>'
            var option = '<table width="100%"><thead><tr>';
            option += '<th>PREVIEW</th><th>QUANTITY</th>' +
            '<th>WIDHT</th>' +
            '<th>HEIGHT</th>' +
            '<th>PANEL STYLE</th>' +
            '<th>DOOR TYPE</th>' +
            '<th>DOOR OPTION</th>' +
            '<th>U. PRICE</th>'+
                '<th>TOTAL</th>';
            option += '</tr></thead><tbody>';
            for (var i = 0; i < data.length; i++) {
                option += '<tr><td><img width="65px" src="' + data[i].Picture + '"/></td>';

                option += '<td>' + data[i].Quantity.toString().replace(',', '.') + '</td>';
                option += '<td>' + Math.trunc(data[i].Width);
                if (data[i].DecimalsWidth.Value != 0) {
                    option += ' <span>' + data[i].DecimalsWidth.Description + '</span>';
                }
                option += '</td>';
                option += '<td>' + Math.trunc(data[i].Height);
                if (data[i].DecimalsHeight.Value != 0) {
                    option += ' <span>' + data[i].DecimalsHeight.Description + '</span>';
                }
                option += '</td>';
                option += '<td>' + data[i].Panel.Description + '</td>';
                option += '<td>' + data[i].DoorType.Description + '</td>';
                option += '<td>' + data[i].DoorOption.Description + '</td>';
                option += '<td><span>$</span>' + data[i].ItemCost.toString().replace(',', '.') + '</td>';
                option += '<td><span>$</span>' + data[i].SubTotal.toString().replace(',', '.') + '</td>';
            }
            option += '</tbody></table>';
            $("#orderhead").html(head);
            $("#ordertable").html(option);
            $('#ModalOrderInfo').modal('toggle');
            //$("#ordertable > tbody").empty().append(option);            
        },
    });
}