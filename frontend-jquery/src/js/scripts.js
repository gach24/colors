

$(function () {
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
});