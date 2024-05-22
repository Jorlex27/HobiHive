'use strict';
const fs = require('fs/promises')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(await fs.readFile('./data/community-members.json', 'utf8'))
    await queryInterface.bulkInsert('CommunityMembers', data.map(d => ({...d, role: 'admin', createdAt: new Date(), updatedAt: new Date()})))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('CommunityMembers', null, {})
  }
};
