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

router.get('/sigup', LoginController.RenderSigup);
router.post('/sigup', LoginController.HandlerSigup);
router.get('/logout', LoginController.Logout);


module.exports = router