const mongoose = require('mongoose');

const schema = mongoose.Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    history: [
        {
            sender: String,
            message: String,
        }
    ],
    temperature: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Topic', schema);