



$(document).ready(function () {
    $(".txtHeight").keyup(function (e) {
        var Height = parseFloat($(this).val())
        if ($(this).val() <= 36) {
            if (e.keyup = true) {
                var ip1 = 3.5;
                var ip2 = Height - 3.5;
                $('#HingePositions1').val(ip1);
                $('#HingePositions2').val(ip2);
                $('#HingePositions3').val("No hinge");
                $('#HingePositions4').val("No hinge");
                $('#HingePositions5').val("No hinge");
            }
        }
        else if ($(this).val() <= 60) {
            if (e.keyup = true) {
                var ip1 = 3.5;
                var ip2 = Height / 2;
                var ip3 = Height - 3.5;
                $('#HingePositions1').val(ip1);
                $('#HingePositions2').val(ip2);
                $('#HingePositions3').val(ip3);
                $('#HingePositions4').val("No hinge");
                $('#HingePositions5').val("No hinge");
            }
        } else if ($(this).val() <= 80) {
            if (e.keyup = true) {
                var ip1 = 3.5;
                var ip2 = ((Height - 7) / 3) + 3.5;
                var ip3 = Height - (((Height - 7) / 3) + 3.5);
                var ip4 = Height - 3.5;
                $('#HingePositions1').val(ip1);
                $('#HingePositions2').val(ip2);
                $('#HingePositions3').val(ip3);
                $('#HingePositions4').val(ip4);
                $('#HingePositions5').val("No hinge");
            }
        } else if ($(this).val() > 80) {
            if (e.keyup = true) {
                var ip1 = 3.5;
                var ip2 = 3.5 + (((Height / 2) - 3.5) / 2);
                var ip3 = Height / 2;
                var ip4 = Height - (3.5 + (((Height / 2) - 3.5) / 2));
                var ip5 = Height - 3.5;
                $('#HingePositions1').val(ip1);
                $('#HingePositions2').val(ip2);
                $('#HingePositions3').val(ip3);
                $('#HingePositions4').val(ip4);
                $('#HingePositions5').val(ip5);
            }
        }
        else {

        }
    });
});
