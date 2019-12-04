const router = require('express').Router();

router.use('/page', require('./page'));
router.use('/mark', require('./mark'));

module.exports = router;