'use strict';

define(['jquery'], function ($) {
    return {
        init: function init() {
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point();
            function myFun(result) {
                var cityName = result.name;
                cityName = cityName.substring(0, cityName.length - 1);
                $('#markName').html(cityName);
                $('#markName').mouseenter(function () {
                    // 获取城市
                    console.log('ready city...');
                    $.ajax({
                        type: "get",
                        url: "../../json/citys.json",
                        success: function success(data) {
                            console.log(data);
                            var cityList = data.citys;
                            var str = '';
                            for (var i = 0; i < cityList.length; i++) {
                                str += "<li><h4 class='text-center'>" + cityList[i].region + "</h4>";
                                var astr = '',
                                    arr = cityList[i].cityArr;
                                for (var j = 0; j < arr.length; j++) {
                                    astr += '<a href="javascript:;">' + arr[i] + '</a>';
                                    str += astr;
                                }
                                str += "</li>";
                            }
                            $('#citys').html(str);
                        }
                    });
                });
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        }

    };
});