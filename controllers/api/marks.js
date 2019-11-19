const router = require('express').Router();

router.get('/', (req, res) => {
  res.json([]);
});

router.get('/byPage/:id', (req, res) => {
  res.json([]);
});


router.get('/:id', (req, res) => {
  res.json({});
});

module.exports = router;