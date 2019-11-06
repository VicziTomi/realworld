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
  if (searcParams.has('tag')) {
    const tag = await getTag(searcParams.get('tag'));
    if (!tag) res.status(404).send('No tag wtih that one');
    await models.Article.findAll({
      /* Code here returns all articles (taglist nested [] or the searched ['tag'] obj)
      include: [{
        model: models.Tag,
        through: { attributes: ['tagId'], where: {tagId: tag.id} }
      }]
      */
      include: [{
        model: models.Tag,
        where: { id: tag.id }
      }]
    }).then(articles => {
      res.json({ articles, 'articlesCount': Object.keys(articles).length });
    });
  }

});

const getAuthor = (username) => {
  return models.Profile.findOne({
    where: {
      username: username
    }
  });
}

const getTag = (tag) => {
  return models.Tag.findOne({
    where: {
      name: tag
    }
  });
}

module.exports = router;