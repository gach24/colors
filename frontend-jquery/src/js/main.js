
$(function () {

    const colors = [
        'brown', 
        'pink', 
        'grey', 
        'violet', 
        'orange', 
        'yellow', 
        'black', 
        'green', 
        'red', 
        'gold', 
        'silver', 
        'blue',
        'white'
    ];

    const url = 'http://localhost:8080/new';
    var poll = {
        email: 'germanach@educastur.org',
        age: 18,
        gender: 'V',
        q01: '',
        q02: '',
        q03: '',
        q04: '',
        q05: '',
        q06: '',
        q07: '',
        q08: '',
        q09: '',
        q10: '',
        q11: '',
        q12: '',
        q13: '',
        q14: '',
        q15: '',
        q16: '',
        q17: '',
        q18: '',
        q19: '',
        q20: '',
        q21: '',
        q22: '',
        q23: '',
        q24: '',
        q25: [],
        q26: [],
        q27: [],                
        q28: [],
        q29: [],
        q30: [],
        q31: [],
        q32: [],
        q33: [],
        q34: [],
        q35: [],
        q36: [],
        q37: [],
        q38: [],
        q39: [],
        q40: [],
        q41: [],
    };  
   

    /**
     * Init first seccion 1
     */ 
    $('.first-section i').hide();
    $('.first-section .grid-item').on('click', function() {
        $('.first-section i').hide();
        $(this).find('i').show();
        $('.first-section .grid-item').removeClass('selected');
        $(this).addClass('selected');
        poll['q01'] = $(this).attr('data-color');
        console.log(poll);
    });

    /**
     * Init second section
     */
    $('.second-section input:radio').on('change', function() {
        poll[$(this)[0].name] = $(this)[0].value;        
    });
    /*
    $('.second-section tr').each(function(i, element) {
        console.log(i);
        console.log(element);

    });*/


    // Init section 3
    $('.thrid-section i').hide();
    $('.thrid-section .options div').on('click', function() {
       
        var colors = poll[$(this).parent()[0].id]; 
        var color  = $(this).attr('data-color');
        var position = colors.indexOf(color);
        
        if ( position < 0) {
            $(this).addClass('selected'); 
            $(this).find('i').show();
            colors.push(color);
       
        } else {

            $(this).removeClass('selected');
            $(this).find('i').hide();
            colors.splice(position, 1);
        } 
              
              
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