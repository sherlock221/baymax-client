module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        concat: {
            options : {
            },
            cicadaCtl: {
                src  : [
                    "./js/controllers/**/*.js",
                    ],
                dest : "./dist/js/all.ctrl.js"
            },
            cicadaSev: {
                src  : [
                    "./js/services/**/*.js",
                ],
                dest : "./dist/js/all.sev.js"
            },
            cicadaDec: {
                src  : [
                    "./js/directive/**/*.js",
                ],
                dest : "./dist/js/all.dec.js"
            },
            cicadaOther : {
                src  : [
                    "./js/interceptors/**/*.js",
                ],
                dest : "./dist/js/all.other.js"
            },
            cicadaAll : {
                src  : [
                    "./dist/js/all.ctrl.js",
                    "./dist/js/all.sev.js",
                    "./dist/js/all.dec.js",
                    "./dist/js/all.other.js"
                ],
                dest : "./dist/js/all.js"
            }
        },

        uglify : {
            options : {
            },
            loop : {
                src  : "./dist/js/all.js",
                dest : "./dist/js/all.min.js"
            }
        },
        clean : {
            options : {
            },
            build : {
                src : ['./build/transport']
            }
        }
    });


    grunt.loadNpmTasks('grunt-cmd-transport');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');


    //测试打包loop
    grunt.registerTask('build', ['concat:cicadaCtl','concat:cicadaSev','concat:cicadaDec','concat:cicadaOther','concat:cicadaAll']);
    grunt.registerTask('jsMin', ['uglify']);

};