const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const savedSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    savedPosts: {
        type: [String],
    },
});

module.exports = Saved = mongoose.model('saved', savedSchema);
