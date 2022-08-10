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
          .populate('savedDrinks')
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
        .populate('savedDrinks')
        .populate('authoredDrinks');
    },
    user: async(parent, { username }) => {
      return User.findOne({ username })
        .select('-__v -password')
        .populate('friends')
        .populate('comments')
        .populate('savedDrinks')
        .populate('authoredDrinks');
    },
    drinks: async () => {
      return Drink.find()
        .populate('comments');
    },
    drink: async (parent, { _id }) => {
      return Drink.findOne({ _id }).populate('comments');
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
    addDrink: async (parent, { alternateId, ...args }, context) => {

      let newdrink;
      //if (context.user) {

        //if this drink is from the API (has an alternateId), a user didn't create it
        if (alternateId) {
          newdrink = await Drink.create({ ...args, alternateId: alternateId, username: "TheCocktailDB.com" });
        } else { //else it is an original recipe by the user
          newdrink = await Drink.create({ ...args, username: context.user.username });
        }
        

        await User.findByIdAndUpdate(
          { _id: context.user._id },
          { $addToSet: { authoredDrinks: newdrink._id } },
          { new: true }
        )

        return newdrink;
      //}

      //throw new AuthenticationError('You need to be logged in!');
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
    }
  }
};

module.exports = resolvers;