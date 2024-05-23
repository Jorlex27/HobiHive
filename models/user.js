'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {


    static associate(models) {
      User.hasOne(models.UserProfile)
      User.hasMany(models.CommunityMember)
      User.belongsToMany(models.Community, { through: models.CommunityMember });
      User.hasMany(models.Post)
      User.hasMany(models.Comment)
      User.hasMany(models.Like)
      User.hasMany(models.ChatMessage);
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Username ga boleh kosong' },
        notNull: { msg: 'Username ga boleh kosong' }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Email ga boleh kosong' },
        notNull: { msg: 'Email ga boleh kosong' }
      }
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
  User.beforeUpdate(async (user) => {
    if (user.changed('password')) {
      const saltRounds = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(user.password, saltRounds);
      user.password = hashedPassword;
    }
  })
  return User;
};