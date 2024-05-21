const { User } = require('../models')
const bcrypt = require('bcryptjs');

class LoginController {
    static async Login(req, res) {
        try {
            if (req.isAuthenticated()) {
                return res.redirect('/');
            }
            const errorMessage = req.flash('error')[0];
            console.log(req.flash('error'));
            res.render('login/index', { errorMessage })
        } catch (error) {
            res.send(error)
        }
    }

    static async RenderSigup(req, res) {
        try {
            res.render('login/sigup')
        } catch (error) {
            res.send(error)
        }
    }

    static async HandlerSigup(req, res) {
        try {
            if (req.isAuthenticated()) {
                return res.redirect('/');
            }
            console.log('masuk');
            const { nama_lengkap, username, email, password } = req.body;

            if (!nama_lengkap || !username || !email || !password) {
                return res.status(400).send('Mohon lengkapi semua bidang');
            }

            const user = await User.findOne({ where: { email } });
            if (user) {
                return res.status(400).send('Email sudah terdaftar');
            }

            const saltRounds = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newPassword = hashedPassword;

            await User.create({ nama_lengkap, username, email, password: newPassword, role: 'user' });
            res.redirect('/login');
        } catch (error) {
            res.send(error)
        }
    }

    static async Logout(req, res, next) {
        try {
            req.logout((err) => {
                if (err) {
                    return next(err);
                }
                req.session.destroy((err) => {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = LoginController