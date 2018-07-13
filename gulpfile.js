let gulp = require('gulp');
let clean = require('gulp-clean');
let spawn = require('child_process').spawnSync;
let dotenv = require('dotenv');

dotenv.config();

gulp.task('dev', () => {
  spawn("./node_modules/.bin/next", {stdio: 'inherit'});
});

gulp.task('clean', () => {
  return gulp.src(['.next', 'dist']).pipe(clean());
});

gulp.task('build', () => {
  spawn("./node_modules/.bin/next", ["build"], {stdio: 'inherit'});
});

gulp.task('export', () => {
  spawn("./node_modules/.bin/next", ["export", "-o", "dist"], {stdio: 'inherit'});
});

gulp.task('upload', () => {
  spawn("aws", ["s3", "rm", process.env.AWS_BUCKET_URI, "--recursive", "--profile", process.env.AWS_PROFILE], {stdio: 'inherit'});
  spawn("aws", ["s3", "sync", "dist/", process.env.AWS_BUCKET_URI, "--profile", process.env.AWS_PROFILE], {stdio: 'inherit'});
});

gulp.task('deploy', ['build', 'export', 'upload']);
