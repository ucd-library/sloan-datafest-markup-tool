const router = require('express').Router();
const model = require('../../models/mark');
const sendError = require('../utils/send-error');

router.post('/', async (req, res) => {
  try {
    let mark = req.body;
    // TODO set user_id

    res.json(await model.update(mark));
  } catch(e) {
    sendError(res, e);
  }
});

router.delete('/:markId', async (req, res) => {
  try {
    res.json(await model.delete(req.params.markId, 'alice'));
  } catch(e) {
    sendError(res, e);
  }
});

module.exports = router;