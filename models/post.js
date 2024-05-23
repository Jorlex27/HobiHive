'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Post.belongsTo(models.User)
      Post.belongsTo(models.Community)
      Post.hasMany(models.Like)
      Post.hasMany(models.Comment)
    }
  }
  Post.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    CommunityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Community tidak boleh kosong'},
        notNull: {msg: 'Community tidak boleh kosong'}
      }
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Title tidak boleh kosong'},
        notNull: {msg: 'Title tidak boleh kosong'}
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Content tidak boleh kosong'},
        notNull: {msg: 'Content tidak boleh kosong'}
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Post',
  });
  return Post;
};