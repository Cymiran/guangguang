define(['jquery'],function($){
    return {
        init: function(){
            // 获得登录ming
            let usern = Cookie.get('username');
            if(!!usern){
                $('#noName').hide();
                $('#name').show().find('#username').html(usern);
            }
        }
    }
})