var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');


var paths = {
	scripts: ['./public/js/*', './public/js/**/*'],
	css: ['./public/css/main.css', './public/css/style.css'],
	images: ['./public/avatars/*', './public/img/*']
};

// concat min css task
gulp.task('mincss', function() {
	gulp.src(paths.css)
		.pipe(concat('custom.css'))
		.pipe(minifyCss())
		.pipe(gulp.dest('./public/dist/css'))
});

// uglify js

gulp.task('minjs', function() {
	gulp.src(paths.scripts)
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(gulp.dest('./public/dist/js'))
});

//compress imagemin

gulp.task('minimage', function() {
	gulp.src(paths.images)
		.pipe(imagemin())
		.pipe(gulp.dest('./public/dist/img/avatars'))
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['minjs']);
	gulp.watch(paths.css, ['mincss']);
	gulp.watch(paths.images, ['minimage']);

})

gulp.task('default', ['watch', 'mincss', 'minjs', 'minimage']);