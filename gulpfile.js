const gulp = require('gulp')
const pug = require('gulp-pug')
const sass = require('gulp-sass')

const server = require('browser-sync').create()

gulp.task('view',()=>{
    return gulp.src('./src/views/pages/*.pug')
        .pipe(pug({
            pretty : true
        }))
        .pipe(gulp.dest('./public'))
})

gulp.task('sass',()=>{
    return gulp.src('./src/sass/styles.scss')
        .pipe(sass().on('error',sass.logError))
        .pipe(gulp.dest('./public/css'))
})

gulp.task('default',()=>{

    server.init({
        server : {
            baseDir : './public'
        }
    })

    gulp.watch('./src/views/pages/*.pug',gulp.series('view')).on('change',server.reload)
    gulp.watch('./src/sass/**/*.scss',gulp.series('sass')).on('change',server.reload)
})