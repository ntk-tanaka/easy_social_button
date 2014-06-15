module.exports = (grunt) ->
  pkg = grunt.file.readJSON("package.json")
  grunt.initConfig
    coffee:
      compileJoined:
        options:
          join: true
          bare: true
        files:
          "dest/easy_social_button.js": [
            "src/easy_social_button.coffee"
          ]

    uglify:
      deploy:
        files:
          'dest/easy_social_button.min.js': ['dest/easy_socialbutton.js']

    connect:
      livereload:
        options:
          port: 3000,
          base: './',

    watch:
      development:
        files: ["src/**/*.coffee"]
        tasks: [
          "coffee"
          "uglify"
          ]

  taskName = undefined
  for taskName of pkg.devDependencies
    grunt.loadNpmTasks taskName  if taskName.substring(0, 6) is "grunt-"
  grunt.registerTask "default", [
     "coffee"
     "uglify"
     "connect"
     "watch:development"
     ]
