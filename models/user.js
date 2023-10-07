const mongoose = require('mongoose');

// Define user schema
const userSchema = new mongoose.Schema({
  githubId: String,
  username: String,
  displayName: String
  
});

const User = mongoose.model('User', userSchema);

module.exports = User;
