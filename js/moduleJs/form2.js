define(['jquery','commen'],function($,commen){
    return {
         init : function(){
            $('#login').on('click',function(){
				let uname = Cookie.get('username');
				let pwd = Cookie.get('password');
				
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
				}else {
					if(getun == uname) {
						isuname = true; 
					} else {
						$('.loginmsg').html('用户名不存在');
						message();
						return;
					}
				}
				if(!getpw){
					$('.loginmsg').html('请输入密码');
					message();
					return;
				}else {
					if(getpw == pwd){
						ispwd = true;
					}else{
						$('.loginmsg').html('密码错误');
						message();
						return;
					}
				}
				if(isuname && ispwd){
                    window.location.href = '../../html/index.html'
                    var data = {'username':uname,'password':pwd}
				}
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
 