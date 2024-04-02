const express = require('express');
const mongoose = require('mongoose');
const superadminRoutes = require('./routes/superadmin');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/superadminDB', {
 useNewUrlParser: true,
 useUnifiedTopology: true,
});

// Routes
app.use('/superadmin', superadminRoutes);

// Start the server
app.listen(port, () => {
 console.log(`Server is running on port ${port}`);
});


