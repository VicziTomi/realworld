'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    email: DataTypes.STRING ,
    token: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING  
  }, {});
  User.associate = function(models) {
      
  };
  return User;
};