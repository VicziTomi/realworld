'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    username: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING,
  }, {});
  Profile.associate = function(models) {
    Profile.belongsTo(models.User);
  };
  return Profile;
};