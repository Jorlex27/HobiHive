const { User } = require('../models')
const bcrypt = require('bcryptjs');

class LoginController {
    static async Login(req, res) {
        try {
            if (req.isAuthenticated()) {
                return res.redirect('/');
            }
            const errorMessage = req.flash('error')[0];
            res.render('login/index', { errorMessage })
        } catch (error) {
            res.send(error)
        }
    }

    static async RenderSigup(req, res) {
        try {
            const messages = req.flash('error');
            console.log(messages);
            res.render('login/signup', { messages });
        } catch (error) {
            res.send(error)
        }
    }

    static async HandlerSignup(req, res) {
        try {
            if (req.isAuthenticated()) {
                return res.redirect('/');
            }
            console.log('masuk');
            const { nama_lengkap, username, email, password } = req.body;

            if (!nama_lengkap || !username || !email || !password) {
                req.flash('error', 'Mohon lengkapi semua bidang')
                return res.redirect('/login/signup')
            }

            const user = await User.findOne({ where: { email } });
            if (user) {
                req.flash('error', 'Email sudah terdaftar');
                return res.redirect('/login/signup');
            }

            const saltRounds = bcrypt.genSaltSync(10);
            const hashedPassword = await bcrypt.hash(password, saltRounds);
            const newPassword = hashedPassword;

            await User.create({ nama_lengkap, username, email, password: newPassword, role: 'user' });
            res.redirect('/login');
        } catch (error) {
            req.flash('error', 'Terjadi kesalahan saat mendaftar');
            res.redirect('/login/signup');
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