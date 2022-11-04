"use strict";

const { dest, parallel, series, src, watch } = require("gulp");
const babel = require("gulp-babel");
const sass = require("gulp-sass")(require("sass"));
const sourcemaps = require("gulp-sourcemaps");
const cleanCSS = require("gulp-clean-css");
const browserSync = require("browser-sync").create();

function js() {
  return src("./src/js/app.js")
    .pipe(babel())
    .pipe(dest("build/js"));
}

function scss() {
  return src("src/scss/app.scss")
    .pipe(sourcemaps.init())
    .pipe(sass().on("error", sass.logError))
    .pipe(sourcemaps.write())
    .pipe(cleanCSS())
    .pipe(dest("build/css"))
    .pipe(browserSync.stream());
}

function bSync() {
  browserSync.init({
    server: {
      baseDir: "./",
    },
    https: true,
  });

  watch("./src/js/app.js").on("change", series(js, browserSync.reload));
  watch("./src/scss/app.scss", scss);
  watch("./index.html").on("change", browserSync.reload);
}

function watchJS() {
  watch("./src/js/app.js", js);
}

function watchSCSS() {
  watch("./src/scss/app.scss", scss);
}

module.exports = {
  default: series(scss, js),
  sass: scss,
  js: js,
  serve: bSync,
  watch: parallel(watchSCSS, watchJS),
};
