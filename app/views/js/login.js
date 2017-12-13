console.log("hi");
$(document).ready(function() {
    var email = '';
    var pass = '';

    $('#inputEmail').keyup(function() {
        var cemail = $('#inputEmail').val();
        email = cemail;
        console.log('You typed something!');
        console.log(email);
    });

    $('#inputPassword').keyup(function() {
        cpass = $('#inputPassword').val();
        pass = cpass;
        console.log(pass);
    });

    $('#create').click(function() {
        console.log('hiiiiiiii');
        console.log(email);
        console.log(pass);
        var post = $.post('/newAccount', {'email': email, 'password': pass}, function(data) {
            console.log(data);
        });
    });
});