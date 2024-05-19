// Load environment variables from .env file
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require("cors");
const searchRoute =require('./Routes/searchRoutes')
const productRoutes = require('./Routes/productRoutes');
const userRoutes = require('./Routes/userRoutes');
const adminroute = require('./Routes/adminRoutes');
const multipart = require('connect-multiparty')

const auth = require('./Middlewares/authMiddleware');
const cookieParser = require('cookie-parser');
const app = express();

app.use(multipart())


app.use(express.json());
// app.use(express.urlencoded({extended: true}))

app.use(cors(
    {
      origin: 'http://localhost:3000',
      credentials: true,
    }
  ));
app.use(cookieParser());

// routes
app.get('/' ,(req, res) => {
    res.send("/ route")
});

app.use("/api", adminroute);
app.use("/api",userRoutes);
app.use("/api",searchRoute);
app.use("/api",productRoutes);



// database connection
mongoose.connect(process.env.DB_URL, { } )
.then((result) => {
    app.listen(process.env.PORT || 3000)
})
.catch((err) => console.log(err));

