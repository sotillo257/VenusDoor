$(document).ready(function () {
    $("#btNewUser").on("click", function () {
        CreateNewUser();
    });
});


function CreateNewUser() {

    var NewUserInfo =
        {
            PersonData: {
                Name: $('#inptName').val(),
                Lastname: $('#inptLastName').val(),
                Telephone: $('#inptTelephone').val(),
                Direction: $('#inptDirec').val(),
                Status: { Id: 1 },
                CreatorUser: 6,
                ModificationUser: 6,
            },

            UserData: {
                Email: $('#inptEmail').val(),
                Password: $('#inptPassword').val(),
                Type: { Id: 1 },
                Status: { Id: 1 },
                CreatorUser: 6,
                ModificationUser: 6,
            }
        };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(NewUserInfo),
        url: urlInsertUser,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                $('#modalCongra').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}