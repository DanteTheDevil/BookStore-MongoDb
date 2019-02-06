const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const author = new Schema({
    author: {
        type: String,
        required: true,
        unique: true
    }
});

module.exports = mongoose.model('Author', author);