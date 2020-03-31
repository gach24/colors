

$(function () {
    $('.grid-item').on('click', function () {
        console.log("click")
        $('.grid-item i').css('visibility', 'hidden');
        $(this).children().first().css('visibility', 'visible')
    });
});