'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatMessage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChatMessage.belongsTo(models.User)
      ChatMessage.belongsTo(models.Community)
    }
  }
  ChatMessage.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Sender gaboleh kosong' },
        notNull: { msg: 'Sender gaboleh kosong' }
      }
    },
    CommunityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Receiver gaboleh kosong' },
        notNull: { msg: 'Receiver gaboleh kosong' }
      }
    },
    message: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Message gaboleh kosong' },
        notNull: { msg: 'Message gaboleh kosong' }
      }
    }
  }, {
    sequelize,
    modelName: 'ChatMessage',
  });
  return ChatMessage;
};