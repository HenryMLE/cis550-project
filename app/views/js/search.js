console.log('got to search js file!');
$(document).ready(function() {
    var query = '';

    $('#searchbar').keyup(function(){
        var searched = $('#searchbar').val();
        query = searched;
        console.log(query);
    });

    $('#searchbtn').click(function() {
        console.log('Search button clicked!');
        window.location.replace('/search/' + query);
    });

});