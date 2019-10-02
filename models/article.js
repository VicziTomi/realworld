'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    body: DataTypes.STRING,
    favorited: DataTypes.BOOLEAN,
    favoritesCount: DataTypes.INTEGER
  }, {});
  Article.associate = function(models) {
    // associations can be defined here
  };
  return Article;
};