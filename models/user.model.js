const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const user = new Schema({
    user: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('User',user);