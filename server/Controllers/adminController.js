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
  console.log(data )

  const response = await adminService.adminLogin(data);
  if (response.error) {
      return res.status(400).json({ error: response.error });
  }
  res.cookie('token', response.token, { httpOnly: true, secure:true,maxAge: 24 * 60 * 60 * 1000 }).status(200).json({ message: response.message , user: response.admin});
};


// Function to see all users (accessible only by admin)
const seeAllUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 1; 
  const limit = parseInt(req.query.limit) || 10;
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
  const page = parseInt(req.query.page) || 10; // Default to page 1 if not provided
  const limit = parseInt(req.query.limit) || 5; // Default to 10 items per page if not provided

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
    console.log(response);
    res.send({ message: response.message, product: response.product });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};
const createCategory = async (req, res) => {
  const data = req.body;
  const response = await adminService.createCategory(data);
  if (response.error) {
    return res.status(500).json({ error: response.error });
  }
  res.status(201).json({ message: 'Category created successfully', category: response });
};

// Function to update an existing category
const updateCategory = async (req, res) => {
  const { id } = req.params;
  const data = req.body;
  const response = await adminService.updateCategory(id, data);
  if (response.error) {
    return res.status(500).json({ error: response.error });
  }
  res.status(200).json({ message: 'Category updated successfully', category: response });
};

// Function to delete a category
const deleteCategory = async (req, res) => {
  const { id } = req.params;
  const response = await adminService.deleteCategory(id);
  if (response.error) {
    return res.status(500).json({ error: response.error });
  }
  res.status(200).json({ message: 'Category deleted successfully' });
};


const getCategories = async (req, res) => {
  const response = await adminService.getCategories();
  if (response.error) {
    return res.status(500).json({ error: response.error });
  }
  res.status(200).json(response);
};
const getUserCount = async (req, res) => {
  try {
    const response = await adminService.getUserCount();
    res.status(200).json({ count: response.count });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getProductCount = async (req, res) => {
  try {
    const response = await adminService.getProductCount();
    res.status(200).json({ count: response.count });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getCategoryCount = async (req, res) => {
  try {
    const response = await adminService.getCategoryCount();
    res.status(200).json({ count: response.count });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
};

module.exports = { registerSuperadmin, loginSuperadmin, seeAllUsers, deleteUser, getAllProducts, deleteProduct , createCategory,updateCategory,deleteCategory,getCategories,getUserCount,getProductCount,getCategoryCount};
