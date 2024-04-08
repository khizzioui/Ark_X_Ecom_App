const express = require('express');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');
const bcrypt = require('bcrypt');
const Superadmin = require('../models/superadmin');
const router = express.Router();

// Superadmin registration
router.post('/register', async (req, res) => {
 const { username, password } = req.body;
 try {
    let superadmin = await Superadmin.findOne({ username });
    if (superadmin) {
      return res.status(400).json({ superadmin: 'Superadmin already exists' });
    }
    superadmin = new Superadmin({ username, password });
    await superadmin.save();
    const token = jwt.sign({ id: superadmin.id }, keys.jwtSecret, { expiresIn: 3600 });
    res.json({ token });
 } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
 }
});

// Superadmin login
router.post('/login', async (req, res) => {
 const { username, password } = req.body;
 try {
    let superadmin = await Superadmin.findOne({ username });
    if (!superadmin) {
      return res.status(400).json({ superadmin: 'Superadmin not found' });
    }
    const validPassword = await bcrypt.compare(password, superadmin.password);
    if (!validPassword) {
      return res.status(400).json({ superadmin: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: superadmin.id }, keys.jwtSecret, { expiresIn: 3600 });
    res.json({ token });
 } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
 }
});

module.exports = router;
