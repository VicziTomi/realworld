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
    Profile.belongsToMany(models.Profile, { through: 'Followers' });
    Profile.belongsToMany(models.Profile, { through: 'Following' });
  };
  return Profile;
};
