const gulp = require("gulp");
const { series } = gulp;
var ts = require("gulp-typescript");
var del = require("del");
var jasmine = require("gulp-jasmine");

function build() {
  return gulp
    .src("src/**/*.ts")
    .pipe(
      ts({
        target: "ES5",
		allowJs: true,
		lib: ["es2017", "dom"]
      })
    )
    .pipe(gulp.dest("build"));
}

function copy() {
  return gulp.src(["package.json", "yarn.lock", "README.md"]).pipe(gulp.dest("build"));
}

function clean() {
  return del(["build/**/*"]);
}

function test() {
  return gulp.src("test/*-spec.js").pipe(jasmine());
}

exports.build = series(clean, copy, build);
exports.test = series(exports.build, test);
