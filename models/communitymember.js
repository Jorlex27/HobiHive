'use strict';
const {
  Model,
  Op
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommunityMember extends Model {

    static getCommunity(id){
      return CommunityMember.findAll({
        where: {
          UserId: id
        },
        include: {
          model: sequelize.models.Community,
          attributes: ['id', 'name']
        }
      })
    }

    static getAllCommunity(id){
      return CommunityMember.findAll({
        where: {
          CommunityId: {
            [Op.notIn] : id
          }
        },
        include: {
          model: sequelize.models.Community,
          attributes: ['id', 'name']
        }
      })
    }

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
    role: DataTypes.ENUM('admin','user')
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