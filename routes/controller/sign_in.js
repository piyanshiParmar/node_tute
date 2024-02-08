let userModel = require('../../models/user_model');
let bcrypt = require('bcrypt');
let express = require('express');
let jwt = require('jsonwebtoken');

exports.verifytoken = async (req, res, next) => {
    let token = req.header('Authorization');
    try {
        if (!token) {
            res.status(401).json({
                message: 'Access Denied!'
            });
        } else {
            token = token.split(' ')[1];
            let decode = jwt.verify(token, process.env.SECRET_KEY);
            output = decode.res1;
            next();
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.signIn = async (req, res) => {
    try {
        let request = req.body;
        let user = await userModel.findOne({ name: request.name });
        if (user) {
            bcrypt.compare(request.password, user.password, (err, result) => {
                if (err) {
                    res.send(err.message);
                }
                if (result) {
                    res.json({
                        message: 'User Verified!',
                        message2: 'Token Information: ',
                        data: {
                            name: output.name,
                            id: output.id
                        }
                    });
                } else {
                    res.json({ message: 'Invalid Password!' });
                }
            });
        } else {
            res.json({ message: 'User not found!' });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
