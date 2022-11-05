const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class CategoriesService {
  constructor() {}

  async create(category) {
    const newCategory = await models.Category.create(category);
    return newCategory;
  }

  async findAll() {
    const categories = await models.Category.findAll();
    return categories;
  }

  async findByPk(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products'],
    });
    if (category === null) {
      throw boom.notFound('CATEGORY NOT FOUND - FIND BY ID');
    }
    return category;
  }

  async update(id, changes) {
    const category = await this.findByPk(id);
    const modifiedCategory = category.update(changes);
    return modifiedCategory;
  }

  async delete(id) {
    const category = await this.findByPk(id);
    await category.destroy();
    return id;
  }
}

module.exports = CategoriesService;
