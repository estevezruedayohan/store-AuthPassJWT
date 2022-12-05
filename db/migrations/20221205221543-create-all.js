'use strict';

const { DataTypes } = require('sequelize');
const { UserSchema, USER_TABLE } = require('../models/model.user');
const { CustomerSchema, CUSTOMER_TABLE } = require('../models/model.customer');
const {
  CategorySchema,
  CATEGORY_TABLE,
} = require('../models/model.categories');
const { ProductSchema, PRODUCT_TABLE } = require('../models/model.products');
const { OrderSchema, ORDER_TABLE } = require('../models/model.orders');
const { DetailSchema, DETAILS_TABLE } = require('../models/model.details');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, UserSchema);
    await queryInterface.createTable(CUSTOMER_TABLE, CustomerSchema);
    await queryInterface.createTable(CATEGORY_TABLE, CategorySchema);
    await queryInterface.createTable(PRODUCT_TABLE, ProductSchema);
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      state: {
        allowNull: false,
        type: DataTypes.STRING,
        defaultValue: 'PENDIENTE',
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        field: 'created_at',
      },
      customerId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'customer_id',
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
    });
    await queryInterface.createTable(DETAILS_TABLE, DetailSchema);
  },

  async down(queryInterface) {
    await queryInterface.dropTable(USER_TABLE);
    await queryInterface.dropTable(CUSTOMER_TABLE);
    await queryInterface.dropTable(PRODUCT_TABLE);
    await queryInterface.dropTable(CATEGORY_TABLE);
    await queryInterface.dropTable(ORDER_TABLE);
    await queryInterface.dropTable(DETAILS_TABLE);
  },
};
