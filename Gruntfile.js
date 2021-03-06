module.exports = function(grunt) {
    grunt.initConfig({
        connect: {
            demo: {
                options: {
                    open: true,
                    hostname: '127.0.0.1',
                    keepalive: true
                }
            }
        },
        'gh-pages': {
            options: {
                clone: 'bower_components/query-box'
            },
            src: [
                'bower_components/**/*',
                '!bower_components/query-box/**/*',
                'demo/*', 'src/*', 'index.html'
            ]
        },
        replace: {
            example: {
                src: ['src/*'],
                dest: 'dist/',
                replacements: [{
                    from: 'bower_components',
                    to: '..'
                }]
            }
        },
        bump: {
            options: {
                files: ['bower.json'],
                commitFiles: ['bower.json'],
                pushTo: 'origin',
            }
        },
        shell: {
            register: {
                command: 'bower register query-box git://github.com/ionelmc/polymer-query-box.git'
            },
            info: {
                command: 'bower info query-box'
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-shell');

    grunt.registerTask('default', ['build']);
    grunt.registerTask('build',  ['replace']);
    grunt.registerTask('deploy', ['gh-pages']);
    grunt.registerTask('server', ['connect']);
    grunt.registerTask('register', ['shell:register']);
    grunt.registerTask('release', ['build', 'deploy', 'bump', 'shell:info']);
};
