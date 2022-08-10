const { Schema, model } = require('mongoose');

const orderSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    pictureOrders: [
      {
        type: Schema.Types.ObjectId,
        ref: 'pictureOrder',
      }
    ],
    //status: Open, Complete, Delivered, In Progress
    status: {
      type: String,
    },
    note: {
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