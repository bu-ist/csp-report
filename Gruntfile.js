'use strict';

module.exports = function (grunt) {
    grunt.initConfig({
        clean: {
            all: ['database.sqlite']
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                '.jshintrc',
                'package.json',
                '**/*.js',
                '!node_modules/**/*'
            ]
        },
        mochacli: {
            options: {
                require: ['should'],
                reporter: 'spec'
            },
            all: []
        }
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-mocha-cli');

    grunt.registerTask('test', ['clean', 'jshint', 'mochacli']);
    grunt.registerTask('default', 'test');
};
