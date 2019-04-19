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

function soloAndNumeros(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "0123456789 ";
    especiales = [8, 37, 39, 46];

    tecla_especial = false
    for (var i in especiales) {
        if (key == especiales[i]) {
            tecla_especial = true;
            break;
        }
    }

    if (letras.indexOf(tecla) == -1 && !tecla_especial)
        return false;
}

function Limpiar() {
    $('#inId').val(0);
    llenarComboEstatus(0);
    llenarComboDoorStyle(0);
    llenarComboInsideEdgeProfile(0);
}

function QuitarClaseErrorACombos() {
    $('#select2-inStatus-container').removeClass("cbError");
    $('#select2-cbDoorStyle-container').removeClass("cbError");
    $('#select2-cbInsideEdgeProfile-container').removeClass("cbError");
}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#cbStatus').val() == 0 || $('#cbStatus').val() == null) {
        $('#select2-cbStatus-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbStatus-container').removeClass("cbError");
    }

    if ($('#cbDoorStyle').val() == 0 || $('#cbDoorStyle').val() == null) {
        $('#select2-cbDoorStyle-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbDoorStyle-container').removeClass("cbError");
    }
    if ($('#cbInsideEdgeProfile').val() == 0 || $('#cbInsideEdgeProfile').val() == null) {
        $('#select2-cbInsideEdgeProfile-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbInsideEdgeProfile-container').removeClass("cbError");
    }

    return aux;
}

$(document).ready(function () {
    GetStatus();
    GetDoorStyle();
    GetInsideEdgeProfile();
    $("#btInsertBR").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertDoorStylexInsideEdgeProfile();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
        
    });
    
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");

        $("#btInsertBR").show();
        QuitarClaseErrorACombos();
        Limpiar();
    });

    $(document).on('click', '.Remove', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Warning!", "You are about to delete an article. What would you like to do?",
        '<button onclick="EliminarDoorStylexInsideEdgeProfile('+id+')" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });
       
   
});

function InsertDoorStylexInsideEdgeProfile() {
    var listInsideProfile = new Array();
    var list = $("#cbInsideEdgeProfile").val();
    for (var i = 0; i < list.length; i++) {
        listInsideProfile.push({ Id: list[i] });
    }
    var datos =
    {
        pDoorStyle: {
             Id: $("#cbDoorStyle").val(),
             listInsideProfile: listInsideProfile,
             Status: { Id: $("#cbStatus").val() }
        }
    };
    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorStylexInsideEdgeProfile,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result.Success) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                llenarTablaDoorStylexInsideEdgeProfile();
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "while inserting");
        },

    });
}

function EliminarDoorStylexInsideEdgeProfile(id) {
   
    var datos =
    {
        pId: id        
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlEliminarDoorStyle,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result.Success) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaDoorStylexInsideEdgeProfile();
            } else {
                LlammarModal("Danger", "Error: An error occurred while deleting.", result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "while deleting");
        },

    });
}

var allEstatus = '';
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
                llenarComboEstatus(0);
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
function llenarComboEstatus(pStatus) {

    var option = '<option value="0" id="">Select</option>';
    for (var i = 0; i < allEstatus.length; i++) {
        if (allEstatus[i].Group.Id == 1) {
            option += '<option value="' + allEstatus[i].Id + '">' + allEstatus[i].Description + '</option>';
        }


    }
    $("#cbStatus").empty().append(option);
    if (pStatus != 0) {
        $("#cbStatus").val(pStatus);
    }
}
var allDoorStyle = "";
function GetDoorStyle() {
    $.ajax({
        url: urlGetDoorStyle,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allDoorStyle = data;
                llenarComboDoorStyle(0);

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
function llenarComboDoorStyle(pStatus) {
    var option = '<option id="0">Select</option>';
    for (var i = 0; i < allDoorStyle.length; i++) {

        if (allDoorStyle[i].Status.Id != 3) {
            option += '<option value="' + allDoorStyle[i].Id + '">' + allDoorStyle[i].Description + '</option>';
        }

    }
    $("#cbDoorStyle").empty().append(option);   
    if (pStatus != 0) {
        $("#cbDoorStyle").val(pStatus);
    }
}
var allinside = "";
function GetInsideEdgeProfile() {
    $.ajax({
        url: urlInsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allinside = data;
                llenarComboInsideEdgeProfile(0);
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
function llenarComboInsideEdgeProfile(pStatus) {
    var option = '<option id="0">Select</option>';
    for (var i = 0; i < allinside.length; i++) {

        if (allinside[i].Status.Id != 3) {
            option += '<option value="' + allinside[i].Id + '">' + allinside[i].Description + '</option>';
        }

    }
    $("#cbInsideEdgeProfile").empty().append(option);
    
    if (pStatus != 0) {
        $("#cbInsideEdgeProfile").val(pStatus);
    }
}
function llenarTablaDoorStylexInsideEdgeProfile() {
    $.ajax({
        url: urlGetAllDoorStylexInsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.Success) {
                ListDoorStylexInsideEdgeProfile = data.listDoorInside;

                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);

                for (var i = 0; i < ListDoorStylexInsideEdgeProfile.length; i++) {
                    var Botones = '<center><button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + ListDoorStylexInsideEdgeProfile[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button></center>';

                    t.row.add([
                        ListDoorStylexInsideEdgeProfile[i].Id,
                        ListDoorStylexInsideEdgeProfile[i].DoorStyle.Description,
                        ListDoorStylexInsideEdgeProfile[i].InsideEdgeProfile.Description,
                        ListDoorStylexInsideEdgeProfile[i].Status.Description,
                       Botones
                    ]).draw(false);
                }
                $("#modalInsert").modal("hide");
            }
            else {
                LlammarModal("Danger", "Error obtaining Door Inside Profile", result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Obtaining Door Inside Profile");
        }
    });

}