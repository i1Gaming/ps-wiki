function scrollToTop() {
    window.scrollTo(0, 0);
};

$(document).ready(function() {
    $(".search-container__text").addClass("d-none");
    $(window).scroll(function() {
        if ($(this).scrollTop() > 350) {
            $('#up-arrow').fadeIn();
        } else {
            $('#up-arrow').fadeOut();
        }
    });
    $('#up-arrow').click(function() {
        $('body,html').animate({
            scrollTop: 0
        }, 1000);
        return false;
    });
});