$(document).ready(function () {
    GetStatus();
    $("#btInsertBR").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertBottomRail();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
        
    });
    $("#btnModify").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateBottomRail();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
        
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnModify").hide();
        $("#btInsertBR").show();
        Limpiar();
    });

       
    $(document).on('click', '.Modificar', function (event) {
        $("#btnModify").show();
        $("#btInsertBR").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        // Limpiar();
            for (var i = 0; i < listBTR.length; i++) {
                if (listBTR[i].Id == $(this).attr('value')) {
                   
                    var aux = listBTR[i].Id;
                var aux1 = listBTR[i].Status.Id;
                var aux2 = listBTR[i].Description;
                    $('#inId').val(listBTR[i].Id);
                llenarComboEstatus(listBTR[i].Status.Id);
                    $('#inDescription').val(listBTR[i].Description);
                break;
                }
            }
        });


    });

$(function () {
    'use strict';

    $('#datatable1').DataTable({
        responsive: true,
        language: {
            searchPlaceholder: 'Search...',
            sSearch: '',
            lengthMenu: '_MENU_ items/page',
        }
    });

    $('#datatable2').DataTable({
        bLengthChange: false,
        searching: false,
        responsive: true
    });

    // Select2
    $('.dataTables_length select').select2({ minimumResultsForSearch: Infinity });

});
function Limpiar() {
  //  $('#inStatus').removeClass("is-invalid");
    $('#inDescription').removeClass("is-invalid");
    $('#inDescription').val("");
    $('#inId').val(0);
    llenarComboEstatus(0);
  

}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

   

    if ($('#inDescription').val() == "") {
        $('#inDescription').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDescription').removeClass("is-invalid");
    }

    

    return aux;
}

function InsertBottomRail() {

    var datos =
    {
        pBottomRail: {
            Description: $("#inDescription").val(),
            Status: { Id: $("#inStatus").val() }

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertBottomRail,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                llenarTablaBottomRail();
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}
function UpdateBottomRail() {

    var datos =
    {
        uBottomRail: {
            Id: $("#inId").val(),
            Description: $("#inDescription").val(),
            Status: { Id: $("#inStatus").val() }

        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateBottomRail,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaBottomRail();
            } else {
                LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        },

    });
}

var allEstatus = '';
function llenarComboEstatus(pStatus) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allEstatus.length; i++) {
        if (allEstatus[i].Group.Id == 1) {
            option += '<option value="' + allEstatus[i].Id + '">' + allEstatus[i].Description + '</option>';
        }
       

    }
    $("#inStatus").empty().append(option);
    if (pStatus != 0) {
        $("#inStatus").val(pStatus);
    }
}
function GetStatus() {
    $.ajax({
        url: urlGetStatus,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allEstatus = data;
                var option = '<option id="0">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    
                    if (allEstatus[i].Group.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }
                
                }
                $("#inStatus").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Join", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });
}

function llenarTablaBottomRail() {
    $.ajax({
        url: urlGetAllBottomRail,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                listBTR = data;
                var option = '';
                for (var i = 0; i < data.length; i++) {
                    option += '<tr role="row" class="odd">';
                    option += '<td tabindex="0"  >' + data[i].Id + '</td>';
                    option += '<td>' + data[i].Description + '</td>';
                    option += '<td>' + data[i].Status.Description + '</td>';
                    option += '<td>';
                    option += '<center>';
                    option += '<a href="#" data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" class="Modificar btn btn-primary btn-icon">';
                    option += '<div><i class="fa fa-edit"></i></div></a></center></td></tr>';

                }
                $("#datatable1 > tbody").empty().append(option);
                $("#modalInsert").modal("hide");
            }
            else {
                LlammarModal("Danger", "Error obtaining Type", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", " ");
        }
    });

}