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
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label id="Material" style="margin-top: 10px;">Wood Species: <span style="color: #868ba1" style="color: #868ba1">' + Result.Material.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label id="DoorStyle" style="margin-top: 10px;">Door Style: <span style="color: #868ba1">' + Result.DoorStyle.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            if (Result.isOverlay == false)
            {
                dxu += '<label for="Overlay" style="margin-top: 10px;">Door Place: <span style="color: #868ba1">Inset Door Type</span></label>';
            }
            else
            {
                dxu += '<label for="Overlay" style="margin-top: 10px;">Door Place: <span style="color: #868ba1">Overlay Door Type</span></label>';
            }
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="StileWidth" style="margin-top: 10px;">Stile Width: <span style="color: #868ba1">' + Result.BottomRail.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="RailWidth" style="margin-top: 10px;">Rail Width: <span style="color: #868ba1">' + Result.TopRail.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="InsideProfile" style="margin-top: 10px;">Inside Edge Profile: <span style="color: #868ba1">' + Result.InsideEdgeProfile.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="OutsideProfile" style="margin-top: 10px;">Outside Edge Profile: <span style="color: #868ba1">' + Result.OutsideEdgeProfile.Description + '</span></label>';
            dxu += '</div><!-- col -->';           
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="DoorAssembly" style="margin-top: 10px;">Door Assembly: <span style="color: #868ba1">' + Result.Join.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="PanelMaterial" style="margin-top: 10px;">Panel Material: <span style="color: #868ba1">' + Result.PanelMaterial.Description + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            if (Result.IsOpeningMeasurement == false)
            {
                dxu += '<label for="Openeing" style="margin-top: 10px;">Opening Measurement: <span style="color: #868ba1">No</span></label>';
            }
            else
            {
                dxu += '<label for="Openeing" style="margin-top: 10px;">Opening Measurement: <span style="color: #868ba1">Yes</span></label>';
            }
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="VerticalD" style="margin-top: 10px;">Vertical Divisions: <span style="color: #868ba1">' + Result.VerticalDivisions.Quantity + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            dxu += '<label for="HorizontalD" style="margin-top: 10px;">Horizontal Divisions: <span style="color: #868ba1">' + Result.HorizontalDivisions.Quantity + '</span></label>';
            dxu += '</div><!-- col -->';
            dxu += '<div class="col-xs-4 col-md-3">';
            if (Result.isDrill == false)
            {
                dxu += '<label for="Drill" style="margin-top: 10px;">Hinge Drilling: <span style="color: #868ba1">No</span></label>';
            }
            else
            {
                dxu += '<label for="Drill" style="margin-top: 10px;">Hinge Drilling: <span style="color: #868ba1">Yes</span></label>';
            }
            dxu += '</div><!-- col -->';
            if (Result.isDrill == true)
            {
                dxu += '<div class="col-xs-4 col-md-3">';
                dxu += '<label for="HingeDirection" style="margin-top: 10px;">Hinge Direction: <span style="color: #868ba1">' + Result.HingeDirection.Direction + '</span></label>';
                dxu += '</div><!-- col -->';
            }
            dxu += '<div class="col-xs-4 col-md-3">';
            if (Result.isFingerPull == false)
            {
                dxu += '<label for="Finger" style="margin-top: 10px;">Finger Pull: <span style="color: #868ba1">No</span></label>';
            }
            else
            {
                dxu += '<label for="Finger" style="margin-top: 10px;">Finger Pull: <span style="color: #868ba1">Yes</span></label>';
            }
            dxu += '</div><!-- col -->';

            var option = '<table width="100%"><thead><tr>';
            option += '<th>PREVIEW</th><th>QUANTITY</th>' +
            '<th>WIDHT</th>' +
            '<th>HEIGHT</th>' +
            '<th>PANEL STYLE</th>' +
            '<th>DOOR TYPE</th>' +
            '<th>DOOR OPTION</th>' +
            '<th>U. PRICE</th>';
            if (Result.DescuentoActivos) {
                option += '<th>DISCOUNT</th>';
            }
            option += '<th>TOTAL</th>';
            option += '</tr></thead><tbody>';           
            data = Result.DoorsxOrder;
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
                if (Result.DescuentoActivos) {
                    option += '<td>' + data[i].Descuento + '%</td>';
                }
                option += '<td><span>$</span>' + data[i].SubTotal.toString().replace(',', '.') + '</td>';
            }
            option += '</tbody></table>';
            $("#spanOrderReff").text(head);
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