'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING ,
    token: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING  
  }, {});
  User.associate = function(models) {
      User.hasOne(models.Profile);
      User.hasMany(models.Article);
  };
  return User;
};