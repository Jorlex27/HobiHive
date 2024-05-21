const passport = require('passport');
const localAuth = require('./local-auth');
const googleAuth = require('./google-auth');
const { User } = require('../models')

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findByPk(id);
        done(null, user);
    } catch (error) {
        done(error, null);
    }
});

passport.use('local', localAuth);
passport.use('google', googleAuth);
