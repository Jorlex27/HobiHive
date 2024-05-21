class LoginController {
    static async Login(req, res) {
        try {
            if (req.isAuthenticated()) {
                return res.redirect('/');
            }
            res.render('login/index')
        } catch (error) {
            res.send(error)
        }
    }

    static async Logout (req, res, next) {
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