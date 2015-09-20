module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        sass: {
            dist: {
                options: {
                    includePaths: ['scss/', 'bower_components/slicknav/scss'],
                    outputStyle: 'nested'
                },
                files: {
                    'css/tufte.css': 'scss/tufte.scss'
                }
            }
        },

        watch: {
            grunt: { files: ['Gruntfile.js'] },

            sass: {
                files: 'scss/**/*.scss',
                tasks: ['sass']
            }
        },

        copy: {
          main: {
            files: [
                {expand: true, src: ['bower_components/responsive/build/responsive.min.css'], dest: 'css/', flatten: true, filter: 'isFile'},
                {expand: true, src: ['bower_components/jquery/dist/jquery.js'], dest: 'javascript/', flatten: true, filter: 'isFile'},
                {expand: true, src: ['bower_components/magnific-popup/src/css/main.scss'], dest: 'scss/magnific-popup', flatten: true},
                // {expand: true, src: ['bower_components/magnific-popup/dist/jquery.magnific-popup.min.js'], dest: 'javascript', flatten: true},
            ]
          }
        }

    });

    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-copy');

    grunt.registerTask('build', ['sass']);
    grunt.registerTask('default', ['build','watch']);
}
