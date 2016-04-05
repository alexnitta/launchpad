module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: { separator: ';'},
      dist: {
        src: ['client/app/**/*.js'],
        dest: 'client/dist/<%= pkg.name %>.js'
      },
      lib: {
        src: 'client/lib/**/*.js',
        dest: 'client/dist/library.js'
      }
    },


    env: {
      prod: {
        NODE_ENV: 'production',
        DEST: 'temp'
      },
      dev: {
        NODE_ENV: 'development',
        DEST: 'temp'
      }
    },


    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: ['spec/**/*.js']
      }
    },

    nodemon: {
      dev: {
        script: 'server/server.js'
      }
    },

    uglify: {
      target: {
        files: {
          'client/dist/<%= pkg.name %>.min.js': ['client/dist/<%= pkg.name %>.js'],
          'client/dist/library.min.js': 'client/dist/library.js'
        }
      }
    },

    eslint: {
      target: [
        'client/app/*.js',
        'Gruntfile.js',
        'spec/**/*.js'
      ]
    },

    cssmin: {
      target: {
        files: [{
          expand: true,
          cwd: 'client/styles/',
          src: '*.css',
          dest: 'client/styles/',
          ext: '.min.css'
        }]
      }
    },

    watch: {
      scripts: {
        files: [
          'client/client/**/*.js',
          'client/lib/**/*.js',
        ],
        tasks: [
          'concat',
          'uglify'
        ]
      },
      css: {
        files: 'client/styles/*.css',
        tasks: ['cssmin']
      }
    },

    shell: {
      pushLive: {
        command: 'git push live master',
        options: {
          stdout: true,
          stderr: true,
          failOnError: true
        }
      }
    },
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-env');
  grunt.loadNpmTasks('grunt-eslint');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-shell');

  grunt.registerTask('server-dev', function (target) {
    var nodemon = grunt.util.spawn({
      cmd: 'grunt',
      grunt: true,
      args: 'nodemon'
    });
    nodemon.stdout.pipe(process.stdout);
    nodemon.stderr.pipe(process.stderr);

    grunt.task.run([ 'watch' ]);
  });

  grunt.registerTask('test', [
    'eslint',
    'mochaTest'
  ]);

  grunt.registerTask('build', [
    'concat',
    'uglify',
    'cssmin'
  ]);

  grunt.registerTask('env-dev', 'env:dev');

  grunt.registerTask('upload', function(n) {
    if (grunt.option('prod')) {
      grunt.task.run('env:prod');
      grunt.task.run('shell:pushLive');
    } else {
      grunt.task.run('env:dev');
      grunt.task.run('server-dev');
    }
  });

  grunt.registerTask('deploy', [
    'test', 'build', 'upload'
  ]);
};
