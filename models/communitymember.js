'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommunityMember extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      CommunityMember.belongsTo(models.User)
      CommunityMember.belongsTo(models.Community)
    }
  }
  CommunityMember.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'User Id gaboleh kosong'},
        notNull: {msg: 'User Id gaboleh kosong'}
      }
    },
    CommunityId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Community Id gaboleh kosong'},
        notNull: {msg: 'Community Id gaboleh kosong'}
      }
    },
    role: DataTypes.ENUM
  }, {
    sequelize,
    modelName: 'CommunityMember',
  });
  CommunityMember.beforeCreate(com => {
    com.role = 'admin'
  })
  CommunityMember.afterCreate(com => {
    com.role = 'user'
  })
  return CommunityMember;
};