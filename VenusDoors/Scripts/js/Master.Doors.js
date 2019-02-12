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

        $('#inStatus').removeClass("is-invalid");
        $('#inStatus').val("");

        $('#inTopRail').removeClass("is-invalid");
        $('#inTopRail').val("");


        $('#cbDoorStyle').removeClass("is-invalid");
        $('#cbDoorStyle').val(0);

        $('#cbMaterial').removeClass("is-invalid");
        $('#cbMaterial').val(0);

        $('#cbBottomRail').removeClass("is-invalid");
        $('#cbBottomRail').val(0);

        $('#cbPreparation').removeClass("is-invalid");
        $('#cbPreparation').val(0);

        $('#cbJoin').removeClass("is-invalid");
        $('#cbJoin').val(0);

        $('#cbOutsideEdgeProfile').removeClass("is-invalid");
        $('#cbOutsideEdgeProfile').val(0);

        $('#cbInsideEdgeProfile').removeClass("is-invalid");
        $('#cbInsideEdgeProfile').val(0);

        $('#cbVerticalDivisions').removeClass("is-invalid");
        $('#cbVerticalDivisions').val(0);

        $('#cbHorizontalDivisions').removeClass("is-invalid");
        $('#cbHorizontalDivisions').val(0);

        $('#cbHingeDirection').removeClass("is-invalid");
        $('#cbHingeDirection').val(0);

        $('#cbPanel').removeClass("is-invalid");
        $('#cbPanel').val(0);

        $('#cbPanelMaterial').removeClass("is-invalid");
        $('#cbPanelMaterial').val(0);

        $('#isDrill').removeClass("is-invalid");
        $('#isDrill').val(0);

        $('#txtWidth').removeClass("is-invalid");
        $('#txtWidth').val("");

        $('#txtHeight').removeClass("is-invalid");
        $('#txtHeight').val("");

        $('#IdStatus').removeClass("is-invalid");
        $('#IdStatus').val("");

        $('#cbTopRail').removeClass("is-invalid");
        $('#cbTopRail').val("");
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

    var aux = true;
    if ($('#cbDoorStyle').val() == 0) {
        $('#cbDoorStyle').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbDoorStyle').removeClass("is-invalid");
    }

    if ($('#cbMaterial').val() == 0) {
        $('#cbMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbMaterial').removeClass("is-invalid");
    }

    if ($('#inTopRail').val() == 0) {
        $('#inTopRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inTopRail').removeClass("is-invalid");
    }

    if ($('#cbBottomRail').val() == 0) {
        $('#cbBottomRail').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbBottomRail').removeClass("is-invalid");
    }

    if ($('#cbPreparation').val() == 0) {
        $('#cbPreparation').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbPreparation').removeClass("is-invalid");
    }

    if ($('#cbJoin').val() == 0) {
        $('#cbJoin').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbJoin').removeClass("is-invalid");
    }

    if ($('#cbOutsideEdgeProfile').val() == 0) {
        $('#cbOutsideEdgeProfile').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbOutsideEdgeProfile').removeClass("is-invalid");
    }

    if ($('#cbInsideEdgeProfile').val() == 0) {
        $('#cbInsideEdgeProfile').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbInsideEdgeProfile').removeClass("is-invalid");
    }

    if ($('#cbVerticalDivisions').val() == 0) {
        $('#cbVerticalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbVerticalDivisions').removeClass("is-invalid");
    }

    if ($('#cbHorizontalDivisions').val() == 0) {
        $('#cbHorizontalDivisions').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbHorizontalDivisions').removeClass("is-invalid");
    }

    if ($('#cbHingeDirection').val() == 0) {
        $('#cbHingeDirection').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbHingeDirection').removeClass("is-invalid");
    }

    if ($('#cbPanel').val() == 0) {
        $('#cbPanel').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbPanel').removeClass("is-invalid");
    }

    if ($('#cbPanelMaterial').val() == 0) {
        $('#cbPanelMaterial').addClass("is-invalid");
        aux = false;
    } else {
        $('#cbPanelMaterial').removeClass("is-invalid");
    }

    if ($('#isDrill').val() == 0) {
        $('#isDrill').addClass("is-invalid");
        aux = false;
    } else {
        $('#isDrill').removeClass("is-invalid");
    }

    if ($('#txtWidth').val() == "") {
        $('#txtWidth').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtWidth').removeClass("is-invalid");
    }

    if ($('#txtHeight').val() == "") {
        $('#txtHeight').addClass("is-invalid");
        aux = false;
    } else {
        $('#txtHeight').removeClass("is-invalid");
    }

    if ($('#IdStatus').val() == 0) {
        $('#IdStatus').addClass("is-invalid");
        aux = false;
    } else {
        $('#IdStatus').removeClass("is-invalid");
    }

    if ($('#isOpeningMeasurement').val() == 0) {
        $('#isOpeningMeasurement').addClass("is-invalid");
        aux = false;
    } else {
        $('#isOpeningMeasurement').removeClass("is-invalid");
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
              CreatorUser: 6,
              ModificationUser: 6,

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