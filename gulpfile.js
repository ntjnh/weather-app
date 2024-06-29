"use strict";

const { dest, parallel, series, src, watch } = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("sass"));
const cleanCSS = require("gulp-clean-css");

function js() {
  return src("./src/js/**/*.js")
    .pipe(babel())
    .pipe(dest("build/js"));
}

function scss() {
  return src("src/scss/app.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(cleanCSS())
    .pipe(dest("build/css"));
}

function fonts() {
  return src("src/fonts/**/*")
    .pipe(dest("build/fonts"));
}

function watchJS() {
  watch("./src/js/**/*.js", js);
}

function watchSCSS() {
  watch("./src/scss/app.scss", scss);
}

module.exports = {
  default: series(scss, fonts, js),
  sass: scss,
  fonts: fonts,
  js: js,
  watch: parallel(watchSCSS, watchJS),
};
