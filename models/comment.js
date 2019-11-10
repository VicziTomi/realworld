'use strict';
module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    body: DataTypes.STRING
  }, {});
  Comment.associate = (models) => {
    Comment.belongsTo(models.Profile);
  };
  return Comment;
};
