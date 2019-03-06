function AddFilaTablaOrderSumary() {
	var result = '';
	var option = '';
	option += '<tr>';
	option += '<td><img style="width: 80px;" src="' + data.OrderSumary[i].Picture + '"></td>';
	option += '<td>' + data.OrderSumary[i].Quantity.toString().replace(',', '.') + '</td>';
	option += '<td>' + Math.trunc(data.OrderSumary[i].Width) + ' ' + data.OrderSumary[i].DecimalsWidth.Description + '</td>';
	option += '<td>' + Math.trunc(data.OrderSumary[i].Height) + ' ' + data.OrderSumary[i].DecimalsHeight.Description + '</td>';
	option += '<td>' + data.OrderSumary[i].DoorStyle.Description + '</td>';
	option += '<td>' + data.OrderSumary[i].Material.Description + '</td>';
	option += '<td>' + data.OrderSumary[i].Panel.Description + '</td>';
	option += '<td>' + data.OrderSumary[i].DoorOption.Description + '</td>';
	option += '<td><span>$</span>' + data.OrderSumary[i].ItemCost.toString().replace(',', '.') + '</td>';
	option += '<td><span>$</span>' + data.OrderSumary[i].SubTotal.toString().replace(',', '.') + '</td>';
	option += '<td id="tddelete" style="display: flex; padding-top: 35px;">';
	option += '  <button class="Cursor Details btn btn-primary btn-icon" data-toggle="modal" data-target="#modalInsert" data-id="' + data.OrderSumary[i].Id + '" style="width: 37px;height: 37px;" type="submit"><i class="fa fa-list"></i></button>';
	option += '<button class="Cursor btn btn-danger btn-icon btnn-dele" data-id="' + data.OrderSumary[i].Id + '" style="width: 37px;height: 37px; margin-left: 10px;" type="submit"><i class="fa fa-trash"></i></button>';
	option += '</td></tr>';
	result += '<input hidden id="idorder" value="' + data.Order.Id + '" />';
	result += '<input hidden id="idtotal" value="' + data.Order.Total + '" />';
	result += '<input hidden id="idstatus" value="' + data.Order.Status.Id + '" />';
	result += '<div class="col-md-7">';
	result += '<h5 id="lblSubtotal" style="color:#7b7979">Sub-Total: <span>$</span>' + data.Order.SubTotal.toString().replace(',', '.') + '</h5>';
	result += '<h5 id="lblTax" style="color:#7b7979">Tax: <span>$</span>' + data.Order.Tax.toString().replace(',', '.') + '</h5>';
	result += '<h3 id="lblTotal" style="color:#000">Total Price: <span>$</span>' + data.Order.Total.toString().replace(',', '.') + '</h3>';
	result += '</div><div class="col-md-5"><center style="text-align: right; margin-top: 20px;"><button id="btn-continue" style="margin-left: 10px;" disabled type="submit" src="#" class="Cursor btn btn-primary" title="">Send order</button></center></div>';

	$("#Resultados").html(result);
	$("#btn-continue").prop('disabled', false);
	$("#idOrderSummary > tbody").empty().append(option);

}