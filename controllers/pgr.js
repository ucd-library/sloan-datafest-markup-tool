const httpProxy = require('http-proxy');
const config = require('../lib/config');

let proxy = httpProxy.createProxyServer({
  ignorePath : true
});

proxy.on('error', e => {
  console.error('http-proxy error', e.message, e.stack);
});

module.exports = (req, res) => {
  let url = `${config.pgr.host}${req.originalUrl.replace(/\/pgr/, '')}`;
  proxy.web(req, res, {
    target : url
  });
}