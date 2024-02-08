let mongoose = require('mongoose');
let schema = new mongoose.Schema(
    {
        id: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        address: {
            type: String,
            required: true
        },
        token: String
    },
    { timestamps: true }
);
module.exports = mongoose.model('user_signUp', schema);
