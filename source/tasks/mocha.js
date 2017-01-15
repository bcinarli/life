/**
 * @author Bilal Cinarli
 */

var mocha = function(gulp, options, plugins) {
    gulp.task('run:tests', function() {
        return gulp.src(options.config.paths.test + 'index.html')
            .pipe(plugins.mochaPhantomjs())
    });
};

module.exports = mocha;