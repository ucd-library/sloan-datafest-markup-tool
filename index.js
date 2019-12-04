const app = require('express')();
const bodyParser = require('body-parser');

app.use(bodyParser.json());

app.use(require('./controllers'));
require('./controllers/static')(app);

app.listen(3000, () => {
  console.log('Sloan Datafest markup tool up and running on port 3000');
});