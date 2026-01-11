const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
router.post('/signup', async (req, res) => {
    const { name, email, role } = req.body;

    try {
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const generatedCivicId = `KAV-${Math.floor(1000 + Math.random() * 9000)}`;
        const plainPassword = Math.random().toString(36).slice(-8).toUpperCase();

        const user = await User.create({
            name,
            email,
            password: plainPassword,
            role,
            civicId: generatedCivicId
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                civicId: user.civicId,
                role: user.role,
                token: generateToken(user._id),
                generatedPassword: plainPassword
            });
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Authenticate a user
// @route   POST /api/auth/login
// @access  Public
router.post('/login', async (req, res) => {
    const { userId, password } = req.body;

    try {
        // Check for user by email OR civicId
        const user = await User.findOne({
            $or: [{ email: userId }, { civicId: userId }]
        });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                civicId: user.civicId,
                role: user.role,
                karmaPoints: user.civic_score, // Map civic_score to karmaPoints for frontend
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get user data
// @route   GET /api/auth/me
// @access  Private
router.get('/me', protect, async (req, res) => {
    const user = await User.findById(req.user.id);

    // Also fetch submissions to calculate stats? 
    // For now just return user data.

    if (user) {
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            city: user.city,
            civicId: user.civicId,
            role: user.role,
            karmaPoints: user.civic_score, // Mapped for frontend compatibility
            level: user.level,
            token: generateToken(user._id),
            joinedDate: user.joinedDate
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});

// @desc    Update User Profile
// @route   PUT /api/auth/profile
// @access  Private
router.put('/profile', protect, async (req, res) => {
    try {
        const user = await User.findById(req.user._id);

        if (user) {
            user.name = req.body.name || user.name;
            user.email = req.body.email || user.email;
            user.phone = req.body.phone || user.phone;
            user.city = req.body.city || user.city;
            
            // If password is sent (optional feature for future)
            if (req.body.password) {
                user.password = req.body.password;
            }

            const updatedUser = await user.save();

            res.json({
                _id: updatedUser.id,
                name: updatedUser.name,
                email: updatedUser.email,
                phone: updatedUser.phone,
                city: updatedUser.city,
                civicId: updatedUser.civicId,
                role: updatedUser.role,
                karmaPoints: updatedUser.civic_score,
                level: updatedUser.level,
                token: generateToken(updatedUser._id), // Optional: refresh token
            });
        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get Leaderboard
// @route   GET /api/auth/leaderboard
// @access  Public (or Private)
router.get('/leaderboard', async (req, res) => {
    try {
        // Top 10 users by civic_score
        const topUsers = await User.find({})
            .sort({ civic_score: -1 })
            .limit(10)
            .select('name city civic_score level role');

        // Transform for frontend if needed (e.g. map civic_score to score)
        const leaderboardData = topUsers.map((user, index) => ({
            rank: index + 1,
            name: user.name,
            city: user.city,
            score: user.civic_score,
            level: user.level || 'Bronze',
            avatar: user.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase(),
            reports: 0, // Placeholder as we don't aggregate reports count yet efficiently
            resolved: 0, 
            streak: 0 
        }));

        res.json(leaderboardData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error fetching leaderboard' });
    }
});

module.exports = router;
