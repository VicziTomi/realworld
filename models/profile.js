'use strict';
module.exports = (sequelize, DataTypes) => {
  const Profile = sequelize.define('Profile', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: DataTypes.STRING,
    bio: DataTypes.STRING,
    image: DataTypes.STRING
  }, {});
  Profile.associate = function (models) {
    Profile.belongsTo(models.User);
    Profile.hasMany(models.Article);
    Profile.belongsToMany(models.Profile, { as: 'followers', through: 'Followers', foreignKey: 'FollowerId', otherKey: 'ProfileId' });
    Profile.belongsToMany(models.Profile, { as: 'following', through: 'Followers', foreignKey: 'ProfileId', otherKey: 'FollowerId' });
  };
  return Profile;
};
