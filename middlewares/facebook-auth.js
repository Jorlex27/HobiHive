const FacebookStrategy = require('passport-facebook')

const facebookAuth = new FacebookStrategy({
    clientID: 'YOUR_APP_ID',
    clientSecret: 'YOUR_APP_SECRET',
    callbackURL: 'http://localhost:3000/auth/facebook/callback',
    profileFields: ['id', 'displayName', 'photos', 'email']
}, async (accessToken, refreshToken, profile, done) => {
    User.findOrCreate({ facebookId: profile.id }, (err, user) => {
      return done(err, user);
    });
    return done(null, profile);
})