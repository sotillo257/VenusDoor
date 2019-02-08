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
        Limpiar();
    });

        $(document).on('click', '.Modificar', function (event) {
            for (var i = 0; i < ListDoors.length; i++) {
                Limpiar();
                if (ListDoors[i].Id == $(this).attr('value')) {
                    $('#txtId').val(ListDoors[i].Id);
                    $('#cbDoorStyle').val(ListDoors[i].DoorStyle.Id);
                    $('#cbMatarial').val(ListDoors[i].Material.Id);
                    $('#cbTopRail').val(ListDoors[i].TopRail.Id);
                    $('#cbBottomRail').val(ListDoors[i].BottomRail.Id);
                    $('#cbPreparation').val(ListDoors[i].Preparation.Id);
                    $('#cbJoin').val(ListDoors[i].Join.Id);
                    $('#cbOutsideEdgeProfile').val(ListDoors[i].OutsideEdgeProfile.Id);
                    $('#cbInsideEdgeProfile').val(ListDoors[i].InsideEdgeProfile.Id);
                    $('#cbVerticalDivisions').val(ListDoors[i].VerticalDivisions.Id);
                    $('#cbHorizontalDivisions').val(ListDoors[i].HorizontalDivisions.Id);
                    $('#cbHingeDirection').val(ListDoors[i].HingeDirection.Id);
                    $('#cbHingePositions').val(ListDoors[i].HingePositions.Id);
                    $('#cbPanel').val(ListDoors[i].Panel.Id);
                    $('#cbPanelMaterial').val(ListDoors[i].PanelMaterial.Id);
                    $('#isDrill').val(ListDoors[i].isDrill);
                    $('#txtWidth').val(ListDoors[i].Width);
                    $('#txtHeight').val(ListDoors[i].Height);
                    $('#isOpeningMeasurement').val(ListDoors[i].IsOpeningMeasurement);
                    $('#txtPicture').val(ListDoors[i].Picture);
                    $('#txtProfilePicture').val(ListDoors[i].ProfilePicture);
                    $('#IdStatus').val(ListDoors[i].Status.Id);
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
              CreatorUser: 6,
              ModificationUser: 6,

          },

          HingeP: {
              Position1: $("#HingePositions1").val(),
              Position2: $("#HingePositions2").val(),
              Position3: $("#HingePositions3").val(),
              Position4: $("#HingePositions4").val(),
              Position5: $("#HingePositions5").val(),
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
            Id: $("#utxtId").val(),
            DoorStyle: { Id: $("#cbDoorStyle").val() },
            Material: { Id: $("#cbMaterial").val() },
            TopRail: { Id: $("#cbTopRail").val() },
            BottomRail: { Id: $("#cbBottomRail").val() },
            Preparation: { Id: $("#cbPreparation").val() },
            Join: { Id: $("#cbJoin").val() },
            OutsideEdgeProfile: { Id: $("#cbOutsideEdgeProfile").val() },
            InsideEdgeProfile: { Id: $("#cbInsideEdgeProfile").val() },
            VerticalDivisions: { Id: $("#cbVerticalDivisions").val() },
            HorizontalDivisions: { Id: $("#cbHorizontalDivisions").val() },
            HingeDirection: { Id: $("#cbHingeDirection").val() },
            HingePositions: { Id: 1 },
            Panel: { Id: $("#cbPanel").val() },
            PanelMaterial: { Id: $("#cbPanelMaterial").val() },
            Drill: { Id: $("#isDrill").val() },
            Width: $("#txtWidth").val(),
            Height: $("#txtHeight").val(),
            Picture: $("#txtPicture").val(),
            ProfilePicture: $("#txtProfilePicture").val(),
            Status: { Id: $("#IdStatus").val() },
            OpeningMeasurement: { Id: $("#isOpeningMeasurement").val() },
            CreatorUser: 6,
            ModificationUser: 6,
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