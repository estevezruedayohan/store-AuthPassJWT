'use strict';

const { DetailSchema, DETAILS_TABLE } = require('../models/model.details');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(DETAILS_TABLE, DetailSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(DETAILS_TABLE);
  },
};
