const Author = require('../models/author.model.js');
const Book = require('../models/book.model.js');
const mongoose = require('mongoose');

exports.create = (request, response) => {
    const {author} = request.body;

    return Author.create({
        author: author
    }).then(result => response.status(201).send(result));
};

exports.read = (request, response) => {
    const {id} = request.params;

    return Author
        .findById(id)
        .then(author => {
            const message = author ?
                author:
                'There is no author with such name';
            const status = author ? 200 : 400;

            return response.status(status).send(message);
    })
};

exports.update = (request, response) => {
    const { id } = request.params;
    const { author } = request.body;

    return Author
        .findOneAndUpdate({ _id: id }, {author: author})
        .then(result => {
        const message = result ?
            `Author ${author} has been updated`:
            'There is no author with such name';
        const status = result ? 200 : 400;

        return response.status(status).send(message);
    })
};

exports.delete = (request, response) => {
    const { id } = request.params;

    return Book.aggregate([
        { $match: { author: mongoose.Types.ObjectId(id)}},
        { $group: { _id: null, count: { $sum: 1}}}
        ]).then(result => {
            const {count} = result[0];
            return count ?
                null :
                Author.deleteOne({_id: id});
        }).then(result => {
            const message = result ?
                `Author with id - ${id} has been deleted`:
                'You cant delete this author, becouse he has books in database';
            const status = result ? 200 : 400;

            return response.status(status).send(message);
    });
};

