const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const sync = require("browser-sync").create();
const del = require("del");

// Styles

const styles = () => {
	return gulp.src("source/sass/style.scss")
		.pipe(plumber())
		.pipe(sourcemap.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemap.write("."))
		.pipe(gulp.dest("build/css"))
		.pipe(sync.stream());
}

exports.styles = styles;

//HTML

const html = () => {
	return gulp.src("source/*.html")
		.pipe(gulp.dest("build"))
}

exports.html = html;

//Scripts

const scripts = () => {
	return gulp.src("source/scripts/*.js")
		.pipe(gulp.dest("build/scripts"))
}

exports.scripts = scripts;

//Img

const copyImages = () => {
	return gulp.src("source/img/**/*.{png,jpg,svg}")
		.pipe(gulp.dest("build/img"))
}

exports.copyImages = copyImages;

//Clean

const clean = () => {
	return del("build");
}

exports.clean = clean;

// Server

const server = (done) => {
	sync.init({
		server: {
			baseDir: "build"
		},
		cors: true,
		notify: false,
		ui: false,
	});
	done();
}

exports.server = server;

//Reload

const reload = (done) => {
	sync.reload();
	done();
}

// Watcher

const watcher = () => {
	gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
	gulp.watch("source/scripts/script.js", gulp.series(scripts));
	// gulp.watch("source/*.html").on("change", sync.reload);
	gulp.watch("source/*.html", gulp.series(html, reload));
}

//Build

const build = gulp.series(
	clean,
	copyImages,
	scripts,
	gulp.parallel(
		html,
		styles,
	),
);

exports.build = build;

//Start

exports.default = gulp.series(
	clean,
	copyImages,
	scripts,
	gulp.parallel(
		html,
		styles,
	),
	gulp.series(
		server, watcher
	));