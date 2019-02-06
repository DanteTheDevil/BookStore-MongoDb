const Author = require('../models/author.model.js');

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

    return Author
        .deleteOne({ _id: id })
        .then(result =>{
            const status = result.deletedCount ? 200 : 404;
            const message = result.deletedCount ?
                `Author with id - ${id} has been deleted.`:
                `There is no author with id - ${id}`;

            return response.status(status).send(message);
        });
};
