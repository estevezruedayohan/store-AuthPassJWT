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

  async sendRecovery(email) {
    const user = await service.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const payload = {
      sub: user.id,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    const link = `https://myfrontend.com/recovery?token=${token}`;

    await service.update(user.id, { recoveryToken: token });

    const infoMail = {
      from: config.userMail, // sender address
      to: `${user.email}`, // list of receivers
      subject: 'MENSAJE DE RECUPERACION DE CONTRASEÑA', // Subject line
      html: `<b> Usted solicitó recuper su contraseña, siga este link: ${link}</b>`, // html body
    };
    const rta = await this.sendMail(infoMail);
    return rta;
  }

  async sendMail(infoMail) {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true, // true for 465, false for other ports
      auth: {
        user: config.userMail,
        pass: config.passMail,
      },
    });

    await transporter.sendMail(infoMail);
    return { message: 'sent email succesfully ¡¡' };
  }
}

module.exports = LoginService;
