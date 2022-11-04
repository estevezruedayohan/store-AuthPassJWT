const { User, UserSchema } = require('./model.user');
const { Customer, CustomerSchema } = require('./model.customer');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  User.associate(sequelize);
  Customer.associate(sequelize);
}

module.exports = setupModels;
