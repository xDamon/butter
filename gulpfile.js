const del = require("del");
const gulp = require("gulp");
const typescript = require("gulp-typescript");
const alias = require("./gulp-alias.js");
const merge = require("merge-stream");

const project = typescript.createProject("tsconfig.json");

gulp.task("compile", () => {
	del.sync("dist/**/*.*");

	const compiled = gulp.src("src/**/*.ts",  { base: "src" })
		.pipe(project())

	const js = compiled.js
		.pipe(alias.js())
		.pipe(gulp.dest("dist"));

	const dts = compiled.dts
		.pipe(alias.ts())
		.pipe(gulp.dest("dist"));

	return merge(js, dts);
});