const Joi = require("joi")
const userValidationScehma = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string()
        .min(8)
        .pattern(new RegExp('(?=.*[A-Z])'))
        .message('Password must contain at least one uppercase letter')
        .pattern(new RegExp('(?=.*[0-9])'))
        .message('Password must contain at least one number')
        .pattern(new RegExp('(?=.*[!@#$%^&*])'))
        .message('Password must contain at least one special character')
        .required()
        .messages({
            'string.min': 'Password must be at least 8 characters long',
            'string.pattern.base': 'Password must meet complexity requirements',
            'any.required': 'Password is required'
        }),
})

module.exports = userValidationScehma