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
            var head = '<h5 class="modal-title" id="exampleModalLabel">Details of the order <span style="color:#014d41">#' + id + '</span></h5>'
            var table = '<table width="100%"><thead><tr>';
            table +='<th>Preview</th><th>Material</th>' +
            '<th>Inside profile</th>' +
            '<th>Outside profile</th>' +
            '<th>Panel type</th>' +
            '<th>Quantity</th>' +
            '<th>Item cost</th>' +
            '<th>SubTotal</th>';
            table += '</tr></thead><tbody>';                           
            for (var i = 0; i < data.length; i++) {
                table += '<tr><td><img width="65px" src="'+ data[i].Picture +'"/></td><td>' + data[i].Material.Description + '</td>' +
                    '<td>' + data[i].InsideEdgeProfile.Description + '</td>' +
                    '<td>' + data[i].OutsideEdgeProfile.Description + '</td>' +
                    '<td>' + data[i].Panel.Description + '</td>' +
                    '<td>' + data[i].Quantity + '</td>' +
                    '<td>' + data[i].ItemCost + '$</td>' +
                    '<td>' + data[i].SubTotal + '$</td></tr>';
            }
            table += '</tbody></table>';
            $("#orderhead").html(head);
            $("#ordertable").html(table);            
            $('#ModalOrderInfo').modal('toggle');
            //$("#ordertable > tbody").empty().append(option);            
        },
    });
}