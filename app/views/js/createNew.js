$(document).ready(function() {
    var email = '';
    var pass = '';

    $('#inputEmail').keyup(function() {
        var cemail = $('#inputEmail').val();
        email = cemail;
    });

    $('#inputPassword').keyup(function() {
        cpass = $('#inputPassword').val();
        pass = cpass;
    });

    $('#create').click(function() {
        var post = $.post('/newAccount', {'email': email, 'password': pass}, function(data) {
        });
    });
});