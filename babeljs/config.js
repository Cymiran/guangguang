"use strict";

/*
 * 配置文件
 */

requirejs.config({
	baseUrl: 'http://localhost:8080/js',
	paths: {
		"jquery": "plugin/jquery/jquery-1.11.3",
		"jquery-ui": "plugin/jquery/jquery-ui",
		"swiper": "plugin/swiper/swiper",
		'sweet-alert': 'plugin/sweet-alert/sweet-alert.min',
		'formVail': 'moduleJs/form1',
		'loginjs': 'moduleJs/login',
		'find-pwd': 'moduleJs/find-pwd',
		'markerJs': 'moduleJs/marker'
	},
	shim: {
		"commen": {
			exports: "log"
		}
	}
});