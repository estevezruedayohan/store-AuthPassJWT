const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

const { config } = require('./../config/config');
const UserService = require('./service.users');
const service = new UserService();

class LoginService {
  async getUser(email, password) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  signToken(user) {
    const payload = {
      sub: user.id,
      role: user.rol,
    };
    const token = jwt.sign(payload, config.jwtSecret);
    return { user, token };
  }

  async sendMail(email) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.userMail,
        pass: config.passMail,
      },
    });

    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    await transporter.sendMail({
      from: config.userMail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'Test send mail to recovery password', // Subject line
      text: 'Test send mail', // plain text body
      html: '<b>Test send mail to recovery password - succesfully ¡¡¡¡ </b>', // html body
    });
    return { message: 'sent email succesfully ¡¡' };
  }
}

module.exports = LoginService;
