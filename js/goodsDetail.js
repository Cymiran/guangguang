require(['config'],function(m){
    require(['jquery','jquery-ui','commen','getUser','topSearch','markerJs','navAll','detailShow'],
    function($,jqueryui,commen,getUser,search,marker,navAll,detailShow){
        $(function(){
            console.log('初始化...')
            // 页面顶部
            $('#header').load('./top.html',()=>{
                // 用户名登录
                getUser.init();
                // 搜索框
                search.init({
                    //select表示选择事件
                    callback: function(data){
                        console.log("%c"+data,"color:red");
                    }
                })
                // 定位
                marker.init();
                // 导航 all
                navAll.init('detail');
            })
            // 主体
            $('#main').load('./goods-detail-main.html',()=>{
                detailShow.init();
                $( "#tabs" ).tabs();
            })
            // 页脚
            $('#footer').load('./footer.html')
            
            // 右边购物车导航
            $('#cart').load('./cart.html',() => {
                console.log('右侧购物车导航....')
                $('.cartbtn').on('click',function(){
                    window.location.href = './cart-detail.html'
                })
            })
        })
    })
})