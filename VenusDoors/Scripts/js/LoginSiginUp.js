$(document).ready(function () {
    $("#btNewUser").on("click", function () {
        if (ValidarCamposVacios()) {
            if (ValContrasenas()) {
                CreateNewUser();
            } else {
                LlammarModal("Danger", "Passwords do not match.", " ");
            }
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }

    });

    $(".ingresar").on("click", function () {
        Signin();
    });
});
function ValContrasenas() {
    var aux = true;
    if ($('#inptPassword').val() != $('#Password').val()) {
        $('#inptPassword').addClass("is-invalid");
        $('#inptPassword').val(""); $('#Password').val("");
        aux = false;
    } else {
        $('#inptPassword').removeClass("is-invalid");
    }
    return aux;
}

function ValidarCamposVacios() {
    var aux = true;
    if ($('#inptName').val() == "") {
        $('#inptName').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptName').removeClass("is-invalid");
    }

    if ($('#inptLastName').val() == "") {
        $('#inptLastName').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptLastName').removeClass("is-invalid");
    }

    if ($('#inptTelephone').val() == "") {
        $('#inptTelephone').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptTelephone').removeClass("is-invalid");
    }

    if ($('#inptDirec').val() == "") {
        $('#inptDirec').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptDirec').removeClass("is-invalid");
    }

    if ($('#inptEmail').val() == "") {
        $('#inptEmail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptEmail').removeClass("is-invalid");
    }

    if ($('#inptPassword').val() == "") {
        $('#inptPassword').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptPassword').removeClass("is-invalid");
    }

    return aux;
}
function CreateNewUser() {

    var NewUserInfo =
        {
            PersonData: {
                Name: $('#inptName').val(),
                Lastname: $('#inptLastName').val(),
                Telephone: $('#inptTelephone').val(),
                Direction: $('#inptDirec').val(),
                Status: { Id: 2 },
                CreatorUser: 6,
                ModificationUser: 6,
                VerificationCode: "Inactive",
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
                LlammarModal("Sing", "Congratulations! Your user has been created successfully.", "However, you should expect one of our administrators to activate your account. An email will be sent to you when the process has finished.");
            } else if(result == 2){
                LlammarModal("Danger", "There is already a registered user with this email!", "Did you forget your password?. Click on the button below to recover your password");
            } else {
                LlammarModal("Danger", "Error! Invalid username or password", "If you forgot your password you can restore it here");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
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
            if (result == 1) {
                window.location.href = '/Home/Index';
            } else if (result == 2) {
                LlammarModal("Danger", "Error! Your account has not been activated.", "If it is an error or we have delayed the activation of your account, please contact us to solve the problem.");                
            } else if(result == 3){
                LlammarModal("Danger", "Invalid password", "If you forgot your password you can restore it here");             
            } else {
                LlammarModal("Danger", "That email is not associated with any account in our records.", "Do you want to create one?");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },
    });
}