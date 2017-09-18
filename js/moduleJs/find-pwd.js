require(['../config'],function(m){
    require(['jquery','commen'],function($,com){
        $(function(){
            let isUname = false;
            let istelNum = false;
            let isvalNum = false;
            let valNum;
            $('#username').blur(function(){
                let un = this.value;
                if(!un){
                    message('#username','用户名必须输入！');
                }else{
                    let uname = Cookie.get('username');
                    if(un == uname){
                        isUname = true;
                    }else{
                        message('#username','没有该用户！');
                    }
                }
                
            })
            $('#number').blur(function(){
                var num = this.value;
                if(!num){
                   message('#tel','手机号必须填写！');
                }
                else if(/^1[3|4|5|7|8]\d{9}$/.test(num)){
                    istelNum = true;
                    tel = num;
                }else{
                    message('#tel','手机号格式不正确');
                }
           })
           $('#vailpwd').blur(function(){
                var num = this.value;
                if(!num){
                    message('#getpwd','请填写得到的密码');
                }
                else if(num == valNum){
                    isvalNum = true;
                }else{
                    message('#getpwd','密码不正确');
                }
            })
            $('#ok').on('click',function(){
                if(isvalNum && isUname && istelNum){
                    window.location.href = '../../html/login/login.html'
                }
            })
            $('#getMsgPwd').on('click',function(){
                if(!istelNum){
                    message('#tel','请填写正确的手机号');
                    return;
                }
               $(this).prop('disabled',true);
               $('#tel').prop('disabled',true);
               let t = 5;
               var timer = setInterval(function() {
                    $('#getMsgPwd').html(t + ' s')  
                    if(t == 0){
                        clearInterval(timer);
                        valNum = Cookie.get('password')
                        console.log(valNum);
                        $('#getMsgPwd').html('获取密码')
                        $('#getMsgPwd').prop('disabled',false);
                    }
                    t--;
               }, 1000);
           })
            function message(id,msg) {
                $(id+'.loginmsg span:last').html(msg)
                $(id+'.loginmsg').show();
                setTimeout(function() {
                    $(id+'.loginmsg').hide()
                }, 3000);
            }
        })
    })
})