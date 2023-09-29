const mongoose = require('../db/connection');

const itemSchema = new mongoose.Schema({
  name: String,
  quantity: String
}, { collection: 'newcontacts' }); 

const Item = mongoose.model('Item', itemSchema);

module.exports = Item;
