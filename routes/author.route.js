const author = require('../controllers/author.controller.js');
const validator = require('express-joi-validation')({});
const { authorValidation } = require('../services/validator.service.js');
const errorHandler = require('../services/errorHandler.service.js');

module.exports = app => {
    app.route('/api/author/:id')
        .get(validator.params(authorValidation.params), errorHandler(author.read))
        .put([validator.params(authorValidation.params), validator.body(authorValidation.data)], errorHandler(author.update))
        .delete(validator.params(authorValidation.params), errorHandler(author.delete));

    app.route('/api/author')
        .post(validator.body(authorValidation.data), errorHandler(author.create));
};
