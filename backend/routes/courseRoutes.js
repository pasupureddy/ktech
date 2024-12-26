const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('../models'); // Import Sequelize model

const router = express.Router();

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword, role });
        res.status(201).send({ message: 'User registered successfully!', userId: user.id });
    } catch (error) {
        res.status(500).send({ error: 'Registration failed', details: error });
    }
});

module.exports = router;

