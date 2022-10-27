const faker = require('faker');
const boom = require('@hapi/boom');
const getConnection = require('../libs/postgres');

class ProductService {
  constructor() {
    this.products = [];
    this.generate();
  }

  generate() {
    const limit = 10;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        images: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      });
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.products.push(newProduct);
    return newProduct;
  }

  async findAll() {
    // return this.products;
    const client = await getConnection();
    const products = await client.query('SELECT * FROM products');
    return products.rows;
  }

  async findOne(id) {
    const product = this.products.find((elem) => elem.id === id);
    if (product === undefined) {
      throw boom.notFound('Product NOT FOUND - FIND BY ID');
    }
    if (product.isBlock) {
      throw boom.conflict('Product has been BLOCKED - FIND BY ID');
    }
    return product;
  }

  async update(id, data) {
    const index = this.products.findIndex((elem) => elem.id === id);
    if (index === -1) {
      throw boom.notFound('Product NOT FOUND - UPDATE');
    }
    const product = this.products[index];
    this.products[index] = {
      ...product,
      ...data,
    };
    return this.products[index];
  }

  async delete(id) {
    const index = this.products.findIndex((elem) => elem.id === id);
    if (index === -1) {
      throw boom.notFound('Product NOT FOUND - DELETE');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductService;
