//打包配置
const gulp = require('gulp')
const cssmin = require('gulp-cssmin')
const autoPrefixer = require('gulp-autoprefixer')

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
        .pipe(autoPrefixer())
        .pipe(cssmin())
        .pipe(gulp.dest('./dest/css/'))
}

//gulp@4需要导出
module.exports = {
    cssHandler
}