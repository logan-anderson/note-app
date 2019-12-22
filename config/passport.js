const localStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// account modal

const Account = require('../models/Account');


module.exports = function (passport) {
    passport.use(
        new localStrategy({ usernameField: 'email', }, (email, password, done) => {
            // Match account
            Account.findOne({ email: email })
                .then(account => {
                    if (!account) {
                        return done(null, false, { message: 'That email is not registered' });
                    }
                    // Match Password
                    bcrypt.compare(password, account.password, (err, isMatch) => {
                        if (err) throw err;

                        if (isMatch) {
                            return done(null, account);
                        } else {
                            return done(null, false, { message: 'Invalid password' });
                        }
                    });
                })
                .catch(err => console.log(err));
        })
    );
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });

    passport.deserializeUser((id, done) => {
        Account.findById(id, (err, user) => {
            done(err, user);
        });
    });
}