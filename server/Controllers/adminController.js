const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const keys = require('../config/keys');
const {adminService} = require('../services/adminService');


// Function to register a new superadmin
const registerSuperadmin = async (req, res) => {
    const data = req.body;

   const response = await adminService.adminRegister(data) 
   if (response.error && response.error == "User with this username already exist") 
   return res.status(409).send ({error: 'admin already in use'}) ;
   if (response.error && response.error == 'Internal server error') 
   return res.status(500).send ({error: 'Server error'}) ;
  return  res.status(201).send({message:'Admin registered successfully',admin : response.admin});
};


// Function to log in a superadmin
const loginSuperadmin = async (req, res) => {
  const data = req.body;

  const response = await adminService.adminLogin(data);
  if (response.error) {
      return res.status(400).json({ error: response.error });
  }
  res.cookie('token', response.token, { httpOnly: true, maxAge: 24 * 60 * 60 * 1000 }).status(200).json({ message: response.message , user: response.admin});
};


// Function to see all users (accessible only by admin)
const seeAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 5;

  const response = await adminService.seeUsers(page, limit);

  if (response.error) {
    return res.status(500).json({ error: response.error });
  }

  res.status(200).json({ users: response.users });
};
// Function to delete a user (accessible only by admin)
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const response = await adminService.deleteUser(userId);
    console.log(response.message);
    res.send({ message: response.message,user: response.user });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getAllProducts = async (req, res) => {
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 10; // Default to 10 items per page if not provided

  const response = await adminService.seeProducts(page, limit);

  if (response.error) {
    return res.status(500).json({ error: response.error });
  }

  res.status(200).json({ products: response.products });
};
// Function to delete a product (accessible only by admin)
const deleteProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const response = await adminService.deleteProduct(productId);
    console.log(response.message);
    res.send({ message: response.message, product: response.product });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerSuperadmin, loginSuperadmin, seeAllUsers, deleteUser, getAllProducts, deleteProduct };
