// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
//const searchRoute =require('./Routes/searchRoutes')
const productRoutes = require('./routes/productRoutes');







app = express();
app.use(express.json());


app.use(cors());

// routes
app.get('/' ,(req, res) => {
    res.send("/ route")
});




//app.use("/api",searchRoute);


// database connection
mongoose.connect(process.env.DB_URL, { } )
.then((result) => {
    app.listen(process.env.PORT || 3000)
})
.catch((err) => console.log(err));

app.use("/product", productRoutes);