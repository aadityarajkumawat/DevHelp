const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        mongoose.connect(db, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        });

        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        console.log('Server Error!');
    }
};

module.exports = connectDB;
