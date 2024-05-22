const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User, UserProfile, sequelize } = require('../models');
require('dotenv').config()

const googleAuthStrategy = new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/auth/google/callback"
},
    async (accessToken, refreshToken, profile, done) => {
        const transaction = await sequelize.transaction();
        try {
            const [user, created] = await User.findOrCreate({
                where: { GoogleId: profile.id },
                defaults: {
                    GoogleId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                },
                transaction
            })
            if (created) {
                await UserProfile.create({
                    UserId: user.id,
                    nama_lengkap: user.username
                }, { transaction });
            }
            await transaction.commit();
            return done(null, user);
        } catch (error) {
            await transaction.rollback();
            return done(error, null);
        }
    });

module.exports = googleAuthStrategy