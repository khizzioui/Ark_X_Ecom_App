const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
    name: { type: String, required: true },
    location : { 
        type : {
            type: String,
            enum:['point'],
            default: "point"
        },
        coordinates:{
            type:[Number],
            required:true
        },
     },
    userId: { 
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
     },
    primary: { type: Boolean, default: false }
    
  });
  locationSchema.index({location:"2dsphere"});
  
  const Location = mongoose.model('location', locationSchema);
  
  module.exports = Location;