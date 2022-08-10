const { Schema, model } = require('mongoose');

// Image uploads
const pictureSchema = new Schema({
  filename: {
    type: String,
    required: true
  },
  contentType: {
    type: String,
    required: true
  },
  imageBase64: {
    type: String,
    required: true
  }, 
  filepath: {
    type: String, 
    required: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'user',
  },
  orders: [
    {
      type: Schema.Types.ObjectId,
      ref: 'order',
    },
  ]
});

const Picture = model('picture', pictureSchema);

module.exports = Picture;