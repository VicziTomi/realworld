var express = require('express');
var router = express.Router();
const models = require('../models');


router.get('', function(req, res, next) {
  return models.User.findAll().then(users => {
    res.json({ users })
  })
});

module.exports = router;
