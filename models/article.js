'use strict';
module.exports = (sequelize, DataTypes) => {
  const Article = sequelize.define('Article', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    title: DataTypes.STRING,
    slug: DataTypes.STRING,
    description: DataTypes.STRING,
    body: DataTypes.STRING,
    favorited: DataTypes.BOOLEAN,
    favoritesCount: DataTypes.INTEGER
  }, {});
  Article.associate = function (models) {
    Article.belongsToMany(models.Tag, { through: 'ArticleTags' });
  };
  return Article;
};
