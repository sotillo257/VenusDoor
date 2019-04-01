$(document).ready(function () {
    GetAllStatus();

    $("#btnInsertHP").on("click", function () {
        if (ValidarCamposVacios()) {
            InserHingePositions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateHingePosi").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateHingePositions();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateHingePosi").hide();
        $("#btnInsertHP").show();
        QuitarClaseErrorACombos();
        Limpiar();
    });

    $(document).on('click', '.Remove', function (event) {
        var id = $(this).attr('value');
        LlammarModal("modalConfim", "Warning!", "You are about to delete an article. What would you like to do?",
        '<button onclick="UpdateStatus3(id)" class="Cursor btn btn-danger tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal" aria-label="Close">Remove</button>' +
        '<button type="button" class="Cursor btn btn-secondary tx-11 tx-uppercase pd-y-12 pd-x-25 tx-mont tx-medium" data-dismiss="modal">Cancel</button>');
        $('#deleteidhidden').val(id);
    });

    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateHingePosi").show();
        $("#btnInsertHP").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        QuitarClaseErrorACombos();
        Limpiar();
        for (var i = 0; i < listHP.length; i++) {
            if (listHP[i].Id == $(this).attr('value')) {
                var aux = listHP[i].Id;
                var aux1 = listHP[i].Position1;
                var aux2 = listHP[i].Position2;
                var aux3 = listHP[i].Position3;
                var aux4 = listHP[i].Position4;
                var aux5 = listHP[i].Position5;
                var aux6 = listHP[i].Status.Id;
                $('#inId').val(listHP[i].Id);
                $('#inPosition').val(listHP[i].Position1);
                $('#inPosition2').val(listHP[i].Position2);
                $('#inPosition3').val(listHP[i].Position3);
                $('#inPosition4').val(listHP[i].Position4);
                $('#inPosition5').val(listHP[i].Position5);
                llenarComboEstatus(listHP[i].Status.Id);
            }
        }
    });
});

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "abcdefghijklmnñopqrstuvwxyz& 0123456789";
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
        $('#inId').val(0);
        $('#inPosition').removeClass("is-invalid");
        $('#inPosition').val("");

        $('#inPosition2').removeClass("is-invalid");
        $('#inPosition2').val("");

        $('#inPosition3').removeClass("is-invalid");
        $('#inPosition3').val("");

        $('#inPosition4').removeClass("is-invalid");
        $('#inPosition4').val("");

        $('#inPosition5').removeClass("is-invalid");
        $('#inPosition5').val("");

        $('#inStatus').removeClass("is-invalid");
        llenarComboEstatus(0);

    }

    function QuitarClaseErrorACombos() {
        $('#select2-inStatus-container').removeClass("cbError");
    }

    function ValidarCamposVacios() {
        var aux = true;
        if ($('#inStatus').val() == 0 || $('#inStatus').val() == null) {
            $('#select2-inStatus-container').addClass("cbError");
            aux = false;
        } else {
            $('#select2-inStatus-container').removeClass("cbError");
        }

        if ($('#inPosition').val() == "") {
            $('#inPosition').addClass("is-invalid");
            aux = false;
        } else {
            $('#inPosition').removeClass("is-invalid");
        }

        if ($('#inPosition2').val() == "") {
            $('#inPosition2').addClass("is-invalid");
            aux = false;
        } else {
            $('#inPosition2').removeClass("is-invalid");
        }

        if ($('#inPosition3').val() == "") {
            $('#inPosition3').addClass("is-invalid");
            aux = false;
        } else {
            $('#inPosition3').removeClass("is-invalid");
        }

        if ($('#inPosition4').val() == "") {
            $('#inPosition4').addClass("is-invalid");
            aux = false;
        } else {
            $('#inPosition4').removeClass("is-invalid");
        }

        if ($('#inPosition5').val() == "") {
            $('#inPosition5').addClass("is-invalid");
            aux = false;
        } else {
            $('#inPosition5').removeClass("is-invalid");
        }

        return aux;
    }

    function InserHingePositions() {

        var datos =
        {
            pHingePositions: {
                Position1: $("#inPosition").val(),
                Position2: $("#inPosition2").val(),
                Position3: $("#inPosition3").val(),
                Position4: $("#inPosition4").val(),
                Position5: $("#inPosition5").val(),
                Status: { Id: $("#inStatus").val() },

            }
        };
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(datos),
            url: urlInserHingePositions,
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (result) {

                //Validar data para ver si mostrar error al guardar o exito al guardar
                if (result == true) {
                    LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                    llenarTablaHingePositions();
                } else {
                    LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
                }
            },
            error: function (err) {
                LlammarModal("Danger", "Error.", " ");
            },

        });
    }
    function UpdateHingePositions() {

        var datos =
        {
            uHingePositions: {
                Id: $("#inId").val(),
                Position1: $("#inPosition").val(),
                Position2: $("#inPosition2").val(),
                Position3: $("#inPosition3").val(),
                Position4: $("#inPosition4").val(),
                Position5: $("#inPosition5").val(),
                Status: { Id: $("#inStatus").val() },

            }
        };
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(datos),
            url: urlUpdateHingePositions,
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (result) {

                //Validar data para ver si mostrar error al guardar o exito al guardar
                if (result == true) {
                    LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                    llenarTablaHingePositions();
                } else {
                    LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
                }
            },
            error: function (err) {
                LlammarModal("Danger", "Error.", " ");
            },

        });
    }

function UpdateStatus3(id) {
    var status = 3;
    var datos =
    {
        modHP: {
            Id: $('#deleteidhidden').val(),
            Status: { Id: status }

        }
    };

    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateStatusHP,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                llenarTablaHingePositions();
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
    function GetAllStatus() {
        $.ajax({
            url: urlGetAllStatus,
            cache: false,
            type: 'POST',
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {
                    allEstatus = data;
                    var option = '';
                    for (var i = 0; i < data.length; i++) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Description + '</option>';
                    }
                    $("#inStatus").empty().append(option);

                }
                else {
                    LlammarModal("Danger", "Error obtaining Join", " ");
                }
            },
            error: function (err) {
                LlammarModal("Danger", "Error.", "Check your internet connection I tried again.");
            }
        });
    }

    function llenarTablaHingePositions() {
        $.ajax({
            url: urlGetAllHingePositions,
            cache: false,
            type: 'POST',
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {
                    listHP = data;
                    var t = $('#datatable1').DataTable();
                    t.rows().remove().draw(false);

                    for (var i = 0; i < data.length; i++) {
                        var Botones = '<center><button data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" style="width: 25px;height: 25px; margin-left: 10px;" class="Modificar btn btn-primary btn-icon"><i class="fa fa-edit"></i></button>' +
                        '<button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button>' +
                            '</center>';

                        t.row.add([
                            data[i].Id,
                            data[i].Position1,
                            data[i].Position2,
                            data[i].Position3,
                            data[i].Position4,
                            data[i].Position5,
                            data[i].Status.Description,
                           Botones
                        ]).draw(false);
                    }
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