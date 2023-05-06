const passport = require('passport');
const RegisterModel = require('../model/registerModel')
const passportLocal = require('passport-local').Strategy

passport.use(new passportLocal({
    usernameField: 'email',
}, async (email, password, done) => {

    try {
        const user = await RegisterModel.findOne({ email: email })
        if (!user || user.password != password) {
            return done(null, false);
        }
        return done(null, user);
    } catch (error) {
        console.log(error.message);
    }

}));

passport.serializeUser((user, done) => {
    return done(null, user.id)
});

passport.deserializeUser(async (id, done) => {

    try {
        const user = await RegisterModel.findById(id);
        if (user) {
            return done(null, user)
        }
        return done(null, false);
    } catch (error) {
        console.log(error.message);
    }

})

passport.checkAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        return next();
    }
    return res.redirect('/')
}

passport.setAuthentication = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user
    }
    next()
}



module.exports = passport