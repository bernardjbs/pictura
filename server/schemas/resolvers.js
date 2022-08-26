const { AuthenticationError } = require('apollo-server-express');
const { User, Picture, Order } = require('../models');
const { signToken } = require('../utils/auth');
const cloudinary = require('../config/cloudinary');
require('dotenv').config();
const resolvers = {
  Query: {
    // USERS QUERY//
    user: async (parent, args, context) => {
      if (context.user) {
        const user = await User.findById(context.user._id)
        return user;
      }
      throw new AuthenticationError('Not logged in');
    },

    users: async () => {
      try {
        const users = await User.find();
        console.log(users)
        return users;
      } catch (error) {
        throw new Error(error);
      };
    },

    // PICTURES QUERY//
    picture: async (parent, { id }) => {
      const picture = await Picture.findById(id).populate('user');
      console.log(id);
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
  },

  Mutation: {
    // USERS MUTATION//
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);
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
    addPicture: async (parent, args) => {
      const picture = await Picture.create(args);
      return picture;
    },

    uploadPhoto: async (_, { photo }) => {
      // try-catch block for handling actual image upload
      cloudinary.config({
        cloud_name: process.env.CLOUDINARY_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      let result
      try {
        result = await cloudinary.uploader.upload(photo, { 
          upload_preset: "pictura_preset", 
          folder: "customer_folder2",
         })
        
        console.log('try 7')
        
        // const result = await cloudinary.v2.uploader.upload(photo, {
        //   allowed_formats: ["jpg", "png"],
        //   //generates a new id for each uploaded image
        //   public_id: "",
        //   /*creates a folder called "your_folder_name" where images will be stored.
        //    */
        //   folder: "customer_folder",
        // });
      } catch (e) {
        //returns an error message on image upload failure.
        return `Image could not be uploaded:${e.message}`;
      }
      /*returns uploaded photo url if successful `result.url`.
      if we were going to store image name in database,this
      */
      console.log(result);
      return `Successful-Photo URL: ${result.url}`;

    },
    // ORDERS MUTATION//
    // addOrder: async (parent, args) => {
    //   const order = await Order.create(args);
    //   console.log(args);
    //   return order;
    // }
  },
};

module.exports = resolvers;
