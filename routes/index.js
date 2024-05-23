const router = require('express').Router();
const { ensureAuthenticated, Authenticated } = require('../middlewares/authMiddleware');
const authRoutes = require('./authRoutes');
const loginRouters = require('./loginRouters')
const appRouters = require('./appRouters')

router.use('/auth', authRoutes);
// router.use('/', appRouters);
router.use('/login', loginRouters)
router.use('/', ensureAuthenticated, appRouters);

module.exports = router