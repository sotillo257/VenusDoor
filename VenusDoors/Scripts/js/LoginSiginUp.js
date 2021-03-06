﻿$(document).ready(function () {
    GetCompanys();
    $("#btNewUser").on("click", function () {
        if (ValidarCamposVacios()) {
            if (validarEmailvalido()) {
                if (ValContrasenas()) {
                    CreateNewUser();
                } else {
                    LlammarModal("Danger", "Passwords do not match.", " ");
                }
            }else{
                LlammarModal("Danger", "You must enter a valid email.");
            }           
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }

    });

    $(".ingresar").on("click", function () {
        if (ValidarInptLogin()) {
            Signin();
        } else {
            LlammarModal("Danger", "You must fill all the fields.", " ");
        }       
    });
});
function ValContrasenas() {
    var aux = true;
    if ($('#inptPassword').val() != $('#Password').val()) {
        $('#inptPassword').addClass("is-invalid");
        $('#Password').addClass("is-invalid");
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

    if ($('#cbCompany').val() == 0 || $('#cbCompany').val() == null) {
        $('#select2-cbCompany-container').addClass("cbError");
        aux = false;
    } else {
        $('#select2-cbCompany-container').removeClass("cbError");
    }

    if ($('#inptPassword').val() == "") {
        $('#inptPassword').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptPassword').removeClass("is-invalid");
    }

    if ($('#Password').val() == "") {
        $('#Password').addClass("is-invalid");
        aux = false;
    } else {
        $('#Password').removeClass("is-invalid");
    }

    if ($('#inptResidence').val() == "") {
        $('#inptResidence').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptResidence').removeClass("is-invalid");
    }

    if ($('#inptCity').val() == "") {
        $('#inptCity').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptCity').removeClass("is-invalid");
    }

    if ($('#inptStreet').val() == "") {
        $('#inptStreet').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptStreet').removeClass("is-invalid");
    }

    if ($('#inptZipCode').val() == "") {
        $('#inptZipCode').addClass("is-invalid");
        aux = false;
    } else {
        $('#inptZipCode').removeClass("is-invalid");
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
                Status: { Id: 1},
                CreatorUser: 6,
                ModificationUser: 6,
                VerificationCode: "Inactive",
            },

            UserData: {
                Email: $('#inptEmail').val(),
                Password: $('#inptPassword').val(),
                Type: { Id: 3 },
                Person: { Id: 0 },
                Company: { Id: $('#cbCompany').val() },
                Status: { Id: 2},
                CreatorUser: 6,
                ModificationUser: 6,
            },

            ShippingData: {
                Name: $('#inptResidence').val(),
                Contact: $('#inptTelephone').val(),
                Residence: $('#inptResidence').val(),
                Address: $('#inptDirec').val(),
                City: $('#inptCity').val(),
                St: $('#inptStreet').val(),
                ZipCode: $('#inptZipCode').val(),
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
                LlammarModal("Sing", "Congratulations! Your user has been successfully created.", "Your account will be activated by one of our administrators. An email will be sent to you when the process has finished.");
            } else if(result == 2){
                LlammarModal("Danger", "There is already a registered user with this email!", "Did you forget your password?. Click <a href='" + urlRecoverPassword + "'>here</a> to recover your password");
            } else {
                LlammarModal("Danger", "An error occurred during the process.");
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
                LlammarModal("Danger", "Invalid password", "If you forgot your password you can restore it <a href='"+urlRecoverPassword+"'> here</a>");             
            } else {
                LlammarModal("Danger", "That email is not associated with any account in our records.", "Don't have an account yet? <a href='" + urlSingUp + "' >Sign up!</a>");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        },
    });
}

function GetCompanys() {
    $.ajax({
        url: urlGetAllCompanys,
        cache: false,
        type: 'POST',
        async: false,
        contentType: "application/json; charset=utf-8",
        success: function (data) {
            if (data != null) {
                var option = '<option value="0" selected Style="Display:none">Select</option>';
                for (var i = 0; i < data.length; i++) {
                    if (data[i].Status.Id == 1) {
                        option += '<option value="' + data[i].Id + '">' + data[i].Name + '</option>';
                    }

                }
                $("#cbCompany").empty().append(option);

            }
            else {
                LlammarModal("Danger", "Error obtaining Companys", " ");
            }
        },
        error: function (err) {
            LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
        }
    });
}

function ValidarInptLogin() {
    var aux = true;
    if ($('#intEmail').val() == "") {
        $('#intEmail').addClass("is-invalid");
        aux = false;
    } else {
        $('#intEmail').removeClass("is-invalid");
    }

    if ($('#intPassword').val() == "") {
        $('#intPassword').addClass("is-invalid");
        aux = false;
    } else {
        $('#intPassword').removeClass("is-invalid");
    }
    return aux;
}

function validarEmailvalido() {
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