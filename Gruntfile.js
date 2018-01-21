module.exports = function(grunt) {

  // Project configuration.
grunt.initConfig({
  uglify: {
    options: {
      mangle: false,
      compress: false,
      beautify: true
    },
    my_target: {
      files: {
        'src/astCreation/finalAstGenerator.js': ['src/astCreation/initValues.js', 'src/astCreation/objectFunctions.js', 'src/astCreation/requestFile.js', 'src/astCreation/getExpressions.js', 'src/astCreation/evaluateType.js']
      }
    }
  }
});

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  // Default task(s).
  grunt.registerTask('default', ['uglify']);

};
