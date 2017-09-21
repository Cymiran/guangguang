require(['../config'],function(m){
	require(['jquery','commen','loginVail'],function($,com,loginVail){
		$(function(){
			$('#footer').load('../../html/sub/footer.html')
			loginVail.init();
		})
	})
}) 
