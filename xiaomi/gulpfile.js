//打包配置
const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const autoPrefixer = require('gulp-autoprefixer')
const sass = require('gulp-sass')(require('node-sass'));
const uglify = require('gulp-uglify')
const babel = require('gulp-babel')
const htmlmin = require('gulp-htmlmin')
// const imagemin = require('gulp-imagemin')
const del = require('del')
const webserver = require('gulp-webserver')
const fileInclude = require('gulp-file-include')

//css任务
//gulp@3语法
gulp.task('cssHandler3', ()=>{
    //把流return出去
    return gulp
        .src('./src/css/*.css')//找到源文件
        .pipe(cssmin()) //压缩文件
        .pipe(gulp.dest('./dest/css/'))//放到指定目录
})

//gulp@4
//css任务
function cssHandler() {
    return gulp
        .src('./src/css/**/*.css')//找到源文件
        .pipe(autoPrefixer())//自动添加前缀  配置在package.json browserslist字段
        .pipe(cssmin()) //压缩文件
        .pipe(gulp.dest('./dest/css/'))//放到指定目录
}

//创建sass打包任务
function sassHandler() {
    return gulp
        .src('./src/sass/**/*.scss')
        .pipe(sass())//sass转css
        .pipe(autoPrefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dest/sass/'))
}

//创建js打包任务
function jsHandler() {
    return gulp
        .src('./src/js/**/*.js')
        .pipe(babel({
            //@babel7 presets: ['es2015']
            //@babel8
            presets: ['@babel/env']
        }))//es6->es5
        .pipe(uglify())//压缩js
        .pipe(gulp.dest('./dest/js/'))
}

//创建html打包任务
function htmlHandler() {
    return gulp
        .src('./src/pages/**/*.html')
        .pipe(fileInclude({//根据你的配置导入html片段
            prefix: '@-@',//自定义的标识符
            basepath: './src/components',//你的组件所在的目录
        }))
        .pipe(htmlmin({
            //通过配置参数来压缩
            collapseWhitespace: true,//移除空格
            removeEmptyAttributes: true,//移除空的属性(仅限于原生属性)
            collapseBooleanAttributes: true,//移除类似checked 等布尔值属性
            removeAttributeQuotes: true,//移除属性上的双引号
            minifyCSS: true, //压缩内嵌式css代码(只能基础压缩，不能添加前缀)
            minifyJS: true, //压缩内嵌式JS代码（只能基本压缩，不识别es6）
            removeStyleLinkTypeAttributes: true,//移除style和link上的type属性
            removeScriptTypeAttributes: true, //移除script上的type属性
        }))
        .pipe(gulp.dest('./dest/pages/'))
}

//创建images打包任务
function imageHandler() {
    return gulp
        .src('./src/images/**/*')
        // .pipe(imagemin())//图片压缩，无损压缩
        .pipe(gulp.dest('./dest/images/'))
}

//创建打包videos的任务
function videoHandler() {
    return gulp
        .src('./src/videos/**/*')
        .pipe(gulp.dest('./dest/videos/'))
}
//创建打包audios的任务
function audioHandler() {
    return gulp
        .src('./src/audios/**/*')
        .pipe(gulp.dest('./dest/audios/'))
}
//创建打包第三方任务
function libHandler() {
    return gulp
        .src('./src/lib/**/*')
        .pipe(gulp.dest('./dest/lib/'))
}

//创建打包fonts的任务
function fontHandler() {
    return gulp
        .src('./src/fonts/**/*')
        .pipe(gulp.dest('./dest/fonts/'))
}

//创建删除任务
function delHandler() {
    //返回异步任务就可以
    //[要删除的文件件]
    return del(['./dest'])
}

//创建启动webserver任务
function webserverHandler() {
    return gulp
        .src('./dest')
        .pipe(webserver({
            // host: 'localhost',//自定义域名
            host: 'www.yanwei.com',//需要配置 /etc/hosts文件
            port: '8888',//端口号
            livereload: true, //文件修改时自动刷新界面
            open: './pages/login.html',//默认打开哪一个文件，从dest以后的目录开始书写
            proxies: [
                {//每一个代理,没有代理，不要写空对象
                    source: '/dt',//代理标识符
                    target: 'https://www.baidu.com/'//代理目标地址
                },
            ],//代理
        }))
}

//创建监控任务
function watchHandler() {
    gulp.watch('./src/css/**/*.css', cssHandler)
    gulp.watch('./src/sass/**/*', sassHandler)
    gulp.watch('./src/js/**/*', jsHandler)
    gulp.watch('./src/pages/**/*.html', htmlHandler)
    gulp.watch('./src/images/**/*', imageHandler)
    gulp.watch('./src/videos/**/*', videoHandler)
    gulp.watch('./src/audios/**/*', audioHandler)
    gulp.watch('./src/lib/**/*', libHandler)
    gulp.watch('./src/fonts/**/*', fontHandler)
}

//创建默认任务，整合以上任务 series串行  parallel并行， 返回一个函数
let defaultHandler = gulp.series(
    delHandler, 
    gulp.parallel(
        cssHandler,
        sassHandler,
        jsHandler,
        htmlHandler,
        imageHandler,
        videoHandler,
        audioHandler,
        libHandler,
        fontHandler),
    webserverHandler,
    watchHandler)

//gulp@4需要导出
module.exports = {
    cssHandler,
    sassHandler,
    jsHandler,
    htmlHandler,
    imageHandler,
    videoHandler,
    audioHandler,
    libHandler,
    fontHandler,

    delHandler,
    webserverHandler,
    watchHandler,
    default: defaultHandler,//当有一个叫default的任务时，可以直接执行gulp
}