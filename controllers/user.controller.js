const User = require('../models/author.model.js');
const Book = require('../models/book.model.js');

exports.create = (request, response) => {
    const {books} = request.body;

    return Book.count({
        _id: {
            $in: books
        }
    }).then(result => {
        return result === books.length ?
            User.create(request.body).then(result => response.status(201).send(result)):
            response.status(400).send('Some author doesnt exist');
    })
};

exports.read = (request, response) => {
    const {id} = request.params;

    return User
        .findOne({ _id: id })
        .populate('book')
        .then(user => {
            const message = user ?
                user:
                'There is no user with such id';
            const status = user ? 200 : 400;

            return response.status(status).send(message);
        })
};

exports.update = async (request, response) => {
    const {books} = request.body;
    const existedBooks = await Book.count({ _id: { $in: books}});

    return existedBooks !== books.length ?
        response.status(400).send('Some author books doesnt exist.') :
        User.findOneAndUpdate({_id: id}, { $set: request.body })
            .populate('book')
            .then(user => {
               const message = user ?
                   user :
                   'There is no user with such id';
               const status = user ? 200 : 400;

               return response.status(status).send(message);
            })
};

exports.delete = (request, response) => {
    const {id} = request.params;

    return User
        .deleteOne({ _id: id })
        .then(result => {
            const message = result.deletedCount ?
                `User with id - ${id} has been deleted.`:
                'There is no user with this id.';
            const status = result ? 200 : 400;

            return response.status(status).send(message);
        });
};

