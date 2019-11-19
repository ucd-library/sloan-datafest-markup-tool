const router = require('express').Router();

router.use('/api', require('./api'));
router.all(/\/pgr\/.*/, require('./pgr'));

module.exports = router;