let postModel = require('../../models/post_model');
let express = require('express');
let upload = require('./file');
exports.update = async (req, res) => {
    let request = req.body;
    let result = await postModel.findOne({ _id: request._id });

    if (result) {
        let details = output;
        let data = await postModel.findOneAndUpdate(
            { _id: request._id },
            { $push: { comments: { user: details.name, comment: request.comment } } },
            { new: true }
        );
        res.json({
            message: 'Post Details',
            data: data
        });
    } else {
        res.send('Post not found');
    }
};

// To update the post that is message field:
exports.updatePost = async (req, res) => {
    let request = req.body;
    let id = request._id;
    let request2 = req.file ? req.file.filename : null;
    let message;
    if (request2) {
        message = request2;
    } else {
        message = request.message;
    }
    let result = await postModel.findByIdAndUpdate(id, { message: message }, { new: true });
    res.send(result);
};
