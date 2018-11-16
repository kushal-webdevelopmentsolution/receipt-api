
var gulp = require('gulp'),
   uglify = require('gulp-uglify'),
   jshint = require('gulp-jshint'),
   concat = require('gulp-concat');

gulp.task('commonjs', function () {
	   return gulp.src(['app/js/jquery-1.11.1.min.js',
		   				'app/js/main.js',
		   				'app/js/plugins.js'])
	      .pipe(uglify())
	      .pipe(concat('jqueryLib.js'))
	      .pipe(gulp.dest('app/dist/js'));
	});

gulp.task('angularAll', function () {
	   return gulp.src(['bower_components/angular/angular.js',
		   				'bower_components/angular-route/angular-route.min.js',
		   				'bower_components/angular-resource/angular-resource.min.js'])
	      //.pipe(uglify())
	      .pipe(concat('angularall.js'))
	      .pipe(gulp.dest('app/dist/js/angular/'));
	});


gulp.task('controller', function () {
	   return gulp.src(['app/js/controller/*.js'])
	      .pipe(uglify())
	      .pipe(gulp.dest('app/dist/js/controller/'));
	});

gulp.task('services', function () {
	   return gulp.src(['app/js/services/*.js'])
	      .pipe(uglify())
	      .pipe(concat('services.js'))
	      .pipe(gulp.dest('app/dist/js/services/'));
	});

/*gulp.task('css', function () {
	   return gulp.src('app/css/*.css')
	      .pipe(uglify())
	      .pipe(gulp.dest('app/dist/css/'));
	});*/


gulp.task('build', ['angularAll','commonjs','controller', 'services'], function () {
   gulp.watch(['app/js/controller/*.js','app/js/services/*.js','app/css/*.css'], ['build']);
});

