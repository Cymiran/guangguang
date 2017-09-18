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
						}
					});
				},
				select: function(event, ui) {
					options.callback ? options.callback(ui.item.value) : "";
				}
			})
		}
	}
});