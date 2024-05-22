'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Like.belongsTo(models.User)
      Like.belongsTo(models.Post)
    }
  }
  Like.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'User Id gaboleh kosong'},
        notNull: {msg: 'User Id gaboleh kosong'}
      }
    },
    PostId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Post Id gaboleh kosong'},
        notNull: {msg: 'Post Id gaboleh kosong'}
      }
    }
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};