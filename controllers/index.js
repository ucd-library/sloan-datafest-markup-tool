const router = require('express').Router();

router.use(require('./auth'));
router.use('/api', require('./api'));

module.exports = router;