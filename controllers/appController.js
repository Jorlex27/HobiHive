const { User } = require("../models");

class AppController {
    static async Home(req, res) {
        try {
            const userId = req.user.id;
            const data = await User.findByPk(userId)
            res.render('index', {data})
        } catch (error) {
            res.send(error)
        }
    }
    static async Setting(req, res) {
        try {
            res.send('ok')
        } catch (error) {
            res.send(error)
        }
    }
}

module.exports = AppController