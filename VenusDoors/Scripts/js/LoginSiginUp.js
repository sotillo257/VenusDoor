﻿$(document).ready(function () {
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
                $('#modalCongra').modal('toggle');
            } else if(result == 2){
                $('#modalExist').modal('toggle');
            } else {
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            $('#modalFAIL').modal('toggle');
        },

    });
}

function Login() {

    var Datos =
        {
            UserData: {
                Email: $('#inptEmail').val(),
                Password: $('#inptPassword').val(),

            }
        };
    $.ajax({
        type: 'POST',
        data: JSON.stringify(Datos),
        url: urlAutherize,
        dataType: "json",
        contentType: 'application/json; charset=utf-8',
        success: function (result) {

            //Validar data para ver si mostrar error al guardar o exito al guardar
            if (result == true) {
                var url = '@Url.Action("Index", "Home")';
                window.location.href = url;
            } else{
                $('#modalError').modal('toggle');
            }
        },
        error: function (err) {
            $('#modalFAIL').modal('toggle');
        },

    });
}

