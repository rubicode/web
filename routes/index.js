var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;

module.exports = function (db) {

  const User = db.collection('users');

  router.get('/', function (req, res, next) {
    res.render('auth/login', {
      failedMessage: req.flash('failedMessage'),
      successMessage: req.flash('successMessage')
    });
  });

  router.post('/login', async function (req, res, next) {
    try {
      const { email, password } = req.body
      const user = await User.findOne({ email })
      if (!user) throw `user with email ${email} doesn't exist`
      if (!bcrypt.compareSync(password, user.password)) throw `password is wrong`
      req.session.user = { _id: user._id, email: user.email }
      res.redirect('/todos')
    } catch (e) {
      req.flash('failedMessage', e)
      res.redirect('/')
    }
  });

  router.get('/register', function (req, res, next) {
    res.render('auth/register', {
      failedMessage: req.flash('failedMessage'),
      successMessage: req.flash('successMessage')
    });
  });

  router.post('/register', async function (req, res, next) {
    try {
      const { email, password, retypepassword } = req.body
      if (password !== retypepassword) throw `password doesn't match`
      const user = await User.findOne({ email })
      if (user) throw `user with email ${email} already registered`
      const hash = bcrypt.hashSync(password, saltRounds);
      await User.insertOne({ email, password: hash })
      req.flash('successMessage', 'akun anda berhasil dibuat silahkan login di sini')
      res.redirect('/')
    } catch (e) {
      req.flash('failedMessage', e)
      res.redirect('/register')
    }
  });

  router.get('/logout', function (req, res, next) {
    req.session.destroy(function (err) {
      res.redirect('/')
    })
  });

  return router;
}
