$(document).ready(function () {
    $(".AddComment").hide();
    $(".showInput").hide();
    $(".read-more-target").hide();
    $("#read-less-state").hide();
    $(document).on('click', "#btAdd", function () {
        $("#addFile").trigger('click');
    });

    $(document).on('click', "#btAddComment", function () {
        if ($("#txtComment").val() != "" && $("#txtComment").val() != null) {
            InsertComment($("#txtComment").val());
        }
        
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
});

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

    var container = $('#Demo');
    var conta = $('#conta');
    
    container.pagination({
        className: 'paginationjs-theme-blue paginationjs-small',
        dataSource: listEstimate,
        callback: function (data, pagination) {
            var option = '';
            for (var i = 0; i < data.length; i++) {
                if (i == 0) {
                    if (inicio) {
                        inicio = false;
                        LlenarVistaPrincipal(data[i]);
                        option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Esimate active">';
                    } else {
                        if (_IdEstimate == data[i].Id) {
                            option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Esimate active">';
                        } else {
                            option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Esimate">';
                        }
                       
                    }
                   
                } else {
                    if (_IdEstimate == data[i].Id) {
                        option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Esimate active">';
                    } else {
                        option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Esimate">';
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
                option += '  <h6 class="tx-14 mg-b-10 tx-gray-800">'+attach+' $' + Moneda(data[i].Total) + '</h6>';
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
var _IdEstimate = 0;
$(document).on('click', '.Esimate', function (event) {
    $("#txtComment").val("");
    $(".showInput").hide();
    $(".AddComment").hide();
    $(".ocultarTitulo").show();
    $("#read-more-state").show();
    $("#read-less-state").hide();
   
    var IdEstimate = $(this).attr('data-id');
    _IdEstimate = $(this).attr('data-id');
    if (!$(this).hasClass("active")) {
        for (var i = 0; i < listEstimate.length; i++) {
        if (IdEstimate == listEstimate[i].Id) {
            LlenarVistaPrincipal(listEstimate[i]);
            break;
        }
    }
    }
    $('.Esimate').removeClass("active");
    $(this).addClass("active");
});
var claseAnterior = 'paid';
function LlenarVistaPrincipal(listEstimate) {
    GetHistoryEstmate(listEstimate.Id);
    $("#lblFolio").text(listEstimate.IdFolio);
    $("#tmp_entity_number").text("# "+listEstimate.IdFolio);    
    var Fecha1 = new Date(parseInt(re.exec(listEstimate.CreationDate)[0]));
    $("#lblFechaTitulo").text(Fecha1.ddmmyyyy());
    $("#tmp_entity_date").text(Fecha1.ddmmyyyy());
    
    $("#btNameBill").text(listEstimate.UserCliente.Person.Name);
    
    $('<style type="text/css">  .paid-' + listEstimate.Status.Description + ' {box-sizing:border-box; margin: calc(50vh - 170px) auto;position:relative;} .paid-' + listEstimate.Status.Description + '::before { position:absolute;' +
   ' top:13px; left:-39px; box-sizing:border-box;content:"' + listEstimate.Status.Description + '!";text-transform:uppercase; font-family:"Segoe UI", Tahoma, Geneva, Verdana, sans-serif;' +
    'font-size: 13px;text-align:center;font-weight: 700;color: #fff;background: transparent;height:0;width:155px;border:25px solid transparent;border-bottom:25px solid ' + Colores(listEstimate.Status.Id) + ';' +
    'transform: rotate(-45deg);line-height:23px;} </style>').appendTo("head");
   
    $("#divMarca").removeClass(claseAnterior);
    claseAnterior = 'paid-' + listEstimate.Status.Description;
    $("#divMarca").addClass('paid-' + listEstimate.Status.Description);
}

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

function ToJavaScriptDate(value) {
    var pattern = /Date\(([^)]+)\)/;
    var results = pattern.exec(value);
    console.log(results);
    console.log(parseFloat(results[1]));
    var date = new Date(parseFloat(results[1]));
    var meses = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dic");
    var day = date.getDay();
    var month = date.getMonth();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minute = date.getMinutes();
    var time = day + " " + meses[month] + " " + year + " " + hour + ':' + minute;
    return time;
}

function GetHistoryEstmate(id) {
    var datos =
         {
             idEstimate: id         
    };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlGetHistoryEstimate,
        dataType: "json",
        async : true,
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
}

function InsertComment(Comment) {
    var datos =
         {
             Comment: Comment, //
             IdEstimate: _IdEstimate
         };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertComment,
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
                option += '                                          <span class="description">' + result.listHistory[i].History + '</span>';
                option += '                                          <label class="font-xs text-muted">by <strong>' + result.listHistory[i].NameCreador + '</strong></label>';
                option += '                                     </div></div></div></div></li>';
            }

            $("#divHistoryComm").empty().append(option);

            $(".showInput").hide();
            $(".AddComment").hide();
            $(".ocultarTitulo").show();
            } else {
                LlammarModal("Danger", "Error.", result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Error inserting the comment");
        },

    });
}

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

function GetDoorsByOrder(idOrden) {
    var datos =
                    {
                        IdOrder: idOrden,
                    }
    $.ajax({
        data: JSON.stringify(datos),
        url: urlGetDoorsByOrder,
        cache: false,
        type: 'POST',
        async: false,
        contentType: 'application/json; charset=utf-8',
        success: function (Result) {
            _IdDoorxUser = Result.Order.Id;
            $('#idDxUorder').val(Result.Id);
            $('#descDXU').val(Result.Order.Descuento);
            var fingerPull = Result.isFingerPull;
            if (fingerPull == false) {
                fingerPull = 1;
            } else {
                fingerPull = 2;
            }
            llenarComboFinger(fingerPull);

            var isDrill = Result.isDrill;
            if (isDrill == false) {
                isDrill = 1;
            } else {
                isDrill = 2;
            }
            llenarComboIsDrill(isDrill);
            HingeCalculate();
            HingeShow();

            var isOpen = Result.IsOpeningMeasurement;
            if (isOpen == false) {
                isOpen = 1;
            } else {
                isOpen = 2;
            }
            llenarComboIsOpen(isOpen);

            var isOver = Result.isOverlay;
            if (isOver == false) {
                isOver = 1;
            } else {
                isOver = 2;
            }
            checkIsOverlay(isOver);
            llenarComboMaterial(Result.Material.Id);
            llenarComboDoorStyle(Result.DoorStyle.Id);
            llenarComboIEP(Result.InsideEdgeProfile.Id);
            llenarComboOEP(Result.OutsideEdgeProfile.Id);
            llenarComboStileWidth(Result.BottomRail.Id);
            llenarComboRailWidth(Result.TopRail.Id);
            llenarComboDoorAssembly(Result.Join.Id);
            llenarComboPanelMaterial(Result.Material.Id);
            llenarComboVerticalDivisions(Result.VerticalDivisions.Id);
            llenarComboHorizontalDivisions(Result.HorizontalDivisions.Id);
            llenarComboHingeDirection(Result.HingeDirection.Id);
            ChangeDoorStylePanel(Result.DoorStyle.Id);

            var info = "";
            info += '<tr>';
            info += '<td>' + Result.User.Person.Name + ' ' + Result.User.Person.Lastname + '</td>';
            info += '<td>' + Result.User.Email + '</td>';
            info += '<td>' + Result.User.Person.Telephone + '</td>';
            info += '<td>' + Result.User.Person.Direction + '</td>';
            info += '</tr>';

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
            dxu += '<td>Panel Material: <span style="color: #868ba1">' + Result.PanelMaterial.Description + '</span></td>';
            if (Result.IsOpeningMeasurement == false) {
                dxu += '<td>Opening Measurement: <span style="color: #868ba1">No</span></td>';
            }
            else {
                dxu += '<td>Opening Measurement: <span style="color: #868ba1">Yes</span></td>';
            }
            dxu += '<td>Vertical Divisions: <span style="color: #868ba1">' + Result.VerticalDivisions.Quantity + '</span></td>';
            dxu += '<td>Horizontal Divisions: <span style="color: #868ba1">' + Result.HorizontalDivisions.Quantity + '</span></td>';
            dxu += '</tr>';

            //Cuarta fila
            dxu += '<tr>';
            if (Result.isDrill == false) {
                dxu += '<td>Hinge Drilling: <span style="color: #868ba1">No</span></td>';
            }
            else {
                dxu += '<td>Hinge Drilling: <span style="color: #868ba1">Yes (' + Result.HingeDirection.Direction + ')</span></td>';
            }
            if (Result.isFingerPull == false) {
                dxu += '<td style="border-right: 1px solid #ADADAD;">Finger Pull: <span style="color: #868ba1">No</span></td>';
            }
            else {
                dxu += '<td style="border-right: 1px solid #ADADAD;">Finger Pull: <span style="color: #868ba1">Yes</span></td>';
            }
            dxu += '<td colspan="2"><textarea disabled rows="1" style="background: #fff!important" class="form-control">Observations: ' + Result.Order.Observations + '</textarea></td>';
            dxu += '</tr>';

            var option = '<table id="ordertable" style="width:100%">';
            option += '<thead><tr>';
            option += '<th>PREVIEW</th>';
            option += '<th>QUANTITY</th>';
            option += '<th>WIDHT</th>';
            option += '<th>HEIGHT</th>';
            option += '<th>PANEL STYLE</th>';
            option += '<th>DOOR TYPE</th>';
            option += '<th>DOOR OPTION</th>';
            option += '<th>U. PRICE</th>';
            if (Result.DescuentoActivos) {
                option += '<th>DISCOUNT</th>';
            }
            option += '<th>TOTAL</th>';
            option += '<th><i class="fa fa-flash"></i></th></tr></thead><tbody>';
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
                option += '<td>' + Result.DoorsxOrder[i].Panel.Description + '</td>';
                option += '<td>' + Result.DoorsxOrder[i].DoorType.Description + '</td>';
                option += '<td>' + Result.DoorsxOrder[i].DoorOption.Description + '</td>';
                option += '<td><span>$</span>' + Result.DoorsxOrder[i].ItemCost.toString().replace(',', '.') + '</td>';
                if (Result.DescuentoActivos) {
                    option += '<td>' + Result.DoorsxOrder[i].Descuento + '%</td>';
                }
                option += '<td><span>$</span>' + Result.DoorsxOrder[i].SubTotal.toString().replace(',', '.') + '</td>';
                if (Result.Order.Status.Id == 5) {
                    option += '<td><button title="Edit Door" data-id="' + Result.DoorsxOrder[i].Id + '"data-toggle="tab" href="#dxoPanel" role="tab"  class="editDoor Cursor btn btn-primary btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-edit"></i></button></td>';
                } else {
                    option += '<td><button title="Not available" disabled data-id="" data-toggle="tab" href="#dxoPanel" role="tab"  class="editDoor btn btn-primary btn-icon"  style="width: 25px;height: 25px; margin-left: 10px;"> <i class="fa fa-edit"></i></button></td>';
                }
                option += '</tr>';
            }
            option += '</tbody></table>';
            $("#orreff").text(idOrden);
            $("#divTable").empty().append(option);
            $("#HeaderOptions > tbody").empty().append(dxu);
            $("#UserOrderInfo > tbody").empty().append(info);
            if (Result.Order.Status.Id == 5) {
                $("#editDXU").show();
            } else {
                $("#editDXU").hide();
            }
        },
    });
}

