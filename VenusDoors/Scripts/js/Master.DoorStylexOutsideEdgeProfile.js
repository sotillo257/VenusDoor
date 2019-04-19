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
    llenarComboOutsideEdgeProfile(0);
}

function QuitarClaseErrorACombos() {
    $('#select2-inStatus-container').removeClass("cbError");
    $('#select2-cbDoorStyle-container').removeClass("cbError");
    $('#select2-cbOutsideEdgeProfile-container').removeClass("cbError");
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
    if ($('#cbOutsideEdgeProfile').val() == 0 || $('#cbOutsideEdgeProfile').val() == null) {
        $('#select2-cbOutsideEdgeProfile-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbOutsideEdgeProfile-container').removeClass("cbError");
    }

    return aux;
}

$(document).ready(function () {
    GetStatus();
    GetDoorStyle();
    GetOutsideEdgeProfile();
    $("#btInsertBR").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertDoorStylexOutsideEdgeProfile();
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
        '<button onclick="EliminarDoorStylexOutsideEdgeProfile('+id+')" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });
       
   
});

function InsertDoorStylexOutsideEdgeProfile() {
    var listOutsideProfile = new Array();
    var list = $("#cbOutsideEdgeProfile").val();
    for (var i = 0; i < list.length; i++) {
        listOutsideProfile.push({ Id: list[i] });
    }
    var datos =
    {
        pDoorStyle: {
             Id: $("#cbDoorStyle").val(),
             listOutsideProfile: listOutsideProfile,
             Status: { Id: $("#cbStatus").val() }
        }
    };
    
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoorStylexOutsideEdgeProfile,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result.Success) {
                LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                llenarTablaDoorStylexOutsideEdgeProfile();
            } else {
                LlammarModal("Danger", "Error: An error occurred while inserting.", result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "while inserting");
        },

    });
}

function EliminarDoorStylexOutsideEdgeProfile(id) {
   
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
                llenarTablaDoorStylexOutsideEdgeProfile();
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
var allOutside = "";
function GetOutsideEdgeProfile() {
    $.ajax({
        url: urlOutsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                allOutside = data;
                llenarComboOutsideEdgeProfile(0);
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
function llenarComboOutsideEdgeProfile(pStatus) {
    var option = '<option id="0">Select</option>';
    for (var i = 0; i < allOutside.length; i++) {

        if (allOutside[i].Status.Id != 3) {
            option += '<option value="' + allOutside[i].Id + '">' + allOutside[i].Description + '</option>';
        }

    }
    $("#cbOutsideEdgeProfile").empty().append(option);
    
    if (pStatus != 0) {
        $("#cbOutsideEdgeProfile").val(pStatus);
    }
}
function llenarTablaDoorStylexOutsideEdgeProfile() {
    $.ajax({
        url: urlGetAllDoorStylexOutsideEdgeProfile,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data.Success) {
                ListDoorStylexOutsideEdgeProfile = data.listDoorOutside;

                var t = $('#datatable1').DataTable();
                t.rows().remove().draw(false);

                for (var i = 0; i < ListDoorStylexOutsideEdgeProfile.length; i++) {
                    var Botones = '<center><button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + ListDoorStylexOutsideEdgeProfile[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button></center>';

                    t.row.add([
                        ListDoorStylexOutsideEdgeProfile[i].Id,
                        ListDoorStylexOutsideEdgeProfile[i].DoorStyle.Description,
                        ListDoorStylexOutsideEdgeProfile[i].OutsideEdgeProfile.Description,
                        ListDoorStylexOutsideEdgeProfile[i].Status.Description,
                       Botones
                    ]).draw(false);
                }
                $("#modalInsert").modal("hide");
            }
            else {
                LlammarModal("Danger", "Error obtaining Door Outside Profile", result.Mensaje);
            }
        },
        error: function (err) {
            LlammarModal("Danger", "Error.", "Obtaining Door Outside Profile");
        }
    });

}