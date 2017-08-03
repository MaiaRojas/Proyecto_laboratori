const gulp = require('gulp');
const sass = require('gulp-sass');
const browserify = require('gulp-browserify');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const toEs6 = require('gulp-6to5');
const concat = require('gulp-concat');
const nodemon = require('gulp-nodemon');

const config = {
    source:'./src/',
    dist:'./public/'
};

const paths = {
    assets:"assets/",
    html:"**/*.html",
    sass:"scss/**/*.scss",
    img: "img/**/*",
    js:"js/**/*.js",
    fonts:"fonts/**/*.otf",
    mainSass:"scss/main.scss"
};

const sources = {
    assets:config.source + paths.assets,
    html: config.source + paths.html,
    sass: config.source + paths.assets + paths.sass,
    img: config.source + paths.assets + paths.img,
    js:config.source + paths.assets + paths.js,
    fonts: config.source + paths.assets + paths.fonts,
    rootSass: config.source + paths.assets + paths.mainSass
};


gulp.task('html', () => {
    gulp.src(sources.html).pipe(gulp.dest(config.dist));

});
gulp.task('sass', () => {
    gulp.src(sources.rootSass)
    .pipe(sass({
        outputStyle:"compressed"
    }).on("error",sass.logError)).pipe(gulp.dest(config.dist+paths.assets+"css"));
});

gulp.task('img', () => {
    gulp.src(sources.img).pipe(gulp.dest(config.dist+paths.assets+"img"));
})

gulp.task('js', () => {
     gulp.src(sources.js)
        .pipe(toEs6())
        .pipe(concat('bundle.js'))
        // .pipe(uglify())
        .pipe(gulp.dest(config.dist + paths.assets +"js"));
});

gulp.task('fonts', () => {
    gulp.src(sources.fonts).pipe(gulp.dest(config.dist+paths.assets+"fonts"));
})

gulp.task('sass-watch',["sass"], (done) => {
    browserSync.reload();
    done();
});

gulp.task('js-watch',["js"], (done) => {
    browserSync.reload();
    done();
});

gulp.task('img-watch', ["img"], (done) =>{
    browserSync.reload();
    done();
})

gulp.task('fonts-watch', ["fonts"], (done) =>{
    browserSync.reload();
    done();
})

gulp.task('html-watch',["html"], (done) => {
    browserSync.reload();
    done();
});

gulp.task('nodemon', function(cb){
  var start = false;
  return nodemon({script: 'server.js'}).on('start', function(){
    if(!start){
      start = true;
      cb();
    }
  });
});

gulp.task('browser-sync', ['nodemon'],function () {
  browserSync.init({
       port: 7000,
       proxy: {
           target: "localhost:3000",
           ws: true
       }
   });
});


gulp.task("serve", ['browser-sync'],() => {
   gulp.watch(sources.html,["html-watch"]);
   gulp.watch(sources.img, ["img-watch"]);
   gulp.watch(sources.sass,["sass-watch"]);
   gulp.watch(sources.js,["js-watch"]);
   gulp.watch(sources.js,["fonts-watch"]);
});
gulp.task('run', [ 'html','sass','js', 'fonts','img','serve']);
