const express = require('express');
const session = require('express-session');
const passport = require('passport');
const routers = require('./routes');
const flash = require('connect-flash');
require('./middlewares/passport-setup');
const app = express();

app.use(express.static('public'));
app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: true }))

app.use(session({
    secret: 'Gus Alex',
    resave: false,
    saveUninitialized: true
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());


app.use(routers);

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});