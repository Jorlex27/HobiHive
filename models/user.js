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
      // define association here
    }
  }
  User.init({
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true
    },
    nama_lengkap: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tanggal_lahir: {
      type: DataTypes.DATE,
      allowNull: true
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    lokasi: {
      type: DataTypes.STRING,
      allowNull: true
    },
    gambar_profil: {
      type: DataTypes.STRING,
      allowNull: true
    },
    googleId: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'User',
    tableName: 'Users',
    timestamps: true
  });
  // User.beforeCreate(async (user) => {
  //   try {
  //     const saltRounds = bcrypt.genSaltSync(10);
  //     const hashedPassword = await bcrypt.hash(user.password, saltRounds);
  //     user.password = hashedPassword;
  //   } catch (error) {
  //     throw new Error('Error hashing password');
  //   }
  // })
  return User;
};