require(['config'],function(m){
    require(['jquery','commen','topSearch','swiper','markerJs','navAll','banner','goods','elevator'],
    function($,commen,search,swiper,marker,navAll,banner,goods,elevator){
        $(function(){
            console.log('初始化...')
            // 页面顶部
            $('#header').load('../html/sub/top.html',()=>{
                // 用户名登录
                $('#noName').hide();
                $('#name').show();
                $('#username').html(Cookie.get('username'))
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
                navAll.init('index');
            })
            // 主体
            $('#main-cont').load('../html/sub/main.html',() => {
                banner.init();
                goods.init();
                elevator.init();
            })
            // 页脚
            $('#footer').load('../html/sub/footer.html')
            
            
            
        })
    })
})