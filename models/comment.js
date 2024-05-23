'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comment.belongsTo(models.User)
      Comment.belongsTo(models.Post)
    }
  }
  Comment.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg : 'User Id ga boleh kosong'},
        notNull: {msg : 'User Id ga boleh kosong'}
      }
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg : 'Post Id ga boleh kosong'},
        notNull: {msg : 'Post Id ga boleh kosong'}
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {msg : 'content Id ga boleh kosong'},
        notNull: {msg : 'content Id ga boleh kosong'}
      }
    }
  }, {
    sequelize,
    modelName: 'Comment',
  });
  return Comment;
};