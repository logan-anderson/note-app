const express = require('express');

const router = express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

mongoose.set('useFindAndModify', false);

// const Note = mongoose.model('Note');
// const NoteBackup = mongoose.model("NoteBackup");
const Account = require('../models/Account');

router.get('/', (req, res, render) => {
  res.render('pages/account', { user: req.user });
});

// if the request ./account/login
router.get('/login', (req, res, next) => {
  if (typeof req.user === 'undefined') {
    res.render('pages/login');
  } else {
    req.flash('error_msg', 'Please logout before logging into a new account');
    res.redirect('/home');
  }
});

// if the request ./account/register
router.get('/register', (req, res, next) => {
  console.log('got here');

  res.render('pages/register', { user: req.user });
});

// Register post
router.post('/register', (req, res, next) => {
  console.log(req.body);
  const {
    name, email, password, password2,
  } = req.body;
  const errors = [];

  // all Fields there?
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill in all fields' });
  }

  // passwords match?
  if (password !== password2) {
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
    });
  } else {
    // passed validation
    console.log(email);
    Account.findOne({ email })
      .then((account) => {
        console.log(account);
        if (account) {
          // email is being useed
          errors.push({ msg: 'Opps... Looks like there is an account all ready created with that email' });
          console.log(errors);
          res.render('pages/register', {
            errors,
            name,
            email,
            password,
            password2,
          });
        } else {
          const newAccount = new Account({
            name,
            email,
            password,
          });
          bcrypt.genSalt(10, (err, salt) => bcrypt.hash(newAccount.password, salt,
            (crypErr, hash) => {
              newAccount.password = hash;
              newAccount.save()
                .then((savedAccount) => {
                  req.flash('success_msg', 'You are now registered and can log in');
                  res.redirect('/account/login');
                })
                .catch((savedAccountErr) => console.log(savedAccountErr));
            }));
        }
      });
  }
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/home',
    failureRedirect: '/account/login',
    failureFlash: true,
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res, next) => {
  req.logOut();
  req.flash('sucess_msg', 'you are logged out');
  res.redirect('/account/login');
});


module.exports = router;
