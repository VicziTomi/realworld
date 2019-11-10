var express = require('express');
var router = express.Router();
const models = require('../models');
const passport = require('passport');
require('../passport');

const requireAuth = () => (passport.authenticate('jwt', {
  session: false
}));

// get profile by username
router.get('/:username', async (req, res) => {
  const profile = await getProfileByUserName(req.params.username);
  if (!profile) res.sendStatus(404);
  res.json({ profile });
});

// follow a user (profile)
router.post('/:username/follow', requireAuth(), async (req, res) => {
  const currentUser = req.user;
  const toFollowProfile = await getProfileByUserName(req.params.username);
  if (!toFollowProfile) res.sendStatus(404);
  const ownProfile = await getProfileByCurrentUser(currentUser.id);
  await toFollowProfile.addFollowing(ownProfile);
  res.json({ toFollowProfile });
});

// unfollow a user (profile)
router.delete('/:username/follow', requireAuth(), async (req, res) => {
  const currentUser = req.user;
  const toUnfollowProfile = await getProfileByUserName(req.params.username);
  if (!toUnfollowProfile) res.sendStatus(404);
  const ownProfile = await getProfileByCurrentUser(currentUser.id);
  await toUnfollowProfile.removeFollower(ownProfile);
  res.json({ toUnfollowProfile });
});

const getProfileByCurrentUser = (id) => {
  return models.Profile.findOne({
    where: {
      UserId: parseInt(id)
    }
  });
};

const getProfileByUserName = (username) => {
  return models.Profile.findOne({
    where: {
      username: username
    }
  });
};

module.exports = router;
