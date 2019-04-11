$(document).ready(function () {
    $(".AddComment").hide();
    $(".showInput").hide();

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
                    option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Esimate active">';
                } else {
                    option += '<div data-id="' + data[i].Id + '" class="br-mailbox-list-item Esimate ">';
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
                option += '   <h6 class="tx-14 mg-b-10 tx-gray-800">' + data[i].Status.Description + '</h6>'
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
    $('.Esimate').removeClass("active");
    $(this).addClass("active");
    var IdEstimate = $(this).attr('data-id');
    _IdEstimate = $(this).attr('data-id');
    GetHistoryEstmate(IdEstimate);
    for (var i = 0; i < listEstimate.length; i++) {
        if (IdEstimate == listEstimate[i].Id) {
            $("#lblFolio").text(listEstimate[i].IdFolio);
            var Fecha1 = new Date(parseInt(re.exec(listEstimate[i].CreationDate)[0]));
            $("#lblFechaTitulo").text(Fecha1.ddmmyyyy());
        }
    }
});

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
            for (var i = 0; i < result.listHistory.length; i++) {
                option += ' <li id="ember1553" class="ember-view">';
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
                option += '                                          <span class="IconStatus icon ion-chatbubbles" style="padding-right: 7px;padding-left: 6px;"></span>';
                option += '                                          <span class="description">' + result.listHistory[i].History + '</span>';
                option += '                                          <label class="font-xs text-muted">by <strong>' + result.listHistory[i].NameCreador + '</strong></label>';
                option += '                                     </div></div></div></div></li>';
            }
        
            $("#divHistoryComm").empty().append(option);
            $("#txtComment").val("");
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
            for (var i = 0; i < result.listHistory.length; i++) {
                option += ' <li id="ember1553" class="ember-view">';
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
                option += '                                          <span class="IconStatus icon ion-chatbubbles" style="padding-right: 7px;padding-left: 6px;"></span>';
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


