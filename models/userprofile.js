'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    
    static associate(models) {
      UserProfile.belongsTo(models.User)
    }
  }
  UserProfile.init({
    UserId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'User Id tidak boleh kosong'},
        notNull: {msg: 'User Id tidak boleh kosong'}
      }
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: 'Nama Lengkap tidak boleh kosong'},
        notNull: {msg: 'Nama Lengkap tidak boleh kosong'},
        len: {
          args: [5],
          msg: 'Nama lengkap harus memiliki setidaknya 5 karakter'
        }
      }
    },
    tangal_lahir: {
      type: DataTypes.DATE,
      allowNull: true
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};