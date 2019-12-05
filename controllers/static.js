const express = require('express');
const path = require('path');
const spaMiddleware = require('@ucd-lib/spa-router-middleware');
const config = require('../lib/config');
const jwt = require('../lib/jwt');

const bundle = `
  <script>
    var CORK_LOADER_VERSIONS = {
      loader : '${config.client.versions.loader}',
      bundle : '${config.client.versions.bundle}'
    }
  </script>
  <script src="/loader/loader.js?_=${config.client.versions.loader}"></script>`;

module.exports = (app) => {
  let assetsDir = path.join(__dirname, '..', 'client', config.server.assets);
  console.log('Using assests dir: '+assetsDir);

  /**
   * Setup SPA app routes
   */
  spaMiddleware({
    app: app, // pass the express app
    htmlFile : path.join(assetsDir, 'index.html'), // pass the file you want to use
    isRoot : true, // are we serving from host root (/)?
    appRoutes : config.server.appRoutes, // array of root paths.  ie appRoutes = ['foo', 'bar'] to server /foo/* /bar/*
    getConfig : async (req, res, next) => {
      if( !req.session || !req.session.cas_user) {
        return res.redirect('/login');
      }

      next({
        appRoutes : config.server.appRoutes,
        damsHost : config.dams.host,
        user : {
          username: req.session.cas_user
        }
      });
    },
    template : async (req, res, next) => {
      next({bundle});
    }
  });

  /**
   * Setup static asset dir
   */
  app.use(express.static(assetsDir));
}