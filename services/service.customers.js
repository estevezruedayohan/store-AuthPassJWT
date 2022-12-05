const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

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

  async create(customer) {
    const newCustomer = await models.Customer.create(customer, {
      include: ['user'],
    });
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
