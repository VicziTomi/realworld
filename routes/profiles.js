var express = require('express');
var router = express.Router();
const models = require('../models');


router.get('/:username', async (req, res) => {
  const profile = await models.Profile.findOne({
    where: {
      username: req.params.username
    }
  });
  if (!profile) res.sendStatus(404);
  res.json({ profile });
});


module.exports = router;