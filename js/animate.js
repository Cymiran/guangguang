define([],function(){
	return {
		animate : function (obj, attrs, time, callback) {
			console.log('开始运动...')
			var deg = 0;
			// debu
			//如何关掉上一次的定时器？
			clearInterval(obj.t);
			var _obj = {};
			for (var attr in attrs) {
				if (attr == "opacity") {
					_obj[attr] = getStyle(obj, attr) * 100;
				} else {
					_obj[attr] = getStyle(obj, attr);
				}
			}
			function getStyle(obj, attr) {
				if (obj.currentStyle) {
					return parseInt(obj.currentStyle[attr]);
				} else {
					return parseInt(window.getComputedStyle(obj)[attr]);
				}
			}
			obj.t = setInterval(function () {
				for (var attr in attrs) {
					if (attr == "opacity") {
						obj.style[attr] = (_obj[attr] + (attrs[attr] - _obj[attr]) * Math.sin(deg * Math.PI / 180)) / 100;
					} else {
						obj.style[attr] = _obj[attr] + (attrs[attr] - _obj[attr]) * Math.sin(deg * Math.PI / 180) + "px";
					}
				}
				deg++;
				if (deg > 90) {
					clearInterval(obj.t); //
					callback ? callback() : "";
				}
			}, time / 90);
			
		}
	}
})