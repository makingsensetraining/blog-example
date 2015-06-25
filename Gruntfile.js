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
                configFile: 'tests/frontEnd/karma.conf.js'
            }
        },
        simplemocha: {
            all: { src: ['tests/backend/**/*.js'] }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-simple-mocha');
    
    grunt.registerTask('default', ['watch']);

    grunt.registerTask('test', [
        'jshint',
        'karma',
        'simplemocha'
    ]);
};