define(['jquery','commen'],function($,commen){
    return {
         init : function(){
            $('#login').on('click',function(){
				// let uname = Cookie.get('username');
				// let pwd = Cookie.get('password');
				
				// console.log(userData)
				// console.log(uname,pwd)
				let getun = $('#username').val();
				let getpw = $('#pwd').val();
				let isuname = false;
				let ispwd = false;
				// debugger
				if(!getun){
					$('.loginmsg').html('请填写用户名')
					message();
					return;
				}
				if(!getpw){
					$('.loginmsg').html('请输入密码');
					message();
					return;
				}
				// if(isuname && ispwd){
					$.ajax({
                        type:'get',
                        url: 'http://datainfo.duapp.com/shopdata/userinfo.php',
                        data:{
                            "status" : "login",
                            "userID" : getun,
                            "password" : getpw
                        },
                        success:function(data){
							console.log(data)
							if(data == 0){
								$('.loginmsg').html('用户名不存在');
								message();
								return;
							}else if(data == 2){
								$('.loginmsg').html('密码错误');
								message();
								return;
							}else{
								Cookie.set('username',getun)
								window.location.href = '../../html/index.html'
							}
						}
					})
				// }
            })
            function message(){
				$('.loginmsg').show();
				setTimeout(function(){
					$('.loginmsg').hide();
				},3000)
            }
        }
         
    }
})
 