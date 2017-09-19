//搜索框
define(["jquery", "jquery-ui"], function($) {
	return {
		init: function(options){
			$("#searchInput").autocomplete({
				source: function(request, response) {
					$.ajax({
						url:"http://suggestion.baidu.com/su",
						dataType:"jsonp",
						data : {
							wd : request.term
						},
						jsonp : "cb",
						success : function(res){
							response(res.s);
							if(res.s){
								$('#ui-id-1').appendTo($('#ullist'));
								$('#ullist').show()
							}else{
								$('#ullist').hide()
							}
							
						}
					});
				},
				select: function(event, ui) {
					options.callback ? options.callback(ui.item.value) : "";
					$('#ullist').hide()
				}
			})
			// if($('#ui-id-1').html()){
			// 	console.log()
			// 	$('#ui-id-1').appendTo($('#ullist'));
			// 	$('#ullist').show()
			// }
		}
	}
});