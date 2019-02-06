const book = require('../controllers/book.controller.js');
const validator = require('express-joi-validation')({});
const { bookValidation } = require('../services/validator.service.js');
const errorHandler = require('../services/errorHandler.service.js');

module.exports = app => {
    app.route('/api/book/:id')
        .get(validator.params(bookValidation.params), errorHandler(book.read))
        .put([validator.params(bookValidation.params), validator.body(bookValidation.updateData)], errorHandler(book.update))
        .delete(validator.params(bookValidation.params), errorHandler(book.delete));

    app.route('/api/book')
        .post(validator.body(bookValidation.data), errorHandler(book.create))
        .get(validator.body(bookValidation.readAll), errorHandler(book.readAll));
};
