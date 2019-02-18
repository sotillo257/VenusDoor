$(document).ready(function () {
    $("#btSend").on("click", function () {       
        if (ValidarEmailVacio()) {
            if(validarEmailvalido()){
            $('#inptEmail').removeClass("is-invalid");
            EmailToRecuperation();
            }
            else {
                LlammarModal("Danger", "You must enter a valid email.");
                $('#inptEmail').addClass("is-invalid");
                $("#btSend").prop('disabled', false);
            }
        } else {
            LlammarModal("Danger", "You must enter the Email.");
            $('#inptEmail').addClass("is-invalid");
            $("#btSend").prop('disabled', false);
        }
    });

    $("#verificationBTN").on("click", function () {        
        if (ValidarCodigoVacio()) {
            $('#verificationCode').removeClass("is-invalid");
            ValidateCodeRecovery();
        } else {
            LlammarModal("Danger", "You must enter the verification code.", " ");
            $('#verificationCode').addClass("is-invalid");
        }
    });

    $("#btNewppas").on("click", function () {
        if (ValidarCamposVacios()) {
            if (ValidadCantidad()) {
                if (ValContrasenas()) {
                    ModifyPassword();
                } else {
                    LlammarModal("Danger", "Passwords do not match.", " ");
                }
            } else {
                LlammarModal("Danger", "The password must have a minimum of 8 characters and a maximum of 15.");
            }            
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }            
    });
   
    $(document).on('change', '#inptPassword1', function () {
        if ($('#inptPassword1').val().length < 8) {
            $('#inptPassword1').addClass("is-invalid"); 
            $("#labelerror1").css('display', 'block');
        } else if ($('#inptPassword1').val().length > 15) {
            $('#inptPassword1').addClass("is-invalid");
            $("#labelerror11").css('display', 'block');        
        } else {
            $('#inptPassword1').removeClass("is-invalid");
            $("#labelerror1").css('display', 'none');
        }        
    });

    $(document).on('change', '#inptPassword2', function () {
        if ($('#inptPassword2').val().length < 8) {
            $('#inptPassword2').addClass("is-invalid");
            $("#labelerror2").css('display', 'block');
        } else if ($('#inptPassword2').val().length > 15) {
            $('#inptPassword2').addClass("is-invalid");
            $("#labelerror22").css('display', 'block');
        } else {
            $('#inptPassword2').removeClass("is-invalid");
            $("#labelerror2").css('display', 'none');
        }
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
                $("#btSend").prop('disabled', false);
            } else if (result == 2) {
                LlammarModal("Congratuletions", "We have sent an email with a verification code so you can modify your password.");                
                setTimeout(function () { window.location.href = '/Logins/New_Password'; }, 3000);
            } else {
                LlammarModal("Danger", "An error occurred during the process.");
                $("#btSend").prop('disabled', false);
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
                $(".ddbbld").prop('disabled', false);
            } else if(result == 2){
                LlammarModal("Danger", "The verification code is wrong");
                $('#verificationCode').addClass("is-invalid");
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

            verificationC: $('#verificationCode').val(),
        };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(datos),
        url: urlModifyPassword,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == 1) {
                LlammarModal("Congratuletions", "Your password has been modified successfully.");
                setTimeout(function () { window.location.href = '/Logins/Index'; }, 3000);
            } else if(result == 2){
                LlammarModal("Danger", "Wait, something is not right?.", "We have detected a problem during the process. Have you skipped a step?");
            } else {
                LlammarModal("Danger", "An error occurred during the process.");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },
    });
}

function ValContrasenas() {
    var aux = true;
    if ($('#inptPassword1').val() != $('#inptPassword2').val()) {
        $('#inptPassword1').addClass("is-invalid");
        $('#inptPassword2').addClass("is-invalid");
        $('#inptPassword1').val(""); $('#inptPassword2').val("");
        aux = false;
    } else {
        $('#inptPassword1').removeClass("is-invalid");
        $('#inptPassword2').removeClass("is-invalid");
    }
    return aux;
}

function ValidarCamposVacios() {
    var aux = true; 
    if ($('#inptPassword1').val() == "") {
        $('#inptPassword1').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptPassword1').removeClass("is-invalid");
    }
    if ($('#inptPassword2').val() == "") {
        $('#inptPassword2').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptPassword2').removeClass("is-invalid");
    }
    return aux;
}

function ValidarCodigoVacio() {
    var aux = true;
    if ($('#verificationCode').val() == "") {
        $('#verificationCode').addClass("is-invalid");
        aux = false;
    } else {
        $('#verificationCode').removeClass("is-invalid");
    }    
    return aux;
}

function ValidarEmailVacio() {
    var aux = true;
    if ($('#inptEmail').val() == "") {
        $('#inptEmail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptEmail').removeClass("is-invalid");
    }
    return aux;
}

function ValidadCantidad() {
    var aux = true;
    if ($('#inptPassword1').val().length < 8 || $('#inptPassword1').val().length > 15) {
        $('#inptPassword1').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptPassword1').removeClass("is-invalid");
    }
    if ($('#inptPassword2').val().length < 8 || $('#inptPassword2').val().length > 15) {
        $('#inptPassword2').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptPassword2').removeClass("is-invalid");
    }
    return aux;
}

function validarEmailvalido(){
    var aux = true;
    var regex = /^(?:[^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*|"[^\n"]+")@(?:[^<>()[\].,;:\s@"]+\.)+[^<>()[\]\.,;:\s@"]{2,63}$/i;
  
    if (!regex.test($('#inptEmail').val())) {
        $('#inptEmail').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptEmail').removeClass("is-invalid");
    }
    return aux;
} 