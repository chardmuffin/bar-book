const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const cocktailSchema = new Schema(
  {
    alternateId: {
      type: String
    },
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 40
    },
    thumbnail: {
      type: String
    },
    instructions: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 280
    },
    ingredients: {
      type: [String],
      required: true
    },
    measurements: {
      type: [String],
      required: true
    },
    glass: {
      type: String,
      required: false
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: timestamp => dateFormat(timestamp)
    },
    username: {
      type: String,
      required: false
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }
    ],
  },
  {
    toJSON: {
      getters: true
    }
  }
);

cocktailSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

const Cocktail = model('Cocktail', cocktailSchema);

module.exports = Cocktail;
