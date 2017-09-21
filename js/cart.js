require(['config'],function(m){
    require(['jquery','cartDetail'],function($,cartDetail){
        $(function(){
            $('#footer').load('./footer.html')
            cartDetail.init()
        })
    })
})
