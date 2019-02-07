$(document).ready(function () {
    $("#btNewUser").on("click", function () {
        CreateNewUser();
    });

    $(".ingresar").on("click", function () {
        Signin();
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
                Type: { Id: 2 },
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
            if (result == 1) {
                LlammarModal("Sing", "Congratulations! The creation of your user has been successful.", "A message has been sent to the email supplied with an activation code to complete your registration.");
            } else if(result == 2){
                LlammarModal("Danger", "There is already a registered user with this email!", "Did you forget your password?. Click on the button below to recover your password");
            } else {
                LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again" );
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Error en el metodo al insertar un usuario");
        },

    });
}


function Signin() {

    var datos =
        {
            userData: {
                Email: $('.userEmail').val(),
                Password: $('.UserPass').val(),
            }
        };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlAutherize,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                window.location.href = '/Home/Index';
            } else {
                LlammarModal("Danger", "Error! Invalid username or password", "If you forgot your password you can restore it here");
                
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },
    });
}