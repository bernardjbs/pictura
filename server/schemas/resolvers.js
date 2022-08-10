const { AuthenticationError } = require('apollo-server-express');
const { User, Picture, Order } = require('../models');
const { signToken } = require('../utils/auth');

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
    picture: async (parent, {id}) => {
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

    // ORDERS MUTATION//
    // addOrder: async (parent, args) => {
    //   const order = await Order.create(args);
    //   console.log(args);
    //   return order;
    // }
  },
};

module.exports = resolvers;
