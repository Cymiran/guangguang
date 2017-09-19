define(['jquery'],function($){
    return {
        init : function (){
            console.log('楼层....');
            let $navs = $('.elivator ul li:not(:last)');
            $navs.click(function(){
                let index = $(this).index();
                $(this).siblings().removeClass('active');
                $(this).addClass('active');
                $('body,html').animate({scrollTop: 1000 + index * 450},1000)
                $('.elivator').css("top",(1000 + index * 450)+'px')
            })
            $(window).scroll(function(){
                var _scrolltop = $(this).scrollTop();
                if(_scrolltop > 750) {
                    $(".elivator").fadeIn(500);
                } else {
                    $(".elivator").fadeOut(500);
                }
            })
            $('.elivator ul li:last').click(function(){
                $("body,html").animate({scrollTop: 0}, 1000);
            })
        }
    }
})