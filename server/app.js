const express = require('express');
const mongoose = require('mongoose') ;





app = express();

// database connection
const dbURI = 'mongodb+srv://E-commerce-Project:arkx123@adnane-cluster.2aph9sv.mongodb.net/' ;
mongoose. connect(dbURI, { useUnifiedTopology: true } )
.then((result) => app.listen(3000))
. catch((err) => console.log(err));



// routes
app.get('/' ,(req, res) => {
    res.send("/ route")
});