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

    $('#login').click(function() {
        console.log('hiiiiiiii');
        console.log(email);
        console.log(pass);
        var post = $.post('/signin', {'email': email, 'password': pass}, function(data) {
            console.log(data);
            if (data.found) {
                $.get('/account', {'username':email});
            }
            else {

            }
        });
    });
});