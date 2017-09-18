require(['config'],function(m){
    require(['jquery','topSearch','swiper','markerJs','navAll','banner'],
    function($,search,swiper,marker,navAll,banner){
        $(function(){
            console.log('初始化...')
            // 页面顶部
            $('#header').load('../html/sub/top.html',()=>{
                // 搜索框
                search.init({
                    //select表示选择事件
                    callback: function(data){
                        console.log("%c"+data,"color:red");
                    }
                });
                // 定位
                marker.init();
                // 导航 all
                navAll.init();
            })
            // 主体
            $('#main-cont').load('../html/sub/main.html',() => {
                banner.init();
            })
            // 页脚
            $('#footer').load('../html/sub/footer.html')
            
            
        })
    })
})