

// controllers/superadminController.js

async function createSuperadmin(req, res) {
    try {
      const { username, password } = req.body;
  
      // Simulate creating a superadmin (replace with your actual logic)
      console.log('Creating superadmin with username:', username);
  
      res.status(201).json({ message: 'Superadmin created successfully' });
    } catch (error) {
      console.error('Error creating superadmin:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  }
  
  module.exports = { createSuperadmin };
  