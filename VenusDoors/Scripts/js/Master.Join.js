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
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btUpdateJoin").show();
        $("#btInsertJoin").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
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
    letras = " áéíóúabcdefghijklmnñopqrstuvwxyz &";
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

    function InsertJoin() {

        var datos =
        {
            pJoin: {
                Description: $("#inDescription").val(),
                Status: { Id: $("#inStatus").val() },

            }
        };
        console.log(datos);
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
        console.log(datos);
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