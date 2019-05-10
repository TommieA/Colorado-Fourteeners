const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
    reviewName: {
        type: String,
        required: true,
        unique: true
    },
    mountainName: {
        type: String,
        required: true
    },
    review: String
})

const User = mongoose.model("Review", reviewSchema);

module.exports = User;