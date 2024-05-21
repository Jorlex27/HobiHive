const express = require('express');
const LoginController = require('../controllers/loginController');
const passport = require('passport');
const router = express.Router();

router.get('/', LoginController.Login);

router.post('/', passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
}));

router.get('/signup', LoginController.RenderSigup);
router.post('/signup', LoginController.HandlerSignup);
router.get('/logout', LoginController.Logout);


module.exports = router