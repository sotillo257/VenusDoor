$(document).ready(function () {
    GetAllStatus();

    $("#btInsertJoin").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertJoin();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btUpdateJoin").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateJoin();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btUpdateJoin").hide();
        $("#btInsertJoin").show();
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
        $("#btUpdateJoin").show();
        $("#btInsertJoin").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        QuitarClaseErrorACombos();
        Limpiar();
        for (var i = 0; i < listJOIN.length; i++) {
            if (listJOIN[i].Id == $(this).attr('value')) {
                var aux = listJOIN[i].Id;
                var aux1 = listJOIN[i].Status.Id;
                var aux2 = listJOIN[i].Description;
                $('#inId').val(listJOIN[i].Id);
                llenarComboEstatus(listJOIN[i].Status.Id);
                $('#inDescription').val(listJOIN[i].Description);
            }
        }
    });
});

function soloLetras(e) {
    key = e.keyCode || e.which;
    tecla = String.fromCharCode(key).toLowerCase();
    letras = "abcdefghijklmnñopqrstuvwxyz &";
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
        $('#inDescription').removeClass("is-invalid");
        $('#inDescription').val("");

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

        if ($('#inDescription').val() == "") {
            $('#inDescription').addClass("is-invalid");
            aux = false;
        } else {
            $('#inDescription').removeClass("is-invalid");
        }
        return aux;
    }

    function InsertJoin() {

        var datos =
        {
            pJoin: {
                Description: $("#inDescription").val(),
                Status: { Id: $("#inStatus").val() },

            }
        };
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(datos),
            url: urlInsertJoin,
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (result) {

                //Validar data para ver si mostrar error al guardar o exito al guardar
                if (result == true) {
                    LlammarModal("Congratuletions", "Congratulations! It has been inserted correctly.", " ");
                    llenarTablaGetAllJoin()
                } else {
                    LlammarModal("Danger", "Error: An error occurred while inserting.", " ");
                }
            },
            error: function (err) {
                LlammarModal("Danger", "Error.", " ");
            },

        });
    }
    function UpdateJoin() {

        var datos =
        {
            uJoin: {
                Id: $("#inId").val(),
                Description: $("#inDescription").val(),
                Status: { Id: $("#inStatus").val() },

            }
        };
        
        $.ajax({
            type: 'POST',
            data: JSON.stringify(datos),
            url: urlUpdateJoin,
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (result) {

                //Validar data para ver si mostrar error al guardar o exito al guardar
                if (result == true) {
                    LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                    llenarTablaGetAllJoin()
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
            modJoin: {
                Id: $('#deleteidhidden').val(),
                Status: { Id: status }

            }
        };

        $.ajax({
            type: 'POST',
            data: JSON.stringify(datos),
            url: urlUpdateStatusJoin,
            dataType: "json",
            contentType: 'application/json; charset=utf-8',
            success: function (result) {

                //Validar data para ver si mostrar error al guardar o exito al guardar
                if (result == true) {
                    LlammarModal("Congratuletions", "Congratulations! It has been modified correctly.", " ");
                    llenarTablaGetAllJoin();
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

    function llenarTablaGetAllJoin() {
        $.ajax({
            url: urlGetAllJoin,
            cache: false,
            type: 'POST',
            async: false,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
                if (data != null) {
                    listJOIN = data;
                    var t = $('#datatable1').DataTable();
                    t.rows().remove().draw(false);

                    for (var i = 0; i < data.length; i++) {
                        var Botones = '<center><button data-toggle="modal" data-target="#modalInsert" value="' + data[i].Id + '" style="width: 25px;height: 25px; margin-left: 10px;" class="Modificar Cursor btn btn-primary btn-icon"><i class="fa fa-edit"></i></button>' +
                        '<button href="#" data-toggle="modal" data-target="" id="" title="Remove" value="' + data[i].Id + '" class="Remove Cursor btn btn-danger btn-icon" style="width: 25px;height: 25px; margin-left: 10px;"><i class="fa fa-trash"></i></button>' +
                            '</center>';

                        t.row.add([
                            data[i].Id,
                            data[i].Description,
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