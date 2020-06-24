const express = require('express');
const connectDB = require('./config/db');

// Initialize App
const app = express();

// Connect Database
connectDB();

// Initialize Express middleware
app.use(express.json({ extended: false }));

// Routes
app.use('/api/user', require('./routes/user'));
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on prt ${PORT}`));
