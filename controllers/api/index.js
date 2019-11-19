const router = require('express').Router();

router.use('/marks', require('./marks'));

module.exports = router;