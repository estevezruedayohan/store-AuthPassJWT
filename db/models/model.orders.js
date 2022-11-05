const { Model, DataTypes, Sequelize } = require('sequelize');

const ORDER_TABLE = 'orders';
const { CUSTOMER_TABLE } = require('./model.customer');

const OrderSchema = {
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
};

class Order extends Model {
  static associate({ models }) {
    this.belongsTo(models.Customer, { as: 'customer' });
    this.belongsToMany(models.Details, {
      as: 'items',
      through: models.Details,
      foreignKey: 'orderId',
      otherKey: 'productId',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    };
  }
}

module.exports = { Order, OrderSchema, ORDER_TABLE };
