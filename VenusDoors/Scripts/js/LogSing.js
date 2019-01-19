$(document).ready(function () {

    $("#idLogin").on("click", function () {
        Autherize();
    });
    $("#idSignUp").on("click", function () {
        InsertUser();
    });
});

function Login() {
    var datos =
                    {
                        itemLogin: $("#valitemILogin").val(),
                    }

    console.log(datos);
    $.ajax({
        type: 'POST',
        url: urlAutherize,
        success: function (result) {

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

function SignUp() {
    var datos =
                    {
                        itemSignUp: $("#valitemISignUp").val(),
                    }

    console.log(datos);
    $.ajax({
        type: 'POST',
        url: urlInsertUser,
        success: function (result) {

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