require(['config'],function(m){
    require(['jquery','commen','getUser','topSearch','swiper','markerJs','navAll','banner','goods','elevator'],
    function($,commen,getUser,search,swiper,marker,navAll,banner,goods,elevator){
        $(function(){
            console.log('初始化...')
            // 页面顶部
            $('#header').load('../html/sub/top.html',()=>{
                // 用户名登录
                getUser.init();
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
            
            // 右边购物车导航
            $('#cart').load('../html/sub/cart.html',() => {
                console.log('右侧购物车导航....')
            })
            
        })
    })
})