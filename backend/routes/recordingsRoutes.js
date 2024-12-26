const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'your_jwt_secret'; // Replace with a secure secret in production

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ error: 'Forbidden' });
        req.user = user;
        next();
    });
};

// Mocked recordings
const recordings = [
    { title: 'Intro to JavaScript', url: '/recordings/js-intro.mp4' },
    { title: 'Advanced CSS Techniques', url: '/recordings/css-advanced.mp4' },
    { title: 'Cloud Computing Basics', url: '/recordings/cloud-basics.mp4' },
];

// Route to get recordings
router.get('/', authenticateToken, (req, res) => {
    res.status(200).json(recordings);
});

module.exports = router;
