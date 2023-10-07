const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/user');
const dotenv = require('dotenv'); 

dotenv.config(); 

const router = express.Router();

router.get('/github', passport.authenticate('github', { scope: ['user:email'] }));


router.get('/github/callback',
  (req, res, next) => {
    console.log('Callback called');
    next();
  },
  passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/api-docs/');
  }
);

// Logout route
router.get('/logout', (req, res) => {
  req.logout((err) => {
    if (err) {
      console.error('Error logging out:', err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
    res.send('<h2>Logout successful</h2>..<br><a href="/">Go to Homepage</a>'); 
  });
});
module.exports = router;
