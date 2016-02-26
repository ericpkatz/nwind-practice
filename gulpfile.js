var gulp = require('gulp');

gulp.task('seed', function(){
    return require('./test/seed')(); 
});