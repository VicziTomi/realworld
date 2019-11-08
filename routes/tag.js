var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('', async (req, res) => {
  const tags = await models.Tag.findAll();
  res.json({ tags });
});

module.exports = router;
