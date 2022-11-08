const { Schema, model } = require("mongoose");

const reviewSchema = new Schema(
  {
    title: String,
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    comicId: {type: Schema.Types.ObjectId, ref: 'Comic'},
    content: String,
    rating: String,
  }
);

const Review = model("Review", reviewSchema);

module.exports = Review;
