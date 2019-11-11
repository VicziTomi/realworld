const express = require('express');
const router = express.Router();
const models = require('../models');
const passport = require('passport');
require('../passport');
const jwt = require('jsonwebtoken');

const requireAuth = () => (passport.authenticate('jwt', {
  session: false
}));

// Get current user based on auth
router.get('', requireAuth(), (req, res) => {
  const currentUser = req.user;
  res.json({ currentUser });
});

// Login here
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

// Create new user
router.post('', async (req, res) => {
  const { username, email, bio, image, password } = req.body;
  const userCreated = await models.User.create({
    username,
    email,
    bio,
    image,
    password,
    createdAt: new Date(),
    updatedAt: new Date()
  });
  const profile = await models.Profile.create({
    username: userCreated.username,
    bio: userCreated.bio,
    image: userCreated.image,
    UserId: parseInt(userCreated.id),
    createdAt: new Date(),
    updatedAt: new Date()
  });
  res.json({ profile });
});

// update current (authenticated) user
router.put('', requireAuth(), async (req, res) => {
  const currentUser = req.user;
  const { username, email, bio, image, password } = req.body;
  await models.User.update({
    username,
    email,
    bio,
    image,
    password,
    updatedAt: new Date()
  }, {
    where: {
      id: parseInt(currentUser.id)
    }
  });
  await models.Profile.update({
    username,
    bio,
    image,
    updatedAt: new Date()
  }, {
    where: {
      UserId: parseInt(currentUser.id)
    }
  });
  const updatedUser = await models.User.findOne({
    where: {
      id: parseInt(currentUser.id)
    }
  });
  res.json({ updatedUser });
});

/* GET ALL users - not required in API SPECs
router.get('', requireAuth(), async (req, res) => {
  const users = await models.User.findAll();
  res.json({ users });
});
*/

/* Pliz ignore... get another user's profile instead
router.get('/:id', requireAuth(), async (req, res) => {
  const user = await models.User.findByPk(req.params.id);
  if (!user) res.sendStatus(404);
  res.json({ user });
});
*/

/* ignore... no user delition specified in SPECs. Instead: delete profile?
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
*/

module.exports = router;
