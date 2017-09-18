define(['jquery','swiper'],function($,swiper){
    return {
        init : function(){
            console.log('init-banner...');
            var mySwiper = new Swiper('.swiper-container',{
                paginationClickable: '.swiper-pagination',
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                spaceBetween: 30,
                effect: 'fade',
                autoplay: 2500,
			})
			console.log("轮播图初始化完成了！");
        }
    }
})