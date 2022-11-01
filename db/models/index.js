const { User, UserSchema } = require('./model.user');

function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
}

module.exports = setupModels;
