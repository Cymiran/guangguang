/*
 * 配置文件
 */

requirejs.config({
	baseUrl:'http://localhost:8000/js',
	paths: {
		"jquery" : "plugin/jquery/jquery-1.11.3",
		"jquery-ui" : "plugin/jquery/jquery-ui",
		"swiper" : "plugin/swiper/swiper-3.4.2.min",
		'sweet-alert':'plugin/sweet-alert/sweet-alert.min',
		// 登录 注册 找回密码
		'formVail' : 'moduleJs/form1',
		'loginjs' : 'moduleJs/login',
		'find-pwd' : 'moduleJs/find-pwd',
		// top 页面
		'markerJs' : 'moduleJs/top/marker',
		'loginVail' : 'moduleJs/form2',
		'topSearch' : 'moduleJs/top/top-search',
		'navAll' : 'moduleJs/top/nav-all',
		'banner' : 'moduleJs/main/banner',
		'getUser' : 'moduleJs/top/top-getUser',
		'goods' : 'moduleJs/main/goods',
		'elevator' : 'moduleJs/main/elevator',
		'detailShow' : 'moduleJs/main/detail-show',
		// 购物车
		'cartDetail' : 'moduleJs/cart/cart-detail',
		'animate' : 'animate',
		// 详情页
		'zoom' : 'plugin/jquery/jquery-zoom'
	},
	shim: {
		"commen" : {
			exports: "log"
		}
	}
});


