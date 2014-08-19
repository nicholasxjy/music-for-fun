var gulp = require('gulp');
var coffee = require('gulp-coffee');
var concat = require('gulp-concat');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');


var paths = {
	scripts: ['./public/js/*', './public/js/**/*'],
	css: ['./public/css/main.css', './public/css/style.css'],
	avatars: './public/avatars/*',
	pageimgs: './public/images/*',
	audioimgs: './public/images/audio/*'
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
	gulp.src(paths.avatars)
		.pipe(imagemin())
		.pipe(gulp.dest('./public/dist/img/avatars'))

	gulp.src(paths.pageimgs)
		.pipe(imagemin())
		.pipe(gulp.dest('./public/dist/img/'))
	gulp.src(paths.audioimgs)
		.pipe(imagemin())
		.pipe(gulp.dest('./public/dist/img/audio'))
});

gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['minjs']);
	gulp.watch(paths.css, ['mincss']);
	gulp.watch(paths.images, ['minimage']);

})

gulp.task('default', ['watch', 'mincss', 'minjs', 'minimage']);