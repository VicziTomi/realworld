var express = require('express');
var router = express.Router();
const models = require('../models');

router.get('', async (req, res) => {
  const searcParams = new URLSearchParams(req.query);
  console.log(searcParams);
  if (searcParams.has('author')) {
    const profile = await getAuthor(searcParams.get('author'));
    if (!profile) res.status(404).send('No author with that name');
    await models.Article.findAll({
      where: {
        profileId: profile.id
      }
    }).then(articles => {
      res.json({ articles, articlesCount: Object.keys(articles).length });
    });
  }
  if (searcParams.has('tag')) {
    const tag = await getTag(searcParams.get('tag'));
    if (!tag) res.status(404).send('No tag wtih that one');
    await models.Article.findAll({
      include: [{
        model: models.Tag,
        where: { id: tag.id }
      }]
    }).then(articles => {
      res.json({ articles, articlesCount: Object.keys(articles).length });
    });
  }
  if (searcParams.has('limit')) {
    await findAllByLimit(searcParams.get('limit'))
      .then(articles => {
        res.json({ articles, articlesCount: Object.keys(articles).length });
      });
  }
  await getAllArticles()
    .then(articles => {
      res.json({ articles, articlesCount: Object.keys(articles).length });
    });
});

const getAllArticles = () => {
  return models.Article.findAll();
};

const findAllByLimit = (limitCount) => {
  return models.Article.findAll({
    limit: parseInt(limitCount)
  });
};

const getAuthor = (username) => {
  return models.Profile.findOne({
    where: {
      username: username
    }
  });
};

const getTag = (tag) => {
  return models.Tag.findOne({
    where: {
      name: tag
    }
  });
};

router.get('/:slug', async (req, res) => {
  const article = await models.Article.findOne({
    where: {
      slug: req.params.slug
    }
  });
  if (!article) res.sendStatus(404);
  res.json({ article });
});

router.post('', async (req, res) => {
  /* TODO finish
  const { title } = req.body;
  const { description } = req.body;
  const { body } = req.body;
  const { tagList } = req.body;
  */
});

module.exports = router;
