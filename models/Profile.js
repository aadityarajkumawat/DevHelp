const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const profileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
    },
    country: {
        type: String,
        required: true,
    },
    bio: {
        type: String,
    },
});

module.exports = Profile = mongoose.model('profile', profileSchema);
