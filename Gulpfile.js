
var NwBuilder = require('node-webkit-builder');
var gulp = require('gulp');
var gutil = require('gulp-util');

gulp.task('nw', function () {
    var nw = new NwBuilder({
        version: '0.12.1',
        files: './src/**',
        macIcns: './icons/bm256.icns',
        //winIco  : "./icons/bm256.ico",
        macPlist: {mac_bundle_id: 'baymax'},
        //platforms: ['win32', 'win64', 'osx32', 'osx64']
        platforms: ['osx64','win64'],
        winZip : true,
        macZip : true
    });

    // Log stuff you want
    nw.on('log', function (msg) {
        gutil.log('node-webkit-builder', msg);
    });

    // Build returns a promise, return it so the task isn't called in parallel
    return nw.build().catch(function (err) {
        gutil.log('node-webkit-builder', err);
    });
});

gulp.task('default', ['nw']);