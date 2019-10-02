var express = require('express');
var router = express.Router();
const models = require('../models');


router.get('', function(req, res, next) {
  return models.User.findAll().then(users => {
    res.json({ users })
  });
});

// TODO add error handling. Globally...
// TODO arrow functions, dont use next (instead use it in auth)
// await - async
router.get('/:id', async function(req, res, next) {
  const user = await models.User.findByPk(req.params.id)
  if (!users) res.sendStatus(404);
  res.json({ user })
});


// FINISH it
router.post('', function(req, res, next) {
  const { username } = req.body;
  const { email } = req.body;
  const { bio } = req.body;
  const { image } = req.body;
  return models.User.create({
    username,
    email, 
    bio,
    image,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(() => {
    res.sendStatus(200);
  });
});

router.delete('/:id', function(req, res, next) {
  return models.User.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  }).then(() => {
    res.sendStatus(200);
  });
});

router.put('/:id', function(req, res, next) {
  models.User.findByPk(req.params.id).then(user => {
    if (!user) return res.sendStatus(404);
  });
  return models.User.update({
    username: req.body.username,
    email: req.body.email,
    bio: req.body.bio,
    image: req.body.image,
    updatedAt: new Date(),
    }, {
      where: {
        id: parseInt(req.params.id)
      }
    }).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
