const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {}

  async findAll() {
    const orders = await models.Order.findAll();
    return orders;
  }

  async findByPk(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: 'user',
        },
        'items',
      ],
    });
    if (order === null) {
      throw boom.notFound('ORDER NOT FOUND - FIND BY ID');
    }
    return order;
  }

  async findByUserId(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: 'user',
        },
      ],
    });
    orders.forEach((element) => {
      delete element.dataValues.customer.dataValues.user;
    });
    return orders;
  }

  async create(customerId) {
    const newOrder = await models.Order.create(customerId);
    if (!newOrder) {
      throw boom.notAcceptable('ALGO SALIO MAL');
    }
    return newOrder;
  }

  async update(id, changes) {
    const order = await this.findByPk(id);
    const modifiedOrder = order.update(changes);
    return modifiedOrder; // enviar directamente el resultado
  }

  async delete(id) {
    const order = await this.findByPk(id);
    await order.destroy();
    return id;
  }
}

module.exports = OrderService;
