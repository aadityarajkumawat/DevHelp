const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const savedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    savedPosts: [
        {
            savedID: {
                type: String,
            },
            heading: {
                type: String,
            },
            content: {
                type: String,
            },
            image: {
                type: String,
            },
        },
    ],
});

module.exports = Saved = mongoose.model('saved', savedSchema);
