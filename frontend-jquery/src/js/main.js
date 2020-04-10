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


var poll = {
    email: '',
    age: null,
    gender: '',
    q01: null,
    q02: null,
    q03: null,
    q04: null,
    q05: null,
    q06: null,
    q07: null,
    q08: null,
    q09: null,
    q10: null,
    q11: null,
    q12: null,
    q13: null,
    q14: null,
    q15: null,
    q16: null,
    q17: null,
    q18: null,
    q19: null,
    q20: null,
    q21: null,
    q22: null,
    q23: null,
    q24: null,
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
function initFistSection() {

    $('.first-section i').hide();
    $('.first-section .grid-item').on('click', function() {
        $('.first-section i').hide();
        $(this).find('i').show();
        $('.first-section .grid-item').removeClass('selected');
        $(this).addClass('selected');
        poll['01'] = $(this).attr('data-color');
        // console.log(poll);
    });
}

/**
 * Init second section
 */
function initSecondSection() {
    $('.second-section input:radio').on('change', function() {
        poll[$(this)[0].name] = $(this)[0].value;        
    });
}

/**
 * Init third section
 */
function initThirdSection() {
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
}

/**
 * Validation 
 */
function validation() {
    var keys = [];
    $.each(poll, function(key, val) {
        if ((Array.isArray(val) && val.length === 0) || !val) 
            keys.push(key);
        // console.log(typeof(val));
    });
    return keys;
}

function showErrors(errors) {
    let message = "Debe cumplimentar las preguntas: "
    $.each(errors, function(index, value) {
        
        if (index === errors.length - 1)
            message += value.substring(1);
        else
            message += value.substring(1) + ", ";
    });

    $('footer p').text(message);
}

$(function () {

    user = JSON.parse(localStorage.getItem('user'));


    if (user) {
        poll['email'] = user.email;
        poll['age']   = user.age;
        poll['gender'] = user.gender; 
        $('nav a').text("Bienvenid@ " + user.email);
        
        

        initFistSection();

        initSecondSection();
    
        initThirdSection();
    
        const url = 'http://localhost:8080/new';
        // const url = 'http://ec2-3-83-66-86.compute-1.amazonaws.com:8080/new';
        $('button').on('click', function() {
            var errors = validation();
            if (errors.length === 0)
                console.log(poll);
            /*
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
            */ 
            else
                showErrors(errors);
        }); 
    }
    else {
        window.location.href = window.location.origin;
    }
   



});