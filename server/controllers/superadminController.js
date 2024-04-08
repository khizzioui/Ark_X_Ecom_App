const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Superadmin = require('../models/superadmin');
const keys = require('../config/keys');

// Function to register a new superadmin
const registerSuperadmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if the Superadmin already exists
    let existingSuperadmin = await Superadmin.findOne({ username });
    if (existingSuperadmin) {
      return res.status(400).json({ message: 'Superadmin already exists' });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new Superadmin with hashed password
  const superadmin = new Superadmin({ username : username , password }); 
    await superadmin.save();

    console.log('Creating superadmin with username:', username);
    res.status(201).json({ message: 'Superadmin created successfully' });
  } catch (error) {
    console.error('Error creating superadmin:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};


// Function to log in a superadmin
const loginSuperadmin = async (req, res) => {
  const { username, password } = req.body;
  try {
      const superadmin = await Superadmin.findOne({ username });
      if (!superadmin) {
        return res.status(400).json({ message: 'Superadmin not found' });
      }
  
      const validPassword = await bcrypt.compare(password, superadmin.password);
      if (!validPassword) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // If the password is correct, proceed with generating a JWT token
      const token = jwt.sign({ id: superadmin._id }, keys.jwtSecret, { expiresIn: '1h' });
      
      // Set the token in a cookie
      res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // 1 hour
      res.json({ message: 'Logged in successfully' });
  } catch (error) {
      console.error('Error logging in superadmin:', error);
      res.status(500).json({ error: 'Internal server error' });
  }
 };


module.exports = { registerSuperadmin, loginSuperadmin };

  