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
    image: DataTypes.STRING,
  }, {});
  Profile.associate = function(models) {
    
  };
  return Profile;
};