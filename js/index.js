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
            $('#cart').load('./sub/cart.html',() => {
                console.log('右侧购物车导航....')
                // 显示购物车数量
                let username = Cookie.get('username');
                let discount = 0;
                $.ajax({
                    url: 'http://datainfo.duapp.com/shopdata/getCar.php',
                    dataType : 'jsonp',
                    data : {
                        userID : username,
                    },
                    success:function(data){
                        if(data == 0){
                            $('#cart-count').hide();
                        }else{
                            $('#cart-count').show();
                            for(let i=0;i<data.length;i++){
                                discount +=parseInt(data[i].number);
                            }
                            let c = discount;
                            if(c>99){
                                c = '99+';
                            }
                            $('#cart-count').html(c);
                        }
                    }

                })
                $('.cartbtn').on('click',function(){
                    window.location.href = './sub/cart-detail.html'
                })
            })
            
        })
    })
})