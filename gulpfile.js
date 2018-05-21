const gulp = require('gulp')
const less = require('gulp-less')
const cssmin = require('gulp-cssmin')
const uglify = require('gulp-uglify')
const imagemin = require('gulp-imagemin')
const cache = require('gulp-cache');
const named = require('vinyl-named');
const webpack = require('webpack');
const gulpWebpack = require('webpack-stream');
const argv = require('minimist')(process.argv.slice(2));
const ISBUILD = argv && argv.env === 'build'; //是否为生产环境

var webpackConfig = require("./webpack.config.js");
const $ = require('gulp-load-plugins')()

const homePath = {
    less: {
        input: ['./src/less/index.less'],
        watch: ['./src/less/*/*.less'],
        output: './dist/css/',
    },
    js: {
        input: ['./src/js/**/home.js'],
        watch: ['./src/js/**/*.js'],
        output: './dist/js/'
    },
    image: {
        input: ['./src/images/**/*.{png,jpg,gif,ico}'],
        watch: ['./src/images/**/*.{png,jpg,gif,ico}'],
        output: './dist/images/',
    },
    html: {
        input: ['./src/page/**/*.html'],
        watch: ['./src/page/**/*.html'],
        output: './dist/page/',
    }
}


//***********home************** 

gulp.task('home:less', () => {
    if (!ISBUILD) {
        gulp.src(homePath.less.input)
            .pipe(less())
            .pipe(gulp.dest(homePath.less.output))
    } else {
        gulp.src(homePath.less.input)
            .pipe(less())
            .pipe(cssmin())
            .pipe(gulp.dest(homePath.less.output))
    }

})

gulp.task('home:js', () => {
    gulp.src(homePath.js.input)
        .pipe(named())
        .pipe(gulpWebpack(webpackConfig, webpack))
        .pipe(gulp.dest(homePath.js.output))
})

gulp.task('home:html', () => {
    gulp.src(homePath.html.input)
        .pipe(gulp.dest(homePath.html.output))
})

gulp.task('home:image', () => {
    if (!ISBUILD) {
        gulp.src(homePath.image.input)
            .pipe(gulp.dest(homePath.image.output))
    } else {
        gulp.src(homePath.image.input)
            .pipe(cache(imagemin({
                progressive: true
            })))
            .pipe(gulp.dest(homePath.image.output))
    }
})

gulp.task('home:watch-all', () => {
    gulp.watch(homePath.less.watch, ['home:less'])
    gulp.watch(homePath.js.watch, ['home:js'])
    gulp.watch(homePath.html.watch, ['home:html'])
    gulp.watch(homePath.image.watch, ['home:image'])
})



//******launch**********

gulp.task('main', !ISBUILD ? [
    'home:less',
    'home:js',
    'home:image',
    'home:html',
    'home:watch-all',
] : [
    'home:less',
    'home:js',
    'home:image',
    'home:html',
])
