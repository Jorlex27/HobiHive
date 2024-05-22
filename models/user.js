'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.UserProfile)
      User.hasMany(models.CommunityMember)
      User.hasMany(models.Post)
      User.hasMany(models.Comment)
      User.hasMany(models.Like)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    GoogleId: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate(async (user) => {
    if (user.password) {
      const saltRounds = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    }
  })
  return User;
};