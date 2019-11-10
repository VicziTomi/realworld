var express = require('express');
var router = express.Router();
const models = require('../models');

/**
 * Get Tags
 * @route GET /tags
 * @group TAG - listing tags
 * @returns {object} 200 - An array of tags
 * @returns {Error}  default - Unexpected error
 */
router.get('', async (req, res) => {
  const tags = await models.Tag.findAll();
  res.json({ tags });
});

module.exports = router;
