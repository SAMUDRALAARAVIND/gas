$(document).ready(() => {
    $("#user_name").blur(() => {
            // console.log($("#user_name").val().length) ;
            if ($("#user_name").val().length > 6 && $("#user_name").val().length<20) {
                $("#username_check").css({
                    "visibility": "visible",
                    "color": "green"
                });
                $("#username_check").text("check");
                $("#username_label").css("color", "green");
                arr[0] = true;
            } else {
                $("#username_check").css({
                    "visibility": "visible",
                    "color": "red"
                });
                $("#username_check").text("close");
                $("#username_label").css("color", "red");
                arr[0] = false;
            }
        }

    );

    $("#emailid").blur(() => {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test($("#emailid").val())) {
            $("#email_check").css({
                "visibility": "visible",
                "color": "green"
            }).text("check");

            $("#email_label").css("color", "green").text("Valid Email");
            arr[1] = true;
        } else {
            $("#email_check").css({
                "visibility": "visible",
                "color": "red"
            }).text("close");
            $("#email_label").css("color", "red").text("Invalid Email");
            arr[1] = false;
        }
    });

    $("#phn_number").blur(() => {
        if (/^[6-9][0-9]{9}$/.test($("#phn_number").val())) {
            $("#phone_no_label").css("color", "green").text("Valid Number");
            $("#phone_no_check").css({
                "visibility": "visible",
                "color": "green"
            }).text("check");
            arr[2] = true;
        } else {
            $("#phone_no_label").css("color", "red").text("Invalid Number");
            $("#phone_no_check").css({
                "visibility": "visible",
                "color": "red"
            }).text("close");
            arr[2] = false;
        }
    });

    $("#address").blur(() => {
        if ($("#address").val().length > 10) {
            $("#address_check").css("visibility", "visible");
            $("#address_label").css("color", "green");
            arr[3] = true;
        } else {
            arr[3] = false;
        }
    });


    $("#create_password").blur(() => {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test($("#create_password").val())) {

            $("#create_password_label").css("color", "green").text("Valid Password");
            arr[4] = true;
        } else {
            $("#create_password_label").css("color", "red").text("Invalid Password");
            arr[4] = false;
        }
    });



    $("#confirm_password").blur(() => {
        if (/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,16}$/.test($("#confirm_password").val())) {

            $("#confirm_password_label").css("color", "green").text("Valid Password");
            arr[5] = true;
        } else {
            $("#confirm_password_label").css("color", "red").text("Invalid Password");
            arr[5] = false;
        }
    });


    $("#create_password_check").click(() => {
        if ($("#create_password").attr("type") == "text") {
            $("#create_password_check").text("visibility_off");
            $("#create_password").attr("type", "password");

        } else {
            $("#create_password_check").text("visibility");
            $("#create_password").attr("type", "text");
        }
    })



    $("#confirm_password_check").click(() => {
        if ($("#confirm_password").attr("type") == "text") {
            $("#confirm_password_check").text("visibility_off");
            $("#confirm_password").attr("type", "password");

        } else {
            $("#confirm_password_check").text("visibility");
            $("#confirm_password").attr("type", "text");
        }
    })


});