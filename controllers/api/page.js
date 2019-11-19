const router = require('express').Router();
const model = require('../../models/page');
const sendError = require('../utils/send-error');

router.get('/random', async (req, res) => {
  try {
    res.json(await model.getRandom());
  } catch(e) {
    sendError(res, e);
  }
});

router.get(/^\/image\/.+/, async (req, res) => {
  res.redirect(model.getPageImageUrl(req.path.replace(/^\/image/, ''), req.query.size));
});

module.exports = router;