const mongoose = require("mongoose");
const { Schema } = mongoose;

const reviewSchema = new Schema({
    email: {
        type: String,
        required: true,
    },
    movieid: {
        type: String,
        required: true
    },
    rating: {
        type: String,
        required: true
    },
    review: {
        type: String,
        required: true
    },
    reviewedAt: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('review', reviewSchema);