const Book = require('../models/book.model.js');
const Author = require('../models/author.model.js');

exports.create = (request, response) => {
    const {name, author, year, description} = request.body;

    return Author
        .findOne({ author: author })
        .then(result => {
            return result ?
            result :
            Author.create({ author: author })
        })
        .then(result => {
        return Book.create({
            name: name,
            year: year,
            description: description,
            author: result._id
        })
    }).then(result => {
        return response.status(201).send(result);
    });

};

exports.read = (request, response) => {
    const {id} = request.params;

    return Book
        .findById(id)
        .populate('author')
        .then(result => {
            const message = result ?
                result :
                'There is no book with this id.';
            const status = result ? 200 : 404;

            return response.status(status).send(message);
        })
};

exports.readAll = (request, response) => {
    const {name} = request.body;
    const {page} = request.query;

    return Book
        .find({ name: name })
        .populate('author')
        .skip((page - 1) * 5)
        .limit(5)
        .then(result => response.status(200).send(result))
};

exports.update = (request, response) => {
    const {id} = request.params;
    const data = request.body;

    return Book
        .findOneAndUpdate({ _id: id }, {$set: data})
        .then(result => {
            const message = result ?
                `Book with id ${id} has been updated`:
                `There is no book with this id`;
            const status = result ? 200 : 404;

            return response.status(status).send(message);
        })
};
exports.delete = (request, response) => {
    const {id} = request.params;

    return Book
        .deleteOne({ _id: id })
        .then(result =>{
            console.log(result);
            const status = result.deletedCount ? 200 : 404;
            const message = result.deletedCount ?
                `Book with id - ${id} has been deleted.`:
                `There is no book with id - ${id}`;

            return response.status(status).send(message);
        });
};
