const { User, Comment, Drink } = require('../models');
const { AuthenticationError } = require('apollo-server-express');
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async(parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({})
          .select('-__v -password')
          .populate('comments')
          .populate('friends')
          .populate('authoredDrinks');

        return userData;
      }

      throw new AuthenticationError('Not logged in');
    },
    comments: async (parent, { drinkId }) => {
      const params = drinkId ? { drinkId } : {};
      return Comment.find(params).sort({ createdAt: -1 });
    },
    comment: async (parent, { _id }) => {
      return Comment.findOne({ _id });
    },
    users: async () => {
      return User.find()
        .select('-__v -password')
        .populate('friends')
        .populate('comments')
        .populate('authoredDrinks');
    },
    user: async(parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('comments')
        .populate('authoredDrinks');
    },
    drinks: async () => {
      return Drink.find()
        .populate('comments')
        .sort( { createdAt: -1 });
    },
    drink: async (parent, { _id }) => {
      return Drink.findOne({ _id }).populate('comments');
    },
    drinkSearch: async (parent, { nameInput }) => {
      const re = new RegExp(`\\b${nameInput}`, 'gi');
      return Drink.find({ name: re });
    }
  },
  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
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
    addDrink: async (parent, { newDrink }, context) => {

      // add an original recipe by the user
      if (context.user) {

        // TODO- validate the thumbnail here and use default image if not a good link
        if (newDrink.thumbnail === "") {
          newDrink.thumbnail = "https://images.rawpixel.com/image_800/cHJpdmF0ZS9zdGF0aWMvaW1hZ2Uvd2Vic2l0ZS8yMDIyLTA0L2xyL2ZyYm90dGxlc19iZXZlcmFnZXNfYWxjb2hvbF9kcmluay1pbWFnZS1rejJlNGdvMS5qcGc.jpg?s=nLQBEoCG8tN3jko2Aw-ysfbjHL1TUe1o3jVRGaVxSvc";
        }

        const newdrink = await Drink.create({ ...newDrink, username: context.user.username });
      
        const userdata = await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { authoredDrinks: newdrink } },
          { new: true }
        )

        console.log("newdrink", newdrink)
        return newdrink;
      }

      throw new AuthenticationError('You need to be logged in!');
    },
    addComment: async (parent, { drinkId, text }, context) => {
      if (context.user) {
        const comment = await Comment.create({ text, username: context.user.username });

        await Drink.findByIdAndUpdate(
          { _id: drinkId },
          { $push: { comments: comment._id } },
          { new: true }
        );
    
        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $push: { comments: comment._id } },
          { new: true }
        );
    
        return comment;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    addReaction: async (parent, { commentId, reactionBody }, context) => {
      if (context.user) {
        const updatedComment = await Comment.findOneAndUpdate(
          { _id: commentId },
          { $push: { reactions: { reactionBody, username: context.user.username } } },
          { new: true, runValidators: true }
        );
    
        return updatedComment;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    addFriend: async (parent, { friendId }, context) => {
      if (context.user) {
        const updatedUser = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { friends: friendId } },
          { new: true }
        ).populate('friends');
    
        return updatedUser;
      }
    
      throw new AuthenticationError('You need to be logged in!');
    },
    deleteDrink: async (parent, { drinkId }, context) => {
      const deletedDrink = await Drink.findOneAndDelete(
        { _id: drinkId }
      )

      return deletedDrink;
    }
  }
};

module.exports = resolvers;