module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: ['./resources/scripts/utils.js','./resources/scripts/ifInApp.js','./resources/scripts/likeUnlike.js','./resources/scripts/addComment.js','./resources/scripts/loadMore.js'],
        dest: './resources/scripts/all.min.js'
      }
    },
    cssmin: {
      combine: {
        files: {
          './resources/styles/all.css': ['./resources/styles/font.css', './resources/styles/style.css', './resources/styles/form.css']
        }
      },
      minify: {
        expand: true,
        cwd: './resources/styles/',
        src: ['all.css'],
        dest: './resources/styles/',
        ext: '.min.css'
      }
    },
    imagemin: {
      dynamic: {
          files: [{
              expand: true,
              cwd: './resources/images/',
              src: ['**/*.{png,jpg,gif}'],
              dest: './resources/images/build/'
          }]
      }
    },
    watch: {
      scripts: {
          files: ['js/*.js'],
          tasks: ['concat', 'uglify'],
          options: {
              spawn: false,
          },
        }
    },
    sass: {
      dist: {
          options: {
              style: 'compressed'
          },
          files: {
              'css/build/global.css': 'css/global.scss'
          }
       }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-imagemin');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('publish', ['uglify', 'cssmin', 'imagemin']);
  grunt.registerTask('dev', []);

};