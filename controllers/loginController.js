const { User, UserProfile, sequelize } = require('../models')

class LoginController {
    static async Login(req, res) {
        try {
            const msg = req.flash('success');
            const err = req.flash('error')[0];
            res.render('login/index', { msg, err })
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
        const transaction = await sequelize.transaction();
        try {
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

            const userCreate = await User.create({ username, email, password, role: 'user' }, { transaction });

            await UserProfile.create({
                UserId: userCreate.id,
                nama_lengkap: nama_lengkap
            }, { transaction });

            await transaction.commit()
            req.flash('success', 'Pendaftaran berhasil. Silakan login.');
            res.redirect('/login');
        } catch (error) {
            await transaction.rollback()
            console.error(error);
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