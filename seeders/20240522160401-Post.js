'use strict';
const fs = require('fs/promises')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    const data = JSON.parse(await fs.readFile('./data/posts.json', 'utf8'))
    await queryInterface.bulkInsert('Posts', data.map(d => ({...d, createdAt: new Date(), updatedAt: new Date()})))
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Posts', null, {})
  }
};