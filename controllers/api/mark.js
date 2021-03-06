const router = require('express').Router();
const model = require('../../models/mark');
const sendError = require('../utils/send-error');
const auth = require('../utils/auth');

router.post('/', auth, async (req, res) => {
  try {
    let mark = req.body;
    mark.user_id = req.session.cas_user;

    res.json(await model.update(mark));
  } catch(e) {
    sendError(res, e);
  }
});

router.delete('/:markId', auth, async (req, res) => {
  try {
    res.json(await model.delete(req.params.markId, req.session.cas_user));
  } catch(e) {
    sendError(res, e);
  }
});

module.exports = router;