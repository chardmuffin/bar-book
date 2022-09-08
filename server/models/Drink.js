const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const drinkSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 40
    },
    thumbnail: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 800
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
    isVariation: {
      type: Boolean,
      default: false,
      required: true
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

drinkSchema.virtual('commentCount').get(function() {
  return this.comments.length;
});

drinkSchema.index( { name: "text" } )

const Drink = model('Drink', drinkSchema);

module.exports = Drink;
