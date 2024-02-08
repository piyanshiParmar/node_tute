let postModel = require('../../models/post_model');
let express = require('express');

exports.deletePost = async (req, res) => {
    let request = req.body;
    let id = request._id;
    let result = await postModel.findByIdAndDelete(id, { new: true });
    res.json({
        message: 'Post Deleted Successfully!',
        data: result
    });
};

exports.deleteComment = async (req, res) => {
    let request = req.body;
    let id = request.id;
    let uname = request.name;
    let results = await postModel.findById(id).lean();
    let comments = results.comments.filter((v) => v.comment != uname);
    let result = await postModel.findOneAndUpdate({ _id: id }, { $set: { comments: comments } });
    res.json({
        done: true
    });
};
