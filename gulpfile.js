const gulp = require('gulp');
// 压缩js模块
const uglify = require('gulp-uglify');
// 编译es6
const babel = require('gulp-babel');
// 编译scss文件
const sass = require("gulp-ruby-sass"); //编译sass
const rename = require("gulp-rename"); //重命名文件
// 即使刷新
const connect = require('gulp-connect');
// 即时刷新
gulp.task('refreshHTML',function(){
    gulp.src('./html/**/*.html').pipe(connect.reload());
    console.log('刷新页面啦')
})
//处理CSS任务
gulp.task("refreshCSS", function(){
	gulp.src("./css/*.css").pipe(connect.reload());
	console.log('css更新啦')
})
// 任务compileSass 编译scss文件
gulp.task('compileSass',function(){
	sass('./scss/*.scss',{
        style: 'expanded'
    }).pipe(gulp.dest('./css'))
    console.log('编译sass啦')
})

// 任务js 用来编译es6 并压缩 到babeljs中
gulp.task('js',function(){
    gulp.src('./js/**/*.js').pipe(babel({
        presets : ['es2015']
    })).pipe(gulp.dest('./babeljs/'))
})

// 监听函数 只要有变动 执行任务watch 就会自动执行js任务
gulp.task('watch',function(){
	console.log('启动服务器')
	connect.server({
		livereload:true
	});
	console.log(('启动成功'))
	//检测文件的变化，执行相应的任务
	gulp.watch('./html/**/*.html', ['refreshHTML']);
    gulp.watch('./scss/**/*.scss',['compileSass']);
    gulp.watch('./css/**/*.css',['refreshCSS']);
    // gulp.watch('./js/**/*.js',['js']);
    
})
