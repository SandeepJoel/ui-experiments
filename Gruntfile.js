module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		sass: {
			dist: {
        files: [{
          expand: true,
          cwd: 'src/',
          src: ['**/*.scss'],
          ext: '.css',
          dest: 'dist/'
        }]
			}
    },
    sync: {
      copy_html_to_dist: {
        files: [
          { cwd: 'src', src: '**/*.html', dest: 'dist' },
        ]
      }
    },
    babel: {
      dist: {
        files: [
          {
            expand: true,
            cwd: 'src/',
            src: ['**/*.js'],
            dest: 'dist/'
          }
        ]
      }
    },
    'http-server': {
      'dev': {
        root: 'dist',
        port: 8080,        
        host: "127.0.0.1",
        showDir : false,
        ext: "html",
        runInBackground: true,
        openBrowser : true,
      }
    },
    
		watch: {
      js: {
        files: '**/*.js',
        tasks: ['babel']
      },  
      html: {
        files: '**/*.html',
        tasks: ['sync']
      },
			css: {
				files: '**/*.scss',
        tasks: ['sass'],
			}
		}
	});
  grunt.registerTask('default',[]);
  grunt.registerTask('dev', ['sync', 'babel', 'sass', 'http-server', 'watch']);
  // local url
  // file:///Users/sandeepjoel/myfiles/Mr.J5.0/Frontend/myCode/ui-experiments/animations/7-confetti/index.html
}