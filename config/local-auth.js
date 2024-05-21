const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../models');
const bcrypt = require('bcryptjs')

const localAuthStrategy = new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
        
      const user = await User.findOne({ where: { email: email } });
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
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
