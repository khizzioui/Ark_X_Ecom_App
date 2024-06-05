const Product = require('../Models/product');
const user = require('../Models/user');
const Superadmin = require('../models/admin')
const Category = require('../models/category')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const adminService = {
  adminRegister: async (data) => {
    try {
      // Check if the Superadmin already exists
      let existingSuperadmin = await Superadmin.findOne({ username: data.username });
      if (existingSuperadmin) {
        return { error: "User with this username already exist" };
      }

      console.log('register')
      const superadmin = new Superadmin({ username: data.username, password: data.password });
      const admin = await superadmin.save();

      console.log('Creating superadmin with username:', data.username);
      return ({ admin: admin });
    } catch (error) {
      console.error('Error creating superadmin:', error);
      return ({ error: 'Internal server error' });
    }

  },

  adminLogin: async (data) => {
    console.log('erreur 1')

    try {
      const superadmin = await Superadmin.findOne({ username: data.username });
      console.log('erreur 1')
      if (!superadmin) {
        console.log('erreur 1')
        return res.status(400).json({ message: 'Superadmin not found' });

      }

      const validPassword = await bcrypt.compare(data.password, superadmin.password);
      if (!validPassword) {
        console.log('erreur 2')
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      // If the password is correct, proceed with generating a JWT token
      const token = jwt.sign({ id: superadmin._id, isAdmin: true }, keys.jwtSecret, { expiresIn: '1d' });

      // Set the token in a cookie
      return {
        token: token,
        message: 'Logged in successfully',
        admin: superadmin

      }
    } catch (error) {
      console.error('Error logging in superadmin:', error);
      return { error: 'Internal server error' };
    }
  },
  seeUsers: async (page, limit) => {
    try {
      const skip = (page - 1) * limit;
      const users = await user.find().skip(skip).limit(limit);

      return { users: users };
    } catch (error) {
      console.error('Error fetching users:', error);
      return { error: 'Internal server error' };
    }
  },
  deleteUser: async (userId) => {
    try {
      const u = await user.findByIdAndDelete(userId);
      return { user: u, message: 'User deleted successfully' };
    } catch (error) {
      console.error('Error deleting user:', error);
      return { error: 'Internal server error' };
    }
  },
  seeProducts: async (page, limit) => {
    try {
      const skip = (page - 1) * limit;
      const products = await Product.find().skip(skip).limit(limit);

      return { products: products };
    } catch (error) {
      console.error('Error fetching products:', error);
      return { error: 'Internal server error' };
    }
  },

  deleteProduct: async (productId) => {
    try {
      const deletedProduct = await Product.findByIdAndDelete(productId); // Find and delete the product
      return { product: deletedProduct, message: 'Product deleted successfully' };
    } catch (error) {
      console.error('Error deleting product:', error);
      return { error: 'Internal server error' };
    }
  },
  createCategory: async (categoryData) => {
    try {
      const newCategory = new Category(categoryData);
      return await newCategory.save();
    } catch (error) {
      console.error('Error creating category:', error);
      return { error: 'Internal server error' };
    }
  },

  updateCategory: async (categoryId, categoryData) => {
    try {
      return await Category.findByIdAndUpdate(categoryId, categoryData, { new: true });
    } catch (error) {
      console.error('Error updating category:', error);
      return { error: 'Internal server error' };
    }
  },

  deleteCategory: async (categoryId) => {
    try {
      return await Category.findByIdAndDelete(categoryId);
    } catch (error) {
      console.error('Error deleting category:', error);
      return { error: 'Internal server error' };
    }
  },
  getCategories: async () => {
    try {
      return await Category.find();
    } catch (error) {
      console.error('Error fetching categories:', error);
      return { error: 'Internal server error' };
    }
  },
  getUserCount: async () => {
    try {
      const count = await user.countDocuments();
      return { count: count };
    } catch (error) {
      console.error('Error counting users:', error);
      return { error: 'Internal server error' };
    }
  },

  getProductCount: async () => {
    try {
      const count = await Product.countDocuments();
      return { count: count };
    } catch (error) {
      console.error('Error counting products:', error);
      return { error: 'Internal server error' };
    }
  },

  getCategoryCount: async () => {
    try {
      const count = await Category.countDocuments();
      return { count: count };
    } catch (error) {
      console.error('Error counting categories:', error);
      return { error: 'Internal server error' };
    }
  },

  
};




module.exports = { adminService };