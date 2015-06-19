module.exports = function(grunt) {
    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: [
                    './node_modules/persistencejs/lib/persistence.js',
                    './node_modules/persistencejs/lib/persistence.store.sql.js',
                    './node_modules/persistencejs/lib/persistence.store.websql.js',
                    './TaskTracker.js'
                ],
                dest: 'dist/tasktracker.min.js'
            }
        },
        concat : {
            build: {
                src: ['./TaskTracker.js'],
                dest: 'dist/tasktracker.debug.js'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            }
        },
        connect: {
            server: {
                options: {
                    hostname: 'localhost',
                    port: 9000,
                    keepalive: true,
                    open: {
                        target : "http://127.0.0.1:9000/"
                    }
                }
            }
        }

    });
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jasmine');

    grunt.registerTask('default', 'test task', function() {
        grunt.log.write('hi there');
    });

    grunt.registerTask('test', ['jasmine']);

    grunt.registerTask('dist', ['uglify']);

    grunt.registerTask('distDebug', ['concat']);

    grunt.registerTask('serve', [
        'connect:server']);
};