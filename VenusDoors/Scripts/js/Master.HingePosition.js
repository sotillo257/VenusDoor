$(document).ready(function () {

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
        Limpiar();
    });
    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateHingePosi").show();
        $("#btnInsertHP").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
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
                $('#inStatus').val(listHP[i].Status.Id);
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

        if ($('#IdStatus').val() == 0) {
            $('#IdStatus').addClass("is-invalid");
            aux = false;
        } else {
            $('#IdStatus').removeClass("is-invalid");
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
        console.log(datos);
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
        console.log(datos);
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
                } else {
                    LlammarModal("Danger", "Error: An error occurred while modifying.", " ");
                }
            },
            error: function (err) {
                LlammarModal("Danger", "Error.", " ");
            },

        });
    }