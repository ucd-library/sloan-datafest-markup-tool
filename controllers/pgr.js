const httpProxy = require('http-proxy');
const config = require('../lib/config');

let proxy = httpProxy.createProxyServer({
  ignorePath : true
});

proxy.on('error', e => {
  console.error('http-proxy error', e.message, e.stack);
});

module.exports = (req, res) => {
  console.log('here');
  let url = `${config.pgr.host}${req.originalUrl.replace(/\/pgr/, '')}`;
  console.log(`proxy request: ${url}`);

  proxy.web(req, res, {
    target : url
  });
}