const Joi = require('joi');

const bookValidation = {
    params: Joi.object({
        id: Joi.string().required()
    }),
    data: Joi.object({
        name: Joi.string().required(),
        year: Joi.number().integer().max(new Date().getFullYear()).required(),
        description: Joi.string().trim().required(),
        author: Joi.string().required()
    }),
    readAll: Joi.object({
        name: Joi.string().required()
    }),
    updateData: Joi.object({
        name: Joi.string().required(),
        year: Joi.number().integer().max(new Date().getFullYear()).required(),
        description: Joi.string().trim().required()
    })
};

const authorValidation = {
    params: Joi.object({
        id: Joi.string().required()
    }),
    data: Joi.object({
        author: Joi.string().required()
    })
};

const userValidation = {
    user: Joi.object({
        user: Joi.string().required()
    }),
    book: Joi.object({
        user: Joi.string().required(),
        name: Joi.string().required(),
        author: Joi.string().required()
    })
};

module.exports = {
    bookValidation,
    authorValidation,
    userValidation
};
