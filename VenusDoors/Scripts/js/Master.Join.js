﻿$(document).ready(function () {

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
                $('#inStatus').val(listJOIN[i].Status.Id);
                $('#inDescription').val(listJOIN[i].Description);
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
        $('#inId').val(0);
        $('#inDescription').removeClass("is-invalid");
        $('#inDescription').val("");

        $('#inStatus').removeClass("is-invalid");
        $('#inStatus').val(0);

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
                } else {
                    LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
                }
            },
            error: function (err) {
                LlammarModal("Danger", "Error.", " ");
            },

        });
    }