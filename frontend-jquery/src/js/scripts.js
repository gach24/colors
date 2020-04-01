

$(function () {

    var url = 'http://localhost:8080/new';
    var poll = {
        email: 'germanach@educastur.org',
        age: 18,
        gender: 'V'
    };  
   

    // Init seccion 1
    $('.first i').hide();
    $('.first .grid div').on('click', function() {
        $('.first i').hide();
        $(this).find('i').show();
    });

    // Init section 3
    $('.thrid i').hide();
    $('.thrid .options div').on('click', function() {
        $(this).find('i').show();
    });

    $('button').on('click', function() {
        console.log("Click");
        $.ajax({
            url: url,
            type: 'POST',
            contentType: "application/json",
            crossDomain: true,
            dataType: 'json',
            success: function(result){
                console.log(result);
            },
            data: JSON.stringify(poll)
        }); 
    }); 



});