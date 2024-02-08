let userModel = require('../../models/user_model');
let bcrypt = require('bcrypt');
let validate = require('./validation');
let express = require('express');
let jwt = require('jsonwebtoken');
exports.signUp = async (req, res) => {
    try {
        let request = await validate.validator.validateAsync(req.body);
        let existUser = await userModel.find({ id: request.id });
        let { name, id } = req.body;
        let res1 = await userModel.findOne({ name, id });
        if (existUser.length > 0) {
            jwt.sign({ res1 }, process.env.SECRET_KEY, { expiresIn: '3d' }, async (err, token) => {
                if (err) {
                    console.log(err);
                }
                let insert1 = await userModel.findOneAndUpdate(res1, { token: token });
                res.json({
                    message: 'User Already exist & token generated!',
                    data: insert1
                });
            });
        } else {
            let hashPassword = await bcrypt.hash(request.password, 10);
            let details = await userModel.create({
                id: request.id,
                name: request.name,
                email: request.email,
                password: hashPassword,
                address: request.address
            });

            // jwt.sign({ res1 }, process.env.SECRET_KEY, { expiresIn: '1d' }, async (err, token) => {
            //     if (err) {
            //         console.log(err);
            //     }
            //     let insert = await userModel.findOneAndUpdate(res1, { token: token });
            //     res.json({
            //         message: 'User created & token generated!',
            //         data: insert
            //     });
            // });
            res.json({
                message: 'User created & token generated!',
                data: details
            });
        }
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};
