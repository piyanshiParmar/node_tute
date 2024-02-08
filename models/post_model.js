let mongoose = require('mongoose');
let commentsSchema = new mongoose.Schema(
    {
        user: String,
        comment: String
    },
    { _id: false }
);
let schema1 = new mongoose.Schema({
    message: mongoose.Schema.Types.Mixed,
    userDetails: {
        name: String,
        email: String
    },
    likeID: Number,
    comments: [commentsSchema],
    isVisibility: Boolean
});

module.exports = mongoose.model('user_posts', schema1);
