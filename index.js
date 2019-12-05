const app = require('express')();
const bodyParser = require('body-parser');
const session = require('express-session');
const config = require('./lib/config');

app.use(session({
  name              : 'cas-id',
  secret            : config.server.cookieSecret,
  resave            : false,
  maxAge            : config.server.cookieMaxAge,
  saveUninitialized : true
}));

app.use(bodyParser.json());

app.use(require('./controllers'));
require('./controllers/static')(app);

app.listen(3000, () => {
  console.log('Sloan Datafest markup tool up and running on port 3000');
});