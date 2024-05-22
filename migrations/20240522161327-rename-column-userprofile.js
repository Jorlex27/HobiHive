'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn('UserProfiles', 'gambar_profile', 'imageURL')
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('UserProfiles', 'imageURL', 'gambar_profile')
  }
};
