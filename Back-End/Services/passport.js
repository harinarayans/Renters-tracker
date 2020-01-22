const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const userModal = require('../Modals/user');

module.exports = function (passport) {

    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function (id, done) {
        userModal.findById(id, function (err, user) {
            done(err, user);
        });
    });

    passport.use(new LocalStrategy({ usernameField: 'email', }, function (email, password, done) {
        try {
            userModal.findOne({ $and: [{ email: email, isActive: true, isEmailVerified: true, isDeleted: false }] }, function (err, user) {
                if (err) {
                    return done(err);
                }
                if (!user) {
                    return done(null, { success: false, message: 'Email address is not associated with any renters account.' });
                }
                user.verifyPassword(password, user.password).then((res) => {
                    if (!res) {
                        return done(null, { success: false, message: 'Invalid Credentials.' });
                    } else {
                        return done(null, {
                            success: true,
                            userData: user
                        });
                    }
                });
            }).populate('roleId');
        } catch (error) {
            done(error, {
                success: false,
                message: error
            });
        }

    }));
}