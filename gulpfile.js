var gulp = require('gulp');
var ts = require('gulp-typescript');
var del = require('del');

gulp.task('default', ['copy'], () => {
	return gulp.src("src/**/*.ts")
	.pipe(ts({
		target: 'ES5',
		allowJs: true
	}))
	.pipe(gulp.dest('build'));
});

gulp.task('copy', ['clean'], () => {
	gulp.src(['package.json', 'yarn.lock', 'README.md'])
	.pipe(gulp.dest('build'));
})

gulp.task('clean', () => {
	del(['build/**/*']);
});

