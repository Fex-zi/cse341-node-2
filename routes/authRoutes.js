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
    res.status(200).json({ message: 'Logout successful' }); // Respond with success message
  });
});



// Configure GitHub authentication strategy
passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.GITHUB_CALLBACK_URL
}, async (accessToken, refreshToken, profile, done) => {
  try {
    // Check if the user exists in the database
    const existingUser = await User.findOne({ githubId: profile.id });

    if (existingUser) {
      return done(null, existingUser);
    }

    const newUser = new User({
      githubId: profile.id,
      username: profile.username,
      displayName: profile.displayName,
     
    });

    await newUser.save();
    return done(null, newUser);
  } catch (error) {
    return done(error, null);
  }
}));

module.exports = router;
