'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Community extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Community.hasMany(models.CommunityMember)
      Community.hasMany(models.Post)
      Community.belongsToMany(models.User, { through: models.CommunityMember });
      Community.hasMany(models.ChatMessage);
    }
  }
  Community.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Name ga boleh Kosong' },
        notNull: { msg: 'Name ga boleh Kosong' }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: { msg: 'Description ga boleh Kosong' },
        notNull: { msg: 'Description ga boleh Kosong' }
      }
    },
    imageURL: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Community',
  });
  return Community;
};