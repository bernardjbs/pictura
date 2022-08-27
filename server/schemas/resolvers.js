const { AuthenticationError } = require('apollo-server-express');
const { User, Picture, Order } = require('../models');
const { signToken } = require('../utils/auth');
const cloudinary = require('../config/cloudinary');
require('dotenv').config();
const resolvers = {
  Query: {
    // USERS QUERY//
    user: async (parent, args, context) => {
      console.log("Checking user")
      if (context.user) {
        const user = await User.findById(context.user._id).populate('pictures')
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

    addPicture: async (_, args, context) => {
      console.log
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



      // try {
      //   result = await cloudinary.uploader.upload(args.imageBase64, {
      //     upload_preset: "pictura_preset",
      //     folder: "customer_folder2",
      //   })
      //   console.log("uploaded to cloud")
      //   // create picture to database
      //   try {
      //     const picture = await Picture.create({
      //       filename: args.filename,
      //       contentType: args.contentType,
      //       imageBase64: args.imageBase64,
      //       user: context.user._id,
      //       cloud_assetId: result.asset_id,
      //       cloud_url: result.url,
      //     })
      //     console.log(picture);
      //     return picture;
      //   } catch (error) {
      //     console.log(error);
      //   }
      // } catch (e) {
      //   //returns an error message on image upload failure.
      //   return `Image could not be uploaded:${e.message}`;
      // }

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
