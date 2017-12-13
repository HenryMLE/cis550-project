console.log("hi");
$(document).ready(function() {
    var email = '';
    var pass = '';
    console.log('made it to the js!');

    $('#inputEmail').keyup(function() {
        email = $('#inputEmail').val();
        console.log('You typed something!');
    });

    $('#inputPassword').keyup(function() {
        pass = $('#inputPassword').val();
    });

    $('#create').click(function() {
        console.log(email);
        console.log(pass);
        $.post('/', {'email': email, 'password': pass}, function(data) {
            console.log(data);
        });
        $.get('/signin');
    });
});