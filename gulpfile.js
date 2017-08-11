var gulp        = require('gulp');
var concat      = require('gulp-concat');
var sass        = require('gulp-sass');
var browserify  = require('gulp-browserify');
var rename      = require('gulp-rename');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var toEs6 = require('gulp-6to5');
var nodemon     = require('gulp-nodemon');

var config = {
    source:'./src/',
    dist:'./public/'
};

var paths = {
    assets:"assets/",
    html:"**/*.html",
    img: "img/**/*",
    js: "js/*.js",

    utils: "utils/**",

    css: "css",
    sass:"scss/**/*.scss",
    fonts: "fonts/**/*.otf",
    mainSass:"scss/main.scss",
    mainJS: "js/**/*.js"
};

var sources = {
    assets:config.source + paths.assets,
    html: config.source + paths.html,
    img: config.source + paths.assets + paths.img,
    js:config.source + paths.assets + paths.js,
    sass: config.source + paths.assets + paths.sass,
    fonts: config.source + paths.assets + paths.fonts,
    rootSass: config.source + paths.assets + paths.mainSass,
    rootJS: config.source + paths.assets + paths.mainJS
};

gulp.task('html', () => {
    gulp.src(sources.html).
    pipe(gulp.dest(config.dist));
});

gulp.task('img', () => {
    gulp.src(sources.img).
    pipe(gulp.dest(config.dist + paths.assets + "img"));
});

gulp.task('sass', () => {
    gulp.src(sources.rootSass)
    .pipe(sass({
        outputStyle:"compressed"
    }).on("error",sass.logError))
    .pipe(gulp.dest(config.dist + paths.assets + "css"));
});

gulp.task('js', () => {
     gulp.src(sources.rootJS)
        .pipe(toEs6())
        .pipe(concat('bundle.js'))
        .pipe(uglify())
        .pipe(gulp.dest(config.dist + paths.assets +"js"));
});


gulp.task('fonts', () => {
    gulp.src(sources.fonts).
    pipe(gulp.dest(config.dist + paths.assets + "fonts"));
})

gulp.task("html-watch", ["html"], function (done) {
  browserSync.reload();
  done();
});

gulp.task("img-watch", ["img"], function (done) {
  browserSync.reload();
  done();
});

gulp.task("js-watch", ["js"], function (done) {
  browserSync.reload();
  done();
});

gulp.task("sass-watch", ["sass"], function (done) {
  browserSync.reload();
  done();
});

gulp.task('fonts-watch', ["fonts"], function (done) {
    browserSync.reload();
    done();
});

gulp.task('default', ['browserSync'], function () {
});

gulp.task('browserSync', ['nodemon'], () => {
  browserSync.init(null, {
    proxy: "http://localhost:3000",
        files: ["public/**/*.*"],
        port: 7000,
});

  gulp.watch(sources.html, ["html-watch"]);
  gulp.watch(sources.img, ["img-watch"]);
  gulp.watch(sources.fonts, ["fonts-watch"]);
  gulp.watch(sources.sass, ["sass-watch"]);
  gulp.watch(sources.rootJS, ["js-watch"]);

});

gulp.task('nodemon', function(cb){

  const started = false;

  return nodemon({
    script: 'server.js'
  }).on('start', function(){
    if(!started){
      cb();
      started = true;
    }
  });
});
