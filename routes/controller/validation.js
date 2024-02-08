let joi = require('joi');
exports.validator = joi
    .object({
        password: joi.string().pattern(new RegExp('[a-zA-Z0-9!@$&]{3,10}')).required(),
        email: joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com'] } })
            .required()
    })
    .unknown(true);
