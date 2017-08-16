module.exports = function(grunt) {

  // Project configuration.
grunt.initConfig({
  uglify: {
    my_target: {
      files: {
        'devParser.js': ['src/input1.js', 'src/input2.js']
      }
    }
  }
});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
