require(['config'],function(m){
    require(['jquery','jquery-ui','commen','topSearch','markerJs','navAll','detailShow'],
    function($,jqueryui,commen,search,marker,navAll,detailShow){
        $(function(){
            console.log('初始化...')
            // 页面顶部
            $('#header').load('./top.html',()=>{
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
            
            
        })
    })
})