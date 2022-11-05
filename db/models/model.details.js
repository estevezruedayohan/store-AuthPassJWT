const { Model, DataTypes, Sequelize } = require('sequelize');

const DETAILS_TABLE = 'details';
const { PRODUCT_TABLE } = require('./model.products');
const { ORDER_TABLE } = require('./model.orders');

const DetailSchema = {
  id: {
    allowNull: false,
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'created_at',
  },
  amount: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  productId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'product_id',
    references: {
      model: PRODUCT_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
  orderId: {
    allowNull: false,
    type: DataTypes.INTEGER,
    field: 'order_id',
    references: {
      model: ORDER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'SET NULL',
  },
};

class Details extends Model {
  static associate({ models }) {
    //
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: DETAILS_TABLE,
      modelName: 'Details',
      timestamps: false,
    };
  }
}

module.exports = { Details, DetailSchema, DETAILS_TABLE };
