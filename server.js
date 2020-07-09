const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

// Initialize App
const app = express();

// Connect Database
connectDB();

// Initialize Express middleware
app.use(express.json({ extended: false }));
app.use('/uploads', express.static('uploads'));

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/post', require('./routes/post'));
app.use('/api/save', require('./routes/saved'));
app.use('/api/upload', require('./routes/upload'));

// Server static assets
if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on prt ${PORT}`));
