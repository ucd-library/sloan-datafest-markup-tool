let env = process.env.APP_ENV || 'dev';
let clientPackage = require('../client/public/package.json');

module.exports = {
  server : {
    assets : (env === 'prod') ? 'dist' : 'public',
    appRoutes : ['about'],
    port : process.env.APP_PORT || process.env.PORT || 3000
  },
  
  client : {
    versions : {
      bundle : clientPackage.version,
      loader : clientPackage.dependencies['@ucd-lib/cork-app-load'].replace(/^\D/, '')
    }
  }
}