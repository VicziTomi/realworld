var express = require('express');
var router = express.Router();
const models = require('../models');


router.get('', function(req, res, next) {
  return models.User.findAll().then(users => {
    res.json({ users })
  });
});

// TODO add error handling. Globally...
router.get('/:id', function(req, res, next) {
  return models.User.findByPk(req.params.id).then(users => {
    if (!users) res.sendStatus(404);
    res.json({ users })
  });
});

router.post('', function(req, res, next) {
  return models.User.create({
    username: req.body.username,
    email: req.body.email,
    bio: req.body.bio,
    image: req.body.image,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
