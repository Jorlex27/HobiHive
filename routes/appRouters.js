const express = require('express');
const AppController = require('../controllers/appController');
const router = express.Router();

router.get('/', AppController.Home)
router.get('/setting', AppController.Setting)

module.exports = router