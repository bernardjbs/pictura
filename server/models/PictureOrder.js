const { Schema, model } = require('mongoose');

const pictureOrderSchema = new Schema({
  size: String,
  quantity: Number,
  filename: String,
  picture_url: String
});

const PictureOrder = model('pictureOrder', pictureOrderSchema);

module.exports = PictureOrder;