const express = require('express');
const AppController = require('../controllers/appController');
const router = express.Router();

router.get('/', AppController.Home)
router.get('/profile', AppController.Setting)
router.post('/new/post', AppController.HendlerPost)
router.get('/chat/:userId/:communityId', AppController.ChatGroup)
router.post('/reset/password/:id', AppController.ResetPw)
router.get('/like/:postId/:userId', AppController.AddPostLikes)
router.post('/comment/:postId/:userId', AppController.AddPostComment)

module.exports = router