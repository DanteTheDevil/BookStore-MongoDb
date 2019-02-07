const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    user: {
        type: String,
        required: true
    },
    books: [{
        type: Schema.Types.ObjectId,
        ref: 'Book'
    }]
});

module.exports = mongoose.model('User',user);