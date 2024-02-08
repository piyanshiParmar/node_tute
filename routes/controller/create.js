let postModel = require('../../models/post_model');
let express = require('express');
let upload = require('./file');

exports.up = upload.single('myfile');

exports.post = async (req, res) => {
    let request = req.body;
    let details = output;
    let request2 = req.file ? req.file.filename : null;
    let message;
    if (request2) {
        message = request2;
    } else {
        message = request.message;
    }
    let createPost = await postModel.create({
        message: message,
        userDetails: { name: details.name, email: details.email },
        likeID: request.likeID,
        comments: request.comments,
        isVisibility: request.isVisibility
    });
    res.json({
        message: ' Your Post Created!',
        data: createPost
    });
};
