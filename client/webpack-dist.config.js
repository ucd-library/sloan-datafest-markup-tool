let config = require('@ucd-lib/cork-app-build').dist({
  root : __dirname,
  entry : 'public/elements/datafest-markup-app.js',
  dist : 'dist/js',
  clientModules : 'public/node_modules'
});

module.exports = config;