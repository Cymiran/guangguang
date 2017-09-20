require(['config'],function(m){
    require(['jquery','cartDetail'],function($,cartDetail){
        $(function(){
            cartDetail.init()
        })
    })
})
