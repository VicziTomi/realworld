var express = require('express');
var router = express.Router();
const models = require('../models');


router.get('', async (req, res) => {
  let searcParams = new URLSearchParams(req.query);

  if (searcParams.has('author')) {
    const profile = await getAuthor(searcParams.get('author'));
    if (!profile) res.status(404).send('No author with that name');
    await models.Article.findAll({
      where: {
        profileId: profile.id
      }
    }).then(articles => {
      res.json({ articles, "articlesCount": Object.keys(articles).length });
    });
  }

});

const getAuthor = (username) => {
  return profile = models.Profile.findOne({
    where: {
      username: username
    }
  });
}

module.exports = router;