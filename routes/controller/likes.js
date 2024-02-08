let postModel = require('../../models/post_model');
let express = require('express');
exports.likes = async (req, res) => {
    let request = req.body;
    let result = await postModel.findOne({ _id: request._id });

    if (result) {
        let id = request._id;
        let details = output;
        let data = await postModel.findByIdAndUpdate(id, { $push: { likeID: details.id } }, { new: true });
        res.json({
            message: 'Post Details',
            data: data
        });
    } else {
        res.send('Post not found');
    }
};
