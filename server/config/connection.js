const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({
  path: path.resolve(__dirname, '../../.env')
});

mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/pictura', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('connected to MongoDB'));

module.exports = mongoose.connection;
