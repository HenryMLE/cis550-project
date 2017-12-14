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
        console.log(email);
        console.log(pass);
        $.post('/signin', {'email': email, 'password': pass})
            .done(function(data) {
                console.log(data);
                console.log('here');
                if (data.found) {
                    window.location.href = '/account/' + email;
                }
                else {
                    console.log('Incorrect username or password');
                }
        });
    });
});