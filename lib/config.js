let env = process.env.APP_ENV || 'dev';
let clientPackage = require('../client/public/package.json');

module.exports = {
  dams : {
    host : 'https://digital.ucdavis.edu',
    collection : '/collection/sherry-lehmann',
    api : {
      rootRecordPath : '/api/records'
    }
  },

  database : {
    schema : process.env.PGSCHEMA
  },

  pgr : {
    host : 'http://pgr:3000'
  },

  server : {
    assets : (env === 'prod') ? 'dist' : 'public',
    appRoutes : ['collection', 'about'],
    port : process.env.APP_PORT || process.env.PORT || 3000
  },
  
  client : {
    versions : {
      bundle : clientPackage.version,
      loader : clientPackage.dependencies['@ucd-lib/cork-app-load'].replace(/^\D/, '')
    }
  }
}