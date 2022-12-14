const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcryp = require('bcrypt');

class CustomerService {
  constructor() {}

  async findAll() {
    const customers = await models.Customer.findAll({
      include: ['user'],
    });
    return customers;
  }

  async findByPk(id) {
    const customer = await models.Customer.findByPk(id);
    if (customer === null) {
      throw boom.notFound('CUSTOMER NOT FOUND - FIND BY ID');
    }
    return customer;
  }

  async findByUserId(userId) {
    const customer = await models.Customer.findOne({
      where: {
        user_id: userId,
      },
    });

    if (customer === null) {
      throw boom.notFound('CUSTOMER NOT FOUND - FIND BY ID');
    }
    return customer.id;
  }

  async create(customer) {
    const newhash = await bcryp.hash(customer.user.password, 10);
    const copyCustomer = {
      ...customer,
      user: {
        ...customer.user,
        password: newhash,
      },
    };
    const newCustomer = await models.Customer.create(copyCustomer, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findByPk(id);
    const modifiedCustomer = customer.update(changes);
    return modifiedCustomer; // enviar directamente el resultado
  }

  async delete(id) {
    const customer = await this.findByPk(id);
    await customer.destroy();
    return id;
  }
}

module.exports = CustomerService;
