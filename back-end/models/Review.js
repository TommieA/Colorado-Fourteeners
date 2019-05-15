const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    reviewName: {
        type: String,
        required: true,
        unique: true
    },
    peakName: {
        type: String,
        required: true
    },
    review: String
})

const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;