const { AuthenticationError } = require('apollo-server-express');
const { GraphQLScalarType, Kind } = require('graphql');
const { User, Picture, Order, PrintSize } = require('../models');
const { signToken } = require('../utils/auth');
const cloudinary = require('../config/cloudinary');
const path = require('path');

require("dotenv").config({
  path: path.resolve(__dirname, '../../.env')
});

const stripe = require('stripe')(process.env.STRIPE_KEY)

const resolvers = {
  Query: {
    // USERS QUERY//
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id).populate('pictures')
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      try {
        const users = await User.find();
        return users;
      } catch (error) {
        throw new Error(error);
      };
    },

    // PICTURES QUERY//
    picture: async (parent, { id }) => {
      const picture = await Picture.findOne({ _id: id });
      return picture;
    },

    pictures: async () => {
      try {
        const pictures = await Picture.find().populate('user');
        return pictures;
      } catch (error) {
        throw new Error(error);
      };
    },

    printSizes: async () => {
      try {

        const printSizes = await PrintSize.find();
        return printSizes;
      } catch (error) {
        throw new Error(error);
      };
    },

    orders: async () => {
      return await Order.find().populate('user');
    },

    ordersByStatus: async (parent, args) => {
      console.log(args)
      const params = {}
      params.status = args.status;
      console.log(await Order.find(params))
      return await Order.find(params).populate('user')
    }
  },

  Mutation: {
    // USERS MUTATION//
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
      console.log(token)
      console.log(user)
      return { token, user };
    },

    updateUser: async (parent, args, context) => {
      if (context.user) {
        return await User.findByIdAndUpdate(context.user._id, args, { new: true });
      }
      throw new AuthenticationError('Not logged in');
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });
      if (!user) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const correctPw = await user.isCorrectPassword(password);
      if (!correctPw) {
        throw new AuthenticationError('Incorrect credentials');
      }
      const token = signToken(user);
      return { token, user };
    },

    // PICTURES MUTATION//

    addPicture: async (_, args, context) => {
      // try-catch block for handling actual image upload
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      let result


      try {
        result = await cloudinary.uploader.upload(args.imageBase64, {
          upload_preset: "pictura_preset",
          folder: "customer_folder2",
        })
        console.log("uploaded to cloud")
        // create picture to database
        try {
          const picture = new Picture({
            filename: args.filename,
            contentType: args.contentType,
            imageBase64: args.imageBase64,
            user: context.user._id,
            cloud_assetId: result.asset_id,
            cloud_url: result.url,
          })
          await Picture.create(picture);
          await User.findByIdAndUpdate(context.user._id, { $push: { pictures: picture } });
          return picture;
        } catch (error) {
          console.log(error);
        }
      } catch (e) {
        //returns an error message on image upload failure.
        return `Image could not be uploaded:${e.message}`;
      }
    },

    createCheckoutSession: async (parent, { items }) => {
      let origin
      if (process.env.NODE_ENV === 'production') {
        origin = process.env.PROD_URI
      } else {
        origin = process.env.DEV_URI
      }

      // map orders for line items

      const line_items = items.map((item) => {
        const unitPrice = parseFloat(item.unitPrice).toFixed(2);
        return {
          quantity: item.quantity,
          price_data: {
            currency: 'AUD',
            unit_amount: unitPrice * 100,
            product_data: {
              name: item.filename,
              description: item.description || undefined,
              images: item.cloud_url ? [item.cloud_url] : [],
            },
          },
        };
      });

      const session = await stripe.checkout.sessions.create({
        success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${origin}/pictures?cancelled=true`,
        line_items,
        mode: "payment",
      });
      console.log('session url')
      console.log(session.url)
      return {
        sessionId: session.id,
        sessionURL: session.url,
      };
    },

    // ORDERS MUTATION//
    addOrder: async (parent, args) => {
      const order = await Order.create(args);
      console.log(args);
      return order;
    },

    updateOrderStatus: async (parent, args) => {
      
      console.log(args)
      console.log('i am here')
      return await Order.findByIdAndUpdate(args._id, { status: args.status }, { new: true });
    },

  },

  // Defining Scalar type for Date 
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom Scalar Type for Date',
    parseValue(value) {
      return new Date(value); // Value from the client
    },
    serialize(value) {
      const date = new Date(value);
      return date.toLocaleDateString() + ' - ' + date.toLocaleTimeString() // Value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(ast.value); // ast value is always in string format
      }
      return null;
    }
  })
};

module.exports = resolvers;
