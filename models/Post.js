const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    name: {
        type: String,
        required: true,
    },
    heading: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    likes: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'user' },
        },
    ],
    saved: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'user' },
        },
    ],
    savedPosts: [
        {
            user: { type: Schema.Types.ObjectId, ref: 'user' },
            postId: String,
        },
    ],
});

module.exports = Post = mongoose.model('post', postSchema);
