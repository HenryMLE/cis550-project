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
        $.post('/signin', {'email': email, 'password': pass}, function(result) {
            console.log('here3');
            // console.log(data);
            // window.location.href = '/account/' + email;

        });
        
    });
});