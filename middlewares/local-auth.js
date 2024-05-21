const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcryptjs');
const { Op } = require('sequelize');

const localAuthStrategy = new LocalStrategy({
  usernameField: 'identifier',
  passwordField: 'password'
},
  async (identifier, password, done) => {
    try {
      const user = await User.findOne({
        where: {
          [Op.or]: [{ email: identifier }, { username: identifier }]
        }
      });
      if (!user) {
        return done(null, false, { message: 'Incorrect email or username.' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        return done(null, false, { message: 'Incorrect password.' });
      }

      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
);

module.exports = localAuthStrategy