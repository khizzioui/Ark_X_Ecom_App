const Product = require('../Models/product');
const user = require('../Models/user');
const Superadmin = require('../models/superadmin')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const adminService = {
adminRegister : async (data) =>{
    try {
        // Check if the Superadmin already exists
        let existingSuperadmin = await Superadmin.findOne({ username: data.username });
        if (existingSuperadmin) {
            return {error : "User with this username already exist"};
        }
        // Hash the password
        // const hashedPassword = await bcrypt.hash(password, 10);
    
        // Create a new Superadmin with hashed password
        const superadmin = new Superadmin({ username: data.username, password : data.password });
         const admin = await  superadmin.save();
        
        console.log('Creating superadmin with username:', data.username);
        return ({ admin: admin});
      } catch (error) {
        console.error('Error creating superadmin:', error);
        return({ error: 'Internal server error' });
      }

    },

    adminLogin: async (data) => {
      try {
        const superadmin = await Superadmin.findOne({ username : data.username });
    if (!superadmin) {
      return res.status(400).json({ message: 'Superadmin not found' });
    }

    const validPassword = await bcrypt.compare(data.password, superadmin.password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // If the password is correct, proceed with generating a JWT token
    const token = jwt.sign({ id: superadmin._id, isAdmin: true }, keys.jwtSecret, { expiresIn: '1h' });

    // Set the token in a cookie
    return {
                token : token ,
                message: 'Logged in successfully',
                admin:superadmin

            }
      } catch (error) {
        console.error('Error logging in superadmin:', error);
        return { error: 'Internal server error' };
      }
    },
    seeUsers: async () => {
      try {
        const users = await user.find({});
        return { users: users };
      } catch (error) {
        console.error('Error fetching users:', error);
        return { error: 'Internal server error' };
      }
    },
  
    deleteUser: async (userId) => {
      try {
        const u = await user.findByIdAndDelete(userId);
        return { user: u ,message: 'User deleted successfully' };
      } catch (error) {
        console.error('Error deleting user:', error);
        return { error: 'Internal server error' };
      }
    },
     seeProducts: async () => {
          try {
            const products = await Product.find({}); // Fetch all products from the database
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
      };
    



module.exports={adminService};