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
                $('#idLogin').urlAutherize('toggle');
            } else {
                LlammarModal("Danger", "Error! Invalid username or password", "If you forgot your password you can restore it here");
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
                LlammarModal("Sing", "Congratulations! The creation of your user has been successful.", "A message has been sent to the email supplied with an activation code to complete your registration.");
            } else {
                LlammarModal("Danger", "An error occurred during the process.", "Check your internet connection I tried again");
            }
        },
        error: function (err) {
            alert("error");
        },

    });
}