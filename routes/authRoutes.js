// routes/authRoutes.js

const express = require('express');
const passport = require('passport');
const router = express.Router();

// GitHub authentication route
router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));

// GitHub authentication callback route
router.get('/github/callback',
  (req, res, next) => {
    console.log('Callback called');
    next();
  },
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);


// Logout route
router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});


module.exports = router;
