const mongoose = require('mongoose');
require('dotenv').config();

const { MONGODB_URI } = process.env;

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, dbName: 'newcontactsDB' })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Connection to MongoDB failed:', error));

module.exports = mongoose;
