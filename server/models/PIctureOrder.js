const { Schema, model } = require('mongoose');

const pictureOrderSchema = new Schema({
  size: {
    type: String, 
    required: true,
  }, 
  quantity: {
    type: Number, 
    required: true,
  }, 
  picture: {
    type: Schema.Types.ObjectId, 
    ref: 'picture',
    required: true,
  },
});

const PictureOrder = model('pictureOrder', pictureOrderSchema);

module.exports = PictureOrder;