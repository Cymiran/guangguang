define(['jquery','commen','sweet-alert'],function($,commen,sweetalert){
   function FormVail(){
        this.init = function(){
            // 用户名校验
            var isUserName = false;
            var istel = false;
            var ispassword = false;
            var isrepwd = false;
            var ischecked = true;

            var username = '';
            var tel = '';
            var password = '';

            $('#userName').blur(function(){
            		
                var userN = this.value;
                if(!userN){
                    $('.loginmsg').html('您的账户名必须输入');
                    message();
                }
                var u = (userN.length > 0 && userN.length<4) || userN.length >20
                if(u){
                    $('.loginmsg').html('长度必须是4-20');
                    message();
                }
                // 不可以以数字开头
                var asci = userN.charCodeAt(0);
                var a = asci>=48 && asci<= 97;
                if(a){
                    $('.loginmsg').html('不能以数字开头');
                    message();
                }
                //只能包含数字、字母、下划线
                for(var i=0;i<userN.length;i++){
                    var asc = userN.charCodeAt(i);
                    var isNumber = (asc>=48) && (asc<=97);
                    var isChar = (asc>=65 && asc<=90) || (asc>=97 && asc<=122);
                    var isLine = (asc == 127);
                    if(!(isNumber) && (!isChar) && (!isLine)){
                        $('.loginmsg').html('只能包含以数字、字母、下划线');
                        message();
                    }
                }
                var uu = !u;
                var aa = !a;
                var isn = !isNumber;
                var ll = !isLine;
                if((uu) && (aa) && ((isn) && (isChar) && (ll))){
                    isUserName = true;
                    username = userN;
                }
                
            })
            // 推荐人电话号校验
            $('#telNum').blur(function(){
                var num = this.value;
                if(!num){
                   $('.loginmsg').html('请输入推荐人的手机号');
                   message();
                }
                else if(/^1[3|4|5|7|8]\d{9}$/.test(num)){
                    istel = true;
                    tel = num;
                }else{
                    $('.loginmsg').html('手机号格式不正确');
                    message();
                }
           })
           //设置密码
           $('#pw').blur(function(){
               var pwd = this.value;
               if(!pwd){
                   $('.loginmsg').html('请设置您密码');
                   message();
               }
               else if(pwd.length != 6){
                    $('.loginmsg').html('密码长度为6位')
                    message();
               }
               else if(/^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S+$/.test(pwd)){
                    ispassword = true;
                    password = pwd;
               }else{
                   $('.loginmsg').html('至少使用两种字符组合')
                   message();
               }
           })
            //再次输入密码
           $('#repw').blur(function(){
               var repwd = this.value;
               if(!repwd){
                   $('.loginmsg').html('请确认密码');
                   message();
               }
               else if(repwd !== password){
                    $('.loginmsg').html('两次密码输入不一致');
                    message();
               }else{
                   isrepwd = true;
               }
           })
        //    提交表单
           $('#send').on('click',function(){
                if($('#checkB').prop('checked') == false){
                    ischecked = false;
                    $('.loginmsg').html('请同意《逛逛网服务条款》才能注册')
                    message();
                }
                if(isUserName && ispassword && istel && isrepwd && ischecked){
                    console.log('验证通过，可以注册了')
                    // 存cookie
                    Cookie.set('username',username);
                    Cookie.set('password',password);
                    $.ajax({
                        type:'get',
                        url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
                        data:{
                            "status" : "register",
                            "userID" : username,
                            "password" : password
                        },
                        success:function(data){
                            if(data == 1){
                                swal({
                                    title: "注册成功!",
                                     text: "客官要登录啦....", 
                                     type : "success",
                                     showCancelButton: true,  
                                     confirmButtonColor: "#DD6B55",
                                     closeOnCancel: false
                                  },
                                     function(isConfirm){ 
                                         window.location.href = '../../html/login/login.html'
                                 })
                            }else {
                                if(data ==0){
                                    $('.loginmsg').html('名字太受欢迎啦!!!!');
                                    message();
                                }
                                if(data == 2){
                                    $('.loginmsg').html('数据库报错');
                                    message();
                                }
                            }
                            
                        }
                    })
                    
                }
           })
        }
        
   }
   this.message = function(){
        $('.loginmsg').show();
        setTimeout(function(){
            $('.loginmsg').hide();
        },3000)
   }
   return new FormVail()
})