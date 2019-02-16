$(document).ready(function () {
    $("#btSend").on("click", function () {
        EmailToRecuperation();
    });

    $("#verificationBTN").on("click", function () {
        ValidateCodeRecovery();
    });

    $("#btNewppas").on("click", function () {
        ModifyPassword();
    });
});

function EmailToRecuperation() {

    var datos =
        {
                semail: $('#inptEmail').val(),
        };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlRecoveryProcess,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == 1) {
                 LlammarModal("Danger", "Error! There is not a registered user with that email", "Check that it is well written and try again");
            } else if (result == 2) {
                LlammarModal("Congratuletions", "We have sent an email with a verification code so you can modify your password.");                
                setTimeout(function () { window.location.href = '/Logins/New_Password'; }, 3000);
            } else {
                LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },

    });
}

function ValidateCodeRecovery() {

    var datos =
        {
           
                VerificationC: $('#verificationCode').val(),
           
        };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlValidateCodeRecovery,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == 1) {
                $('#ModalVerificationCode').modal('hide');
            } else if(result == 2){
                LlammarModal("Danger", "The verification code is wrong");
            }else {
                LlammarModal("Danger", "An error occurred during the process.");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },
    });
}

function ModifyPassword() {

    var datos =
        {
            pusernew: {
                Password: $('#inptPassword2').val(),
            },
        };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlModifyPassword,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                LlammarModal("Congratuletions", "Your password has been modified successfully.");
                setTimeout(function () { window.location.href = '/Logins/Index'; }, 3000);
            } else {
                LlammarModal("Danger", "An error occurred during the process.");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },
    });
}