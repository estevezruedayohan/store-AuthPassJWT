'use strict';

const { UserSchema, USER_TABLE } = require('../models/model.user');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.removeColumn(USER_TABLE, 'name');
  },

  async down(queryInterface) {
    await queryInterface.addColumn(USER_TABLE, 'name', {
      allowNull: false,
      type: DataTypes.STRING,
    });
  },
};
