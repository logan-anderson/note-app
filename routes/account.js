const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

mongoose.set('useFindAndModify', false);

const Note = mongoose.model('Note');
const NoteBackup = mongoose.model("NoteBackup");
const Account = require('../models/Account');

router.get('/', (req, res, render) => {
    console.log("we here");
    res.render('pages/account');
})

//if the request ./account/login
router.get('/login', (req, res, next) => {
    res.render('pages/login');
});

//if the request ./account/register
router.get('/register', (req, res, next) => {
    console.log("got here");

    res.render('pages/register', {
        success_msg: false,
        error_msg: false,
        error: '',
    });
});

// Register post 
router.post('/register', (req, res, next) => {
    console.log(req.body);
    const { name, email, password, password2, } = req.body;
    let errors = [];

    // all Fields there?
    if (!name || !email || !password || !password2) {
        errors.push({ msg: 'Please fill in all fields' });
    }

    // passwords match? 
    if (password != password2) {
        errors.push({ msg: 'Passwords do not match' });
    }

    // check password length? (maybe later) 

    if (errors.length > 0) {
        res.render('pages/register', {
            errors,
            name,
            email,
            password,
            password2,
            password2,
            // success_msg: false,
            // error_msg: false,
            // error: '',
        });
    } else {
        // passed validation
        console.log(email);
        Account.findOne({ email: email })
            .then(account => {
                console.log(account)
                if (account) {
                    // email is being useed
                    errors.push({msg: 'Opps... Looks like there is an account all ready created with that email'});
                    console.log(errors);
                    res.render('pages/register', {
                        errors,
                        name,
                        email,
                        password,
                        password2,
                        // success_msg: false,
                        // error_msg: false,
                        // error: 'Email already in use',
                    });
                } else {
                    const newAccount = new Account({
                        name,
                        email,
                        password,
                    });
                    bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newAccount.password, salt, 
                        (err, hash) => {
                            newAccount.password = hash;
                            newAccount.save()
                            .then((account)=>{
                                console.log('this is the account saved');
                                console.log(account);
                                req.flash('success_msg', 'You are now registered and can log in');
                                res.redirect('/account/login');
                            })
                            .catch(err=>console.log(err))        
                    }));

                    // res.redirect('/account/login');
                }
            });
    }

    // res.redirect('/account/login');
});

// Login
router.post('/login', (req, res, next)=>{
    passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/account/login',
        failureFlash: true,
    })(req, res, next)
});

// Logout
router.get('/logout', (req, res, next)=>{
    req.logOut();
    req.flash('sucess_msg', 'you are logged out');
    res.redirect('/account/login');
});


module.exports = router;