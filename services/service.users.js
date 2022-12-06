const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');
const bcryp = require('bcrypt');

class UserService {
  constructor() {}

  async findAll() {
    const users = await models.User.findAll({
      include: ['customer'],
    });
    return users;
  }

  async findByPk(id) {
    const user = await models.User.findByPk(id);
    if (user === null) {
      throw boom.notFound('USER NOT FOUND - FIND BY ID');
    }
    return user;
  }

  async findByEmail(email) {
    const user = await models.User.findOne({
      where: {
        email,
      },
    });
    if (user === null) {
      throw boom.notFound('USER NOT FOUND - FIND BY EMAIL');
    }
    return user;
  }

  async create(user) {
    const newhash = await bcryp.hash(user.password, 10);
    const newUser = await models.User.create({
      ...user,
      password: newhash,
    });
    delete newUser.dataValues.password;
    return newUser;
  }

  async update(id, changes) {
    const user = await this.findByPk(id);
    const modifiedUser = user.update(changes);
    return modifiedUser; // enviar directamente el resultado
  }

  async delete(id) {
    const user = await this.findByPk(id);
    await user.destroy();
    return id;
  }
}

module.exports = UserService;
