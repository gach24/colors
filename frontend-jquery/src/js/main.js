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
    q41: [],
    q42: 1,
    q43: 1,
    q44: 1,
    q45: 1,
    q46: 1,
    q47: 1,
    q48: 1,
    q49: 1,
    q50: 1,
    q51: 1,
    q52: 1,
    q53: 1,
    q54: 1,
    q55: 1,
    q56: 1,
    q57: 1,
    q58: 1,
    q59: 1,
    q60: 1,
    q61: 1, 
    q62: 1,
    q63: 1, 
    q64: 1,
    q65: 1, 
    q66: 1,
    q67: 1, 
    q68: 1,
    q69: 1, 
};

/**
 * Init first seccion 1
 */
var initFistSection = function () {
    $('.first-section .grid-item').on('click', function () {
        $('.first-section i').css('visibility', 'hidden');
        $(this).find('i').css('visibility', 'visible');
        // $('.first-section i').hide();
        // $(this).find('i').show();
        $('.first-section .grid-item').removeClass('selected');
        $(this).addClass('selected');
        poll['q01'] = $(this).attr('data-color');
        // console.log(poll);

    });
}

/**
 * Init second section
 */
var initSecondSection = function () {
    $('.second-section input:radio').on('change', function () {
        poll[$(this)[0].name] = $(this)[0].value;
    });
}

/**
 * Init third section
 */
var initThirdSection = function () {

    $('.third-section .options div').on('click', function () {
        var colors = poll[$(this).parent()[0].id];
        var color = $(this).attr('data-color');
        var position = colors.indexOf(color);

        if (position < 0) {
            $(this).addClass('selected');
            $(this).find('i').css('visibility', 'visible');
            colors.push(color);

        } else {

            $(this).removeClass('selected');
            // $(this).find('i').hide();
            $(this).find('i').css('visibility', 'hidden');
            colors.splice(position, 1);
        }
    });
}

/**
 * Init third section
 */
var initFourthSection = function () {
    var slider = $('.range-slider'),
        range = $('.range-slider__range'),
        value = $('.range-slider__value');

    /*
    slider.each(function () {

        
    });
    */
    value.each(function () {
        var value = $(this).prev().attr('value');
        $(this).html(value);
    });

    range.on('input', function () {
        $(this).next(value).html(this.value);
        poll[$(this)[0].id] = this.value;
    });
};




/**
 * Validation 
 */
function validation() {
    var keys = [];
    $.each(poll, function (key, val) {
        if ((Array.isArray(val) && val.length === 0) || !val)
            keys.push(key);
        // console.log(typeof(val));
    });
    return keys;
}

function showErrors(errors) {
    let message = "Debe cumplimentar las preguntas: "
    $.each(errors, function (index, value) {

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
        poll['age'] = user.age;
        poll['gender'] = user.gender;
        $('nav a').text("Bienvenid@ " + user.email);



        initFistSection();

        initSecondSection();

        initThirdSection();

        initFourthSection();
        

        // 
        const url = 'http://ec2-3-83-66-86.compute-1.amazonaws.com:8080/new';
        $('button').on('click', function () {
            var errors = validation();
            if (errors.length === 0) {
                console.log(poll);
                $.ajax({
                    url: url,
                    type: 'POST',
                    contentType: "application/json",
                    crossDomain: true,
                    dataType: 'json',
                    success: function(result){
                        showErrors([]);
                        window.location.href = './';
                    },
                    data: JSON.stringify(poll)
                });

            } else {
                showErrors(errors);
            }
        });
    } else {
        window.location.href = window.location.origin;
    }




});