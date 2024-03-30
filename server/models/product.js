const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    id: { type: Number, required: true},
    name: { type: String, required: true },
    description: { type: Text, required: true },
    locationId: { type: String, required: true },
    categoryId: { type: String, required: true },
    tags: [String],
    price: { type: Number, required: true},
    createdAt: { type: Date, default: Date.now },
    quantity: { type: Number, required: true},
    availability: { type: Boolean, default: true}
  });
  
  const Product = mongoose.model('Product', ProductSchema);
  
  module.exports = Product;