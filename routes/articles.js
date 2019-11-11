var express = require('express');
var router = express.Router();
const models = require('../models');
const passport = require('passport');
require('../passport');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const requireAuth = () => (passport.authenticate('jwt', {
  session: false
}));

// GET articles, based on query params
router.get('', async (req, res) => {
  const searcParams = new URLSearchParams(req.query);
  console.log(searcParams);
  if (searcParams.has('author')) {
    const profile = await getProfileByUserName(searcParams.get('author'));
    if (!profile) res.status(404).send('No author with that name');
    const articles = await models.Article.findAll({
      where: {
        profileId: profile.id
      }
    });
    res.json({ articles, articlesCount: Object.keys(articles).length });
  }
  if (searcParams.has('tag')) {
    const tag = await getTag(searcParams.get('tag'));
    if (!tag) res.status(404).send('No tag wtih that one');
    const articles = await models.Article.findAll({
      include: [{
        model: models.Tag,
        where: { id: tag.id }
      }]
    });
    res.json({ articles, articlesCount: Object.keys(articles).length });
  }
  if (searcParams.has('limit')) {
    const articles = await findAllByLimit(searcParams.get('limit'));
    res.json({ articles, articlesCount: Object.keys(articles).length });
  }
  const articles = await getAllArticles();
  res.json({ articles, articlesCount: Object.keys(articles).length });
});

// articles feed
router.get('/feed', requireAuth(), async (req, res) => {
  const currentUser = req.user;
  const profile = await getCurrentUserProfile(currentUser.id);
  const followingProfiles = await profile.getFollowers();
  if (followingProfiles.length === 0) {
    res.status(404).send('no articles to show, not following anyone');
  }
  const followingProfilesIDs = [];
  for (let i = 0; i < followingProfiles.length; ++i) {
    followingProfilesIDs.push(followingProfiles[i].id);
  }
  const articleFeed = await models.Article.findAll({
    where: {
      ProfileId: {
        [Op.or]: followingProfilesIDs
      }
    }
  });
  res.json({ articleFeed });
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
  const profile = await getCurrentUserProfile(currentUser.id);
  const tagIds = [];
  for (let i = 0; i < tags.length; ++i) {
    const tag = await models.Tag.findOrCreate({
      where: {
        name: tags[i]
      }
    });
    tagIds.push(tag[0].id);
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

// Update article
router.put('/:slug', requireAuth(), async (req, res) => {
  const currentUser = req.user;
  const { title, description, body } = req.body;
  const article = await getArticleBySlug(req.params.slug);
  if (!article) res.sendStatus(404);
  const profile = await getCurrentUserProfile(currentUser.id);
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
    const updatedArticle = await getArticleById(article.id);
    res.json({ updatedArticle });
  } else {
    res.sendStatus(401);
  }
});

// delete article, only own ones...
router.delete('/:slug', requireAuth(), async (req, res) => {
  const currentUser = req.user;
  const article = await getArticleBySlug(req.params.slug);
  if (!article) res.sendStatus(404);
  const profile = await getCurrentUserProfile(currentUser.id);
  if (article.ProfileId === profile.id) {
    await models.Article.destroy({
      where: {
        id: parseInt(article.id)
      }
    });
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

// Add comment to an article
router.post('/:slug/comments', requireAuth(), async (req, res) => {
  const currentUser = req.user;
  const { body } = req.body;
  const article = await getArticleBySlug(req.params.slug);
  if (!article) res.sendStatus(404);
  const profile = await getCurrentUserProfile(currentUser.id);
  const comment = await models.Comment.create({
    body,
    ArticleId: parseInt(article.id),
    ProfileId: parseInt(profile.id)
  });
  res.json({ comment });
});

// Get article comments
router.get('/:slug/comments', async (req, res) => {
  const article = await getArticleBySlug(req.params.slug);
  if (!article) res.sendStatus(404);
  const comments = await models.Comment.findAll({
    where: {
      ArticleId: parseInt(article.id)
    }
  });
  res.json({ comments });
});

// delete an own comment
router.delete('/:slug/comments/:id', requireAuth(), async (req, res) => {
  const currentUser = req.user;
  const profile = await getCurrentUserProfile(currentUser.id);
  const article = await getArticleBySlug(req.params.slug);
  if (!article) res.sendStatus(404);
  const comment = await models.Comment.findOne({
    where: {
      id: parseInt(req.params.id)
    }
  });
  if (comment.ProfileId === profile.id) {
    await models.Comment.destroy({
      where: {
        id: parseInt(req.params.id)
      }
    });
    res.sendStatus(200);
  } else {
    res.status(401).send('Cannot delete, not your comment');
  }
});

const getCurrentUserProfile = (id) => {
  return models.Profile.findOne({
    where: {
      UserId: parseInt(id)
    }
  });
};

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

const getProfileByUserName = (username) => {
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
