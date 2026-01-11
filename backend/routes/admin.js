const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const AdminUser = require('../models/AdminUser');
const Submission = require('../models/Submission');
const Fleet = require('../models/Fleet');
const User = require('../models/User');
const { protectAdmin, restrictTo } = require('../middleware/adminAuthMiddleware');

// Generate JWT
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '1d',
    });
};

// @desc    Admin Login
// @route   POST /api/admin/login
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await AdminUser.findOne({ email });

        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                city: user.city,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Create Admin User (Super Admin only)
// @route   POST /api/admin/create
// @access  Private (Super Admin)
router.post('/create', protectAdmin, restrictTo('super_admin'), async (req, res) => {
    const { name, email, password, role, city } = req.body;

    try {
        const userExists = await AdminUser.findOne({ email });

        if (userExists) {
            return res.status(400).json({ message: 'Admin already exists' });
        }

        const user = await AdminUser.create({
            name,
            email,
            password, 
            role,
            city
        });

        if (user) {
            res.status(201).json({
                _id: user.id,
                name: user.name,
                email: user.email,
                role: user.role
            });
        } else {
            res.status(400).json({ message: 'Invalid admin data' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get Dashboard Stats (Tier 1 & Tier 2)
// @route   GET /api/admin/dashboard/stats
// @access  Private
router.get('/dashboard/stats', protectAdmin, async (req, res) => {
    try {
        // Implement logic to aggregate stats
        const pendingReports = await Submission.countDocuments({ status: { $in: ['New', 'AI Analyzed'] } });
        const inProgressReports = await Submission.countDocuments({ status: { $in: ['Dispatched', 'In Progress'] } });
        const resolvedToday = await Submission.countDocuments({ 
            status: 'Resolved',
            resolvedAt: { $gte: new Date(new Date().setHours(0,0,0,0)) }
        });
        
        const activeTrucks = await Fleet.countDocuments({ status: { $ne: 'Offline/Maintenance' } });
        const totalTrucks = await Fleet.countDocuments();

        res.json({
            pending: { count: pendingReports, label: "Awaiting Dispatch", trend: "+12%" },
            inProgress: { count: inProgressReports, label: "Currently Being Fixed", subtext: "Avg 18hrs" },
            resolvedToday: { count: resolvedToday, label: "Issues Resolved Today", trend: "+8%" },
            fleetStatus: { active: activeTrucks, total: totalTrucks }
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get Analytics Data (Charts)
// @route   GET /api/admin/analytics
// @access  Private (Ops, Govt, Super)
router.get('/analytics', protectAdmin, async (req, res) => {
    try {
        // Placeholder for chart data aggregation
        // 1. Resolution Rate (Last 7 Days)
        // 2. Severity Breakdown
        
        const severityStats = await Submission.aggregate([
            { $group: { _id: "$severity", count: { $sum: 1 } } }
        ]);

        res.json({
            resolutionRate: { /* Mock or aggregate data */ },
            severityBreakdown: severityStats
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
