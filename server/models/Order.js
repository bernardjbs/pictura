const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    pictureOrders: [{
      size: String,
      quantity: Number,
      filename: String,
      cloud_url: String
    }],
    //status: Open, Printing, Shipped,
    status: {
      type: String,
    },
  },
  {
    timestamps: true,
  },
);

// Initialise Order model
const Order = model('order', orderSchema);

module.exports = Order;