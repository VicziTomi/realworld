var express = require('express');
var router = express.Router();
const models = require('../models');


router.get('', async (req, res) => {
  await models.User.findAll().then(users => {
    res.json({ users })
  });
});

router.get('/:id', async (req, res) => {
  const user = await models.User.findByPk(req.params.id);
  if (!user) res.sendStatus(404);
  res.json({ user });
});

router.post('', async (req, res) => {
  const { username } = req.body;
  const { email } = req.body;
  const { bio } = req.body;
  const { image } = req.body;
  await models.User.create({
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
