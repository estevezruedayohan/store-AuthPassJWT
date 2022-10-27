const boom = require('@hapi/boom');
// const getConnection = require('../libs/postgres');
const pool = require('../libs/postgres.pool');
const sequelize = require('../libs/sequelize');

class UserService {
  constructor() {
    this.pool = pool;
    this.pool.on('error', (err) => console.error(err));
  }

  async findAll() {
    const query = 'SELECT * FROM users;';
    // const users = await this.pool.query(query);
    const [data] = await sequelize.query(query);
    return data;
  }

  async findOne(id) {
    const query = `SELECT * FROM users WHERE id=${id};`;
    // const client = await getConnection();
    // const user = await client.query(`SELECT * FROM users WHERE id=${id};`);
    // const user = await this.pool.query(query);
    const [data] = await sequelize.query(query);

    if (data.length === 0) {
      throw boom.notFound('USER NOT FOUND - FIND BY ID');
    }
    return data;
  }

  // async findOne(id) {
  //   const client = await getConnection();
  //   const user = await client.query(`SELECT * FROM users WHERE id=${id};`);
  //   if (user === undefined) {
  //     throw boom.notFound('USER NOT FOUND - FIND BY ID');
  //   }
  //   return user.rows;
  // }
}

module.exports = UserService;
