'use strict';

require(['config'], function (m) {
    require(['jquery', 'swiper', 'commen', 'markerJs', 'jquery-ui'], function ($, swiper, commen, marker) {
        $(function () {
            console.log(uname,pwd)
            console.log('初始化...');
            $('#header').load('../html/sub/top.html');
            $('#footer').load('../html/sub/footer.html');
            // 定位
            marker.init();
        });
    });
});