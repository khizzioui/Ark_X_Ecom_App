// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose') ;






app = express();

// database connection
const DB_URL = 'mongodb+srv://E-commerce-Project:arkx123@adnane-cluster.2aph9sv.mongodb.net/' ;
mongoose. connect(process.env.DB_URL, { useUnifiedTopology: true } )
.then((result) => app.listen(process.env.PORT || 3000))
.catch((err) => console.log(err));



// routes
app.get('/' ,(req, res) => {
    res.send("/ route")
});