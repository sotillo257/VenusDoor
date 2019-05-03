$(document).ready(function () {
    $(".orderreff").click(function (e) {
        //e.preventDefault();
        var id = $(this).attr('data-id');       
        GetDoorsByOrder(id);
    });
    $(document).on('click', '.Descarga', function (event) {
        var id = $(this).attr('data-id');
        DescargarOderPDF(id);
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
        success: function (Result) {            
            var head = id;
            var dxu = '';
            //Primera fila
            dxu += '<tr>';
            dxu += '<td>Wood Species: <span style="color: #868ba1">' + Result.Material.Description + '</span></td>';
            dxu += '<td>Door Style: <span style="color: #868ba1">' + Result.DoorStyle.Description + '</span></td>';
            if (Result.isOverlay == false) {
                dxu += '<td>Door Place: <span style="color: #868ba1">Inset Door Type</span></td>';
            }
            else {
                dxu += '<td>Door Place: <span style="color: #868ba1">Overlay Door Type</span></td>';
            }
            dxu += '<td>Stile Width: <span style="color: #868ba1">' + Result.BottomRail.Description + '</span></td>';
            dxu += '</tr>';

            //Segunda fila
            dxu += '<tr>';
            dxu += '<td>Rail Width: <span style="color: #868ba1">' + Result.TopRail.Description + '</span></td>';
            dxu += '<td>Inside Edge Profile: <span style="color: #868ba1">' + Result.InsideEdgeProfile.Description + '</span></td>';
            dxu += '<td>Outside Edge Profile: <span style="color: #868ba1">' + Result.OutsideEdgeProfile.Description + '</span></td>';
            dxu += '<td>Door Assembly: <span style="color: #868ba1">' + Result.Join.Description + '</span></td>';
            dxu += '</tr>';

            //tercera fila
            dxu += '<tr>';
            dxu += '<td>Panel Style: <span style="color: #868ba1">' + Result.Panel.Description + '</span></td>';
            dxu += '<td>Panel Material: <span style="color: #868ba1">' + Result.PanelMaterial.Description + '</span></td>';
            if (Result.IsOpeningMeasurement == false) {
                dxu += '<td>Opening Measurement: <span style="color: #868ba1">No</span></td>';
            }
            else {
                dxu += '<td>Opening Measurement: <span style="color: #868ba1">Yes</span></td>';
            }
            dxu += '<td>Vertical Divisions: <span style="color: #868ba1">' + Result.VerticalDivisions.Quantity + '</span></td>';
            dxu += '</tr>';

            //Cuarta fila
            dxu += '<tr>';
            dxu += '<td>Horizontal Divisions: <span style="color: #868ba1">' + Result.HorizontalDivisions.Quantity + '</span></td>';
            if (Result.isDrill == false) {
                dxu += '<td>Hinge Drilling: <span style="color: #868ba1">No</span></td>';
            }
            else {
                dxu += '<td>Hinge Drilling: <span style="color: #868ba1">Yes</span></td>';
            }
            if (Result.isFingerPull == false) {
                dxu += '<td style="border-right: 1px solid #ADADAD;">Finger Pull: <span style="color: #868ba1">No</span></td>';
            }
            else {
                dxu += '<td style="border-right: 1px solid #ADADAD;">Finger Pull: <span style="color: #868ba1">Yes</span></td>';
            }            
            dxu += '</tr>';

            var option = '<table id="ordertable" style="width:100%">';
            option += '<thead><tr>';
            option += '<th>PREVIEW</th>';
            option += '<th>QUANTITY</th>';
            option += '<th>WIDHT</th>';
            option += '<th>HEIGHT</th>';
            if (Result.isDrill == true) {
                option += '<th>HINGE DIRECTION</th>';
            }
            option += '<th>DOOR TYPE</th>';
            option += '<th>DOOR OPTION</th>';
            option += '<th>U. PRICE</th>';
            if (Result.DescuentoActivos) {
                option += '<th>DISCOUNT</th>';
            }
            option += '<th>TOTAL</th>';            
            option += '</tr></thead><tbody>';
            DxOl = Result.DoorsxOrder;
            for (var i = 0; i < Result.DoorsxOrder.length; i++) {
                option += '<tr><td><img width="65px" src="' + Result.DoorsxOrder[i].Picture + '"/></td>';

                option += '<td>' + Result.DoorsxOrder[i].Quantity.toString().replace(',', '.') + '</td>';
                option += '<td>' + Math.trunc(Result.DoorsxOrder[i].Width);
                if (Result.DoorsxOrder[i].DecimalsWidth.Value != 0) {
                    option += ' <span>' + Result.DoorsxOrder[i].DecimalsWidth.Description + '</span>';
                }
                option += '</td>';
                option += '<td>' + Math.trunc(Result.DoorsxOrder[i].Height);
                if (Result.DoorsxOrder[i].DecimalsHeight.Value != 0) {
                    option += ' <span>' + Result.DoorsxOrder[i].DecimalsHeight.Description + '</span>';
                }
                option += '</td>';
                if (Result.isDrill == true) {
                    option += '<td>' + Result.DoorsxOrder[i].HingeDirection.Direction + '</td>';
                }
                option += '<td>' + Result.DoorsxOrder[i].DoorType.Description + '</td>';
                option += '<td>' + Result.DoorsxOrder[i].DoorOption.Description + '</td>';
                option += '<td><span>$</span>' + Result.DoorsxOrder[i].ItemCost.toString().replace(',', '.') + '</td>';
                if (Result.DescuentoActivos) {
                    option += '<td>' + Result.DoorsxOrder[i].Descuento + '%</td>';
                }
                option += '<td><span>$</span>' + Result.DoorsxOrder[i].SubTotal.toString().replace(',', '.') + '</td>';                
                option += '</tr>';
            }
            option += '</tbody></table>';
            $("#orreff").text(head);
            $("#ordertable").html(option);
            $("#HeaderOptions").html(dxu);
            $('#ModalOrderInfo').modal('toggle');
            //$("#ordertable > tbody").empty().append(option);            
        },
    });
}

function DescargarOderPDF(id) {
    var datos ={ idOrder: id };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlDescargarOderPDF,      
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {              
                //window.location.href = data;
                var link = document.createElement("a");
                link.download = "Order "+ id+".pdf";
                link.href = data;
                link.click();
            }
            else {
                LlammarModal("Danger", "Error Download PDF", " ");
            }
        },
        error: function (err) {
            console.log(err);
            LlammarModal("Danger", "Error.", "");
        }
    });
}