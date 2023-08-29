
// sources (shamelessly copied from)
// - https://twitter.com/Jiayin_Cao/status/13299045627029790720www0u
// - https://agraphicsguynotes.com/posts/fiber_in_cpp_understanding_the_basics/
// - https://zero-radiance.github.io/
// note that you may have to change the class name
function doToc() {

    var $toc = $('#TableOfContents');

    if ($toc.length <= 0)
        return;

    var $window = $(window);

    function onScroll() {
        var currentScroll = $window.scrollTop();
        var h = $('h1, h2, h3, h4, h5, h6');
        var id = "";
        h.each(function (i, e) {
            e = $(e);
            if (e.offset().top - 80 <= currentScroll) {
                id = e.attr('id');
            }
        });
        var active = $toc.find('a.active');
        if (active.length == 1 && active.eq(0).attr('href') == '#' + id) return true;

        active.each(function (i, e) {
            $(e).removeClass('active').siblings('ul').hide();
        });

        var semi_active = $toc.find('a.semi_active');
        semi_active.each(function (i, e) {
            $(e).removeClass('semi_active').siblings('ul').hide();
        });

        $toc.find('a[href="#' + id + '"]').parentsUntil('#TableOfContents').each(function (i, e) {
            if (i == 0)
                $(e).children('a').addClass('active').siblings('ul').show();
            else
                $(e).children('a').addClass('semi_active').siblings('ul').show();
        });
    }

    $window.on('scroll', onScroll);
    $(document).ready(function () {
        $toc.find('a').parent('li').find('ul').hide();
        onScroll();
        // the class name you may have to change
        document.getElementsByClassName('custom-toc')[0].style.display = '';
    });
}

doToc();