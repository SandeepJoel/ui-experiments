module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: [
            '**/*.scss',
            '!animations/threeJS/**/*.scss'
          ],
          ext: '.css',
          dest: 'dist/'
        }]
			}
    },
    sync: {
      copy_to_dist: {
        files: [
          { 
            cwd: 'src', 
            src: [
              '**/*.*',
              '!animations/threeJS/**/*.*'
            ],
            dest: 'dist'
          }
        ]
      }
    },
    babel: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: [
              '**/*.js',
              '!animations/threeJS/**/*.*'
            ],
            dest: 'dist/'
          }
        ]
      }
    },
    'http-server': {
      'dev': {
        root: 'dist',
        port: 9090,        
        host: "127.0.0.1",
        showDir : false,
        ext: "html",
        runInBackground: true,
        openBrowser : true,
      },
      'dev-plain': {
        root: 'src',
        port: 9090,
        host: "127.0.0.1",
        showDir: false,
        ext: "html",
        runInBackground: false,
        openBrowser: true,
      }
    },
    clean: {
      dist: ['dist/**'],
    },
		watch: {
      js: {
        files: [
          '**/*.js',
          '!animations/threeJS/**/*.*'
        ],
        tasks: ['babel']
      },  
      html: {
        files: [
          '**/*.{html,png,jpg,jpeg,svg}',
          '!animations/threeJS/**/*.*'
        ],
        tasks: ['sync']
      },
			css: {
        files: [
          '**/*.scss',
          '!animations/threeJS/**/*.*'
        ],
        tasks: ['sass'],
      },
		}
  });
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-http-server');
  grunt.loadNpmTasks('grunt-contrib-clean');

  grunt.registerTask('default',[]);
  grunt.registerTask('dev', ['clean:dist', 'sync', 'babel', 'sass', 'http-server:dev', 'watch']);
  
  // local url
  // file:///Users/sandeepjoel/myfiles/Mr.J5.0/Frontend/myCode/ui-experiments/animations/7-confetti/index.html
}