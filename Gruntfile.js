module.exports = function(grunt) {
    grunt.initConfig({
        jshint: {
            options: {
                force: true
            },
            files: [
                '*.js',
                'public/module/**/*.js'
            ]
        },
        watch: {
            files: ['<%= jshint.files %>'],
            tasks: ['jshint']
        },
        karma:{
        unit:{
            configFile: 'test/karma.conf.js',
                singleRun: true
        }
    }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('test', [
        'jshint',
        'karma'
    ]);
};