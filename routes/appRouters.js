const express = require('express');
const AppController = require('../controllers/appController');
const router = express.Router();

router.get('/', AppController.Home)
router.get('/profile', AppController.Setting)
router.post('/new/post', AppController.HendlerPost)
router.get('/chat/:userId/:communityId', AppController.ChatGroup)
router.post('/reset/password/:id', AppController.ResetPw)

module.exports = router