const { User, UserSchema } = require('./model.user');
const { Customer, CustomerSchema } = require('./model.customer');
const { Category, CategorySchema } = require('./model.categories');
const { Product, ProductSchema } = require('./model.products');
const { Order, OrderSchema } = require('./model.orders');
const { Details, DetailSchema } = require('./model.details');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));
  Category.init(CategorySchema, Category.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Order.init(OrderSchema, Order.config(sequelize));
  Details.init(DetailSchema, Details.config(sequelize));

  User.associate(sequelize);
  Customer.associate(sequelize);
  Category.associate(sequelize);
  Product.associate(sequelize);
  Order.associate(sequelize);
}

module.exports = setupModels;
