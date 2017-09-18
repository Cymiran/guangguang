require(['../config'],function(m){
    require(['jquery','formVail','jquery-ui'],function($,fVail){
        $(function(){
            $('#footer').load('../../html/sub/footer.html')
            console.log('注册啦...')
             fVail.init();
            // $('#send').on('click',function(){
            //     window.location.href = '../../html/login/login.html';
                
            // })
        })
    })
})