const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const book = new Schema({
    name: {
        type: String
    },
    author: {
        type: Schema.Types.ObjectId,
        ref: 'Author',
        required: true
    },
    year: {
        type: Number
    },
    description: {
        type: String
    }
});

module.exports = mongoose.model('Book', book);