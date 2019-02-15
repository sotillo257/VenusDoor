$(document).ready(function () {

    $("#btInsertDoors").on("click", function () {
        if (ValidarCamposVacios()) {
            InsertDoors();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
    });
    $("#btnUpdateDoors").on("click", function () {
        if (ValidarCamposVacios()) {
            UpdateDoors();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }
        
    });
    $("#btInsert").on("click", function () {
        $("#lblTitulo").text("Insert new");
        $("#lblSubTitulo").text("You can create a new article below");
        $("#btnUpdateDoors").hide();
        $("#btInsertDoors").show();
        Limpiar();
    });

    $(document).on('click', '.Modificar', function (event) {
        $("#btnUpdateDoors").show();
        $("#btInsertDoors").hide();
        $("#lblTitulo").text("Modify");
        $("#lblSubTitulo").text("You can modify a new article below");
        Limpiar();
            for (var i = 0; i < ListDoors.length; i++) {
                if (ListDoors[i].Id == $(this).attr('value')) {
                   
                    var aux = ListDoors[i].Id;
                    var aux1 = ListDoors[i].DoorStyle.Id;
                    var aux2 = ListDoors[i].Material.Id;
                    var aux3 = ListDoors[i].TopRail.Id;
                    var aux4 = ListDoors[i].BottomRail.Id;
                    var aux5 = ListDoors[i].Preparation.Id;
                    var aux6 = ListDoors[i].Join.Id;
                    var aux7 = ListDoors[i].OutsideEdgeProfile.Id;
                    var aux8 = ListDoors[i].InsideEdgeProfile.Id;
                    var aux9 = ListDoors[i].VerticalDivisions.Id;
                    var aux10 = ListDoors[i].HorizontalDivisions.Id;
                    var aux11 = ListDoors[i].HingeDirection.Id;
                    var aux12 = ListDoors[i].HingePositions.Id;
                    var aux13 = ListDoors[i].Panel.Id;
                    var aux14 = ListDoors[i].PanelMaterial.Id;
                    var aux15 = ListDoors[i].isDrill.Id;
                    var aux16 = ListDoors[i].Width.Id;
                    var aux17 = ListDoors[i].Height.Id;
                    var aux18 = ListDoors[i].IsOpeningMeasurement.Id;
                    var aux19 = ListDoors[i].Picture.Id;
                    var aux20 = ListDoors[i].ProfilePicture.Id;
                    var aux21 = ListDoors[i].Status.Id;
                    $('#inId').val(ListDoors[i].Id);
                    $('#inDoorStyle').val(ListDoors[i].DoorStyle.Id);
                    $('#inMaterial').val(ListDoors[i].Material.Id);
                    $('#inTopRail').val(ListDoors[i].TopRail.Id);
                    $('#inBottomRail').val(ListDoors[i].BottomRail.Id);
                    $('#inPreparation').val(ListDoors[i].Preparation.Id);
                    $('#inJoin').val(ListDoors[i].Join.Id);
                    $('#inOutsideEdgeProfile').val(ListDoors[i].OutsideEdgeProfile.Id);
                    $('#inInsideEdgeProfile').val(ListDoors[i].InsideEdgeProfile.Id);
                    $('#inVerticalDivisions').val(ListDoors[i].VerticalDivisions.Id);
                    $('#inHorizontalDivisions').val(ListDoors[i].HorizontalDivisions.Id);
                    $('#inHingeDirection').val(ListDoors[i].HingeDirection.Id);
                    $('#inHingePositions').val(ListDoors[i].HingePositions.Id);
                    $('#inPanel').val(ListDoors[i].Panel.Id);
                    $('#inPanelMaterial').val(ListDoors[i].PanelMaterial.Id);
                    $('#inDrill').val(ListDoors[i].isDrill);
                    $('#inWidth').val(ListDoors[i].Width);
                    $('#inHeight').val(ListDoors[i].Height);
                    $('#inOpeningMeasurement').val(ListDoors[i].IsOpeningMeasurement);
                    $('#inPicture').val(ListDoors[i].Picture);
                    $('#inProfilePicture').val(ListDoors[i].ProfilePicture);
                    $('#inStatus').val(ListDoors[i].Status.Id);
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
        $('#inDoorStyle').removeClass("is-invalid");
        $('#inDoorStyle').val(0);

        $('#inMaterial').removeClass("is-invalid");
        $('#inMaterial').val(0);

        $('#inBottomRail').removeClass("is-invalid");
        $('#inBottomRail').val(0);

        $('#inPreparation').removeClass("is-invalid");
        $('#inPreparation').val(0);

        $('#inJoin').removeClass("is-invalid");
        $('#inJoin').val(0);

        $('#inOutsideEdgeProfile').removeClass("is-invalid");
        $('#inOutsideEdgeProfile').val(0);

        $('#inInsideEdgeProfile').removeClass("is-invalid");
        $('#inInsideEdgeProfile').val(0);

        $('#inVerticalDivisions').removeClass("is-invalid");
        $('#inVerticalDivisions').val(0);

        $('#inHorizontalDivisions').removeClass("is-invalid");
        $('#inHorizontalDivisions').val(0);

        $('#inHingeDirection').removeClass("is-invalid");
        $('#inHingeDirection').val(0);

        $('#inPanel').removeClass("is-invalid");
        $('#inPanel').val(0);

        $('#inPanelMaterial').removeClass("is-invalid");
        $('#inPanelMaterial').val(0);

        $('#inDrill').removeClass("is-invalid");
        $('#inDrill').val(0);

        $('#inWidth').removeClass("is-invalid");
        $('#inWidth').val("");

        $('#inHeight').removeClass("is-invalid");
        $('#inHeight').val("");

        $('#inStatus').removeClass("is-invalid");
        $('#inStatus').val("");

        $('#inTopRail').removeClass("is-invalid");
        $('#inTopRail').val("");

    }

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inDoorStyle').val() == 0) {
        $('#inDoorStyle').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDoorStyle').removeClass("is-invalid");
    }

    if ($('#inMaterial').val() == 0) {
        $('#inMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#inMaterial').removeClass("is-invalid");
    }

    if ($('#inTopRail').val() == 0) {
        $('#inTopRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTopRail').removeClass("is-invalid");
    }

    if ($('#inBottomRail').val() == 0) {
        $('#inBottomRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inBottomRail').removeClass("is-invalid");
    }

    if ($('#inPreparation').val() == 0) {
        $('#inPreparation').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPreparation').removeClass("is-invalid");
    }

    if ($('#inJoin').val() == 0) {
        $('#inJoin').addClass("is-invalid");
        aux = false;
    } else {
        $('#inJoin').removeClass("is-invalid");
    }

    if ($('#inOutsideEdgeProfile').val() == 0) {
        $('#inOutsideEdgeProfile').addClass("is-invalid");
        aux = false;
    } else {
        $('#inOutsideEdgeProfile').removeClass("is-invalid");
    }

    if ($('#inInsideEdgeProfile').val() == 0) {
        $('#inInsideEdgeProfile').addClass("is-invalid");
        aux = false;
    } else {
        $('#inInsideEdgeProfile').removeClass("is-invalid");
    }

    if ($('#inVerticalDivisions').val() == 0) {
        $('#inVerticalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#inVerticalDivisions').removeClass("is-invalid");
    }

    if ($('#inHorizontalDivisions').val() == 0) {
        $('#inHorizontalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHorizontalDivisions').removeClass("is-invalid");
    }

    if ($('#inHingeDirection').val() == 0) {
        $('#inHingeDirection').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHingeDirection').removeClass("is-invalid");
    }

    if ($('#inPanel').val() == 0) {
        $('#inPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPanel').removeClass("is-invalid");
    }

    if ($('#inPanelMaterial').val() == 0) {
        $('#inPanelMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#inPanelMaterial').removeClass("is-invalid");
    }

    if ($('#inDrill').val() == 0) {
        $('#inDrill').addClass("is-invalid");
        aux = false;
    } else {
        $('#inDrill').removeClass("is-invalid");
    }

    if ($('#inWidth').val() == "") {
        $('#inWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#inWidth').removeClass("is-invalid");
    }

    if ($('#inHeight').val() == "") {
        $('#inHeight').addClass("is-invalid");
        aux = false;
    } else {
        $('#inHeight').removeClass("is-invalid");
    }

    if ($('#inStatus').val() == 0) {
        $('#inStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#inStatus').removeClass("is-invalid");
    }

    if ($('#inOpeningMeasurement').val() == 0) {
        $('#inOpeningMeasurement').addClass("is-invalid");
        aux = false;
    } else {
        $('#inOpeningMeasurement').removeClass("is-invalid");
    }
   
    return aux;
}

function InsertDoors() {

    //var Door = new Array();
    //var formData = new FormData();
    //if ($("#inPicture")[0].files.length > 0) {
    //    //alert($("#File1")[0].files[0].name);
    //    formData.append('Files', $("#inPicture")[0].files[0], "lp");
    //}
    var datos =
      {
          pDoors: {

              DoorStyle: { Id: $("#inDoorStyle").val() },
              Material: { Id: $("#inMaterial").val() },
              TopRail: { Id: $("#inTopRail").val() },
              BottomRail: { Id: $("#inBottomRail").val() },
              Preparation: { Id: $("#inPreparation").val() },
              Join: { Id: $("#inJoin").val() },
              OutsideEdgeProfile: { Id: $("#inOutsideEdgeProfile").val() },
              InsideEdgeProfile: { Id: $("#inInsideEdgeProfile").val() },
              VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
              HorizontalDivisions: { Id: $("#inHorizontalDivisions").val() },
              HingeDirection: { Id: 3 },
              HingePositions: { Id: 2 },
              Panel: { Id: $("#inPanel").val() },
              PanelMaterial: { Id: $("#inPanelMaterial").val() },
              Drill: { Id: false },
              Width: $("#inWidth").val(),
              Height: $("#inHeight").val(),
              Picture: $("#inPicture").val(),
              ProfilePicture: $("#inProfilePicture").val(),
              Status: { Id: $("#inStatus").val() },
              OpeningMeasurement: { Id: false},

          }
      };
    //formData.append('pDoors', pDoors);



    //compania.push(formData);

    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlInsertDoors,
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
function UpdateDoors() {

    var datos =
    {
        uDoors: {
            Id: $("#inId").val(),
            DoorStyle: { Id: $("#inDoorStyle").val() },
            Material: { Id: $("#inMaterial").val() },
            TopRail: { Id: $("#inTopRail").val() },
            BottomRail: { Id: $("#inBottomRail").val() },
            Preparation: { Id: $("#inPreparation").val() },
            Join: { Id: $("#inJoin").val() },
            OutsideEdgeProfile: { Id: $("#inOutsideEdgeProfile").val() },
            InsideEdgeProfile: { Id: $("#inInsideEdgeProfile").val() },
            VerticalDivisions: { Id: $("#inVerticalDivisions").val() },
            HorizontalDivisions: { Id: $("#inHorizontalDivisions").val() },
            HingeDirection: { Id: $("#inHingeDirection").val() },
            HingePositions: { Id: 1 },
            Panel: { Id: $("#inPanel").val() },
            PanelMaterial: { Id: $("#inPanelMaterial").val() },
            Drill: { Id: $("#inDrill").val() },
            Width: $("#inWidth").val(),
            Height: $("#inHeight").val(),
            Picture: $("#inPicture").val(),
            ProfilePicture: $("#inProfilePicture").val(),
            Status: { Id: $("#inStatus").val() },
            OpeningMeasurement: { Id: $("#inOpeningMeasurement").val() },
        }
    };
    console.log(datos);
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlUpdateDoors,
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