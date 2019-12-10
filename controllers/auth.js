const router = require('express').Router();
const CASAuthentication = require('cas-authentication');
const config = require('../lib/config');

let cas = new CASAuthentication({
  cas_url     : config.server.casUrl,
  service_url : config.server.url
});

router.get('/login', (req, res) => {
  console.log('CAS Service: starting CAS redirection');

  req.session.loginRedirect = req.query.redirect || '/';

  cas.bounce(req, res, async () => {
    console.log('CAS Service: CAS redirection complete');

    let username = '';
    if( cas.session_name && req.session[cas.session_name] ) {
      username = req.session[cas.session_name];
    }

    if( username ) {
      console.log('CAS Service: CAS login success: '+username);
      res.redirect(req.session.loginRedirect || '/');
    } else {
      console.log('CAS Service: CAS login failure');
      res.status(401).send();
    }
  });
});

router.post('/anon-login', (req, res) => {
  let username = (req.body.username || '').trim().toLowerCase();
  if( !username ) username = 'anonymous';

  req.session[cas.session_name] = username;

  res.redirect(req.query.redirect || '/');
});

router.get('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;