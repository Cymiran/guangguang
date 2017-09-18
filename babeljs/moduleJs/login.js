'use strict';

require(['../config'], function (m) {
	require(['jquery', 'commen'], function ($, com) {
		$(function () {
			$('#login').on('click', function () {
				var uname = Cookie.get('username');
				var pwd = Cookie.get('password');
				console.log(uname, pwd);
				var getun = $('#username').val();
				var getpw = $('#pwd').val();
				var isuname = false;
				var ispwd = false;
				// debugger
				if (!getun) {
					$('.loginmsg').html('请填写用户名');
					message();
					return;
				} else {
					if (getun == uname) {
						isuname = true;
					} else {
						$('.loginmsg').html('用户名不存在');
						message();
						return;
					}
				}
				if (!getpw) {
					$('.loginmsg').html('请输入密码');
					message();
					return;
				} else {
					if (getpw == pwd) {
						ispwd = true;
					} else {
						$('.loginmsg').html('密码错误');
						message();
						return;
					}
				}
				if (isuname && ispwd) {
					// window.location.href = '../../html/index.html';
				}
			});

			function message() {
				$('.loginmsg').show();
				setTimeout(function () {
					$('.loginmsg').hide();
				}, 3000);
			}
		});
	});
});