define(['jquery','commen'],function($,commen){
    return {
        init : function(){
            // 百度地图API功能
            var map = new BMap.Map("allmap");
            var point = new BMap.Point();
            function myFun(result){
                var cityName = result.name;
                cityName = cityName.substring(0,cityName.length-1);
                $('#markName').html(cityName);
                $('#markName').mouseenter(function(){
                    // 获取城市
                    $('ul#citys').show();
                    $('.gps').css('background','white')
                    console.log('ready city...')
                    $.ajax({
                        type: "get",
                        url: "../../json/citys.json",
                        success : function(data){
                            let cityList  = data.citys;
                            let str = ''; 
                            for(var i=0;i<cityList.length;i++){
                                str += `<li><h4 class='text-center'>${cityList[i].region}</h4>`;
                                let astr = '',arr = cityList[i].cityArr;
                                for(let j=0;j<arr.length;j++){
                                    astr += `<a href="javascript:;">${arr[j]}</a>`;
                                }
                                str += astr+`</li>`;
                            }
                            $('#citys').html(str)
                        }
                    })
                })
                $('#citys').mouseleave(function(){
                    $('ul#citys').hide();
                    $('.gps').css('background','none')
                })
                // 点击 picker城市
                $('ul#citys').on('click',function(e){
                    var e = e || event;
                    var target = e.target || e.srcElement;
                    if(target.nodeName == 'A'){
                        var pickCity = $(target).html();
                        $('#markName').html(pickCity);
                        $('.gps').css('background','none')
                        $(this).hide();
                    }
                })
            }
            var myCity = new BMap.LocalCity();
            myCity.get(myFun);
        }
        
    }
})