'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Settings', [{
      name: "长乐未央",
      icp: "ICP备130-288",
      copyright: "@ 2018 CH拿高分",
      createdAt: new Date(),
      updatedAt: new Date()

    }])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Settings", null, {})
  }
};
