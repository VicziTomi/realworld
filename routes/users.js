var express = require('express');
var router = express.Router();
const models = require('../models');
const passport = require('passport');
require('../passport');
const jwt = require('jsonwebtoken');

const requireAuth = () => (passport.authenticate('jwt', {
  session: false
}));

router.get('', requireAuth(), async (req, res) => {
  const users = await models.User.findAll();
  res.json({ users });
});

router.get('/:id', requireAuth(), async (req, res) => {
  const user = await models.User.findByPk(req.params.id);
  if (!user) res.sendStatus(404);
  res.json({ user });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : 'Login failed',
        user: user
      });
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }
      const token = jwt.sign(user.toJSON(), 'softKitty');
      return res.json({ user, token });
    });
  })(req, res);
});

router.post('', async (req, res) => {
  const { username, email, bio, image, password } = req.body;
  await models.User.create({
    username,
    email,
    bio,
    image,
    password,
    createdAt: new Date(),
    updatedAt: new Date()
  }).then(() => {
    res.sendStatus(200);
  });
});

router.delete('/:id', async (req, res) => {
  const user = await models.User.findByPk(req.params.id);
  if (!user) res.sendStatus(404);
  await models.User.destroy({
    where: {
      id: parseInt(req.params.id)
    }
  });
  res.sendStatus(200);
});

router.put('/:id', async (req, res) => {
  const user = await models.User.findByPk(req.params.id);
  if (!user) res.sendStatus(404);
  const { username } = req.body;
  const { email } = req.body;
  const { bio } = req.body;
  const { image } = req.body;
  await models.User.update({
    username,
    email,
    bio,
    image,
    updatedAt: new Date()
  }, {
    where: {
      id: parseInt(req.params.id)
    }
  }).then(() => {
    res.sendStatus(200);
  });
});

module.exports = router;
