var express = require('express');
var router = express.Router();
const models = require('../models');
const passport = require('passport');
require('../passport');

const requireAuth = () => (passport.authenticate('jwt', {
  session: false
}));

// GET articles, based on query params
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

// GET article by slug
router.get('/:slug', async (req, res) => {
  const article = await models.Article.findOne({
    where: {
      slug: req.params.slug
    }
  });
  if (!article) res.sendStatus(404);
  res.json({ article });
});

// CREATE new article with given tagList
router.post('', requireAuth(), async (req, res) => {
  const { title, description, body, tags } = req.body;
  const currentUser = req.user;
  const profile = await models.Profile.findOne({
    where: {
      UserId: parseInt(currentUser.id)
    }
  });
  const tagIds = [];
  for (let i = 0; i < tags.length; ++i) {
    await models.Tag.findOrCreate({
      where: {
        name: tags[i]
      }
    }).then(tag => {
      tagIds.push(tag[0].id);
    });
  }
  await models.Article.create({
    title,
    description,
    body,
    slug: createSlug(title),
    ProfileId: profile.id
  }).then(article => {
    article.setTags(tagIds);
    res.json({ article, tags: tags });
  });
});

// TODO make getProfile function, replace two (?) occurancies

router.put('/:slug', requireAuth(), async (req, res) => {
  const currentUser = req.user;
  const { title, description, body } = req.body;
  const article = await getArticleBySlug(req.params.slug);
  const profile = await models.Profile.findOne({
    where: {
      UserId: parseInt(currentUser.id)
    }
  });
  if (article.ProfileId === profile.id) {
    await models.Article.update({
      title,
      description,
      body,
      slug: createSlug(title),
      updatedAt: new Date()
    }, {
      where: {
        id: parseInt(article.id)
      }
    });
    await getArticleById(article.id)
      .then(article => {
        res.json({ article });
      });
  } else {
    res.sendStatus(401);
  }
});

const getArticleById = (id) => {
  return models.Article.findOne({
    where: {
      id: id
    }
  });
};

const getArticleBySlug = (slug) => {
  return models.Article.findOne({
    where: {
      slug: slug
    }
  });
};

const createSlug = (title) => {
  return title.split(' ').join('-').toLowerCase();
};

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

module.exports = router;
