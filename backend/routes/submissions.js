const express = require('express');
const router = express.Router();
const Submission = require('../models/Submission');
const User = require('../models/User');
const { protect } = require('../middleware/authMiddleware');
const { protectAdmin } = require('../middleware/adminAuthMiddleware'); // Import for admin actions
const fs = require('fs');
const path = require('path');

// @desc    Create a new submission
// @route   POST /api/submissions
// @access  Private
router.post('/', protect, async (req, res) => {
    let { image, location, issueType, description, severity, subCategory } = req.body;

    try {
        // Handle Base64 Image Upload
        if (image && image.startsWith('data:image')) {
            const matches = image.match(/^data:image\/(\w+);base64,(.+)$/);
            if (matches) {
                const extension = matches[1];
                const base64Data = matches[2];
                const buffer = Buffer.from(base64Data, 'base64');
                const filename = `report-${Date.now()}-${Math.round(Math.random() * 1E9)}.${extension}`;
                const uploadPath = path.join(__dirname, '../uploads', filename);

                // Write file to disk
                fs.writeFileSync(uploadPath, buffer);
                
                // Update image variable to be the URL path
                image = `/uploads/${filename}`;
            }
        }

        // AI Analysis could be triggered here or on a separate endpoint.
        // For simplicity, we create status 'New' and assume AI runs slightly after or we default params.

        const submission = await Submission.create({
            userId: req.user.id,
            image, // Now stores URL instead of Base64
            location,
            issueType,
            description, // user_comment mapping
            severity: severity || 'Medium',
            subCategory,
            status: 'New',
            pointsAwarded: 100 // Or calculate based on severity logic
        });

        // Update user karma/civic score
        await User.findByIdAndUpdate(req.user.id, { 
            $inc: { civic_score: 100 } 
        });

        res.status(201).json(submission);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get user submissions
// @route   GET /api/submissions/my
// @access  Private
router.get('/my', protect, async (req, res) => {
    try {
        const submissions = await Submission.find({ userId: req.user.id }).sort({ createdAt: -1 });
        res.json(submissions);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});


// === ADMIN ROUTES FOR REPORTS ===

// @desc    Get Reports Queue (Admin)
// @route   GET /api/submissions/queue
// @access  Private (Admin)
router.get('/queue', protectAdmin, async (req, res) => {
    try {
        const { status, priority, city } = req.query;
        let query = {};
        
        if (status) query.status = status;
        if (priority) query.severity = priority;
        // if (city) ... need to join with User or add city to report. User model has city.
        
        const reports = await Submission.find(query)
            .populate('userId', 'name email city civic_score') // Get reporter details
            .populate('assigned_truck', 'truckId driverName') // Get fleet details
            .sort({ createdAt: -1 });
            
        res.json(reports);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Get Single Report Details
// @route   GET /api/submissions/:id
// @access  Private (Admin)
router.get('/:id', protectAdmin, async (req, res) => {
    try {
        const report = await Submission.findById(req.params.id)
            .populate('userId', 'name email city civic_score')
            .populate('assigned_truck')
            .populate('statusHistory.changedBy', 'name'); // Populate status change admin

        if (!report) return res.status(404).json({ message: 'Report not found' });
        res.json(report);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Update Status (Admin)
// @route   PUT /api/submissions/:id/status
// @access  Private (Admin)
router.put('/:id/status', protectAdmin, async (req, res) => {
    const { 
        status, 
        notes, 
        assigned_truck, 
        assigned_team_lead, 
        materials_used, 
        priority, 
        before_photo,
        after_photo
    } = req.body;
    
    try {
        const report = await Submission.findById(req.params.id);
        if (!report) return res.status(404).json({ message: 'Report not found' });

        if (status) report.status = status;
        if (assigned_truck) report.assigned_truck = assigned_truck;
        
        // Advanced dispatch fields
        if (assigned_team_lead) report.assigned_team_lead = assigned_team_lead;
        if (materials_used) report.materials_used = materials_used;
        if (priority) report.severity = priority; // Override severity
        if (before_photo) report.before_photo = before_photo;
        if (after_photo) report.after_photo = after_photo;

        if (status === 'Resolved' && !report.resolvedAt) {
            report.resolvedAt = Date.now();
        }

        report.statusHistory.push({
            status: status || report.status,
            changedBy: req.user._id,
            notes
        });

        await report.save();
        res.json(report);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Resolve a submission (Citizen/User logic - deprecated or limited?)
// Note: Keeping existing route but maybe restrict usage or keep for demo
router.put('/:id/resolve', protect, async (req, res) => {
     // ... keeping existing logic if beneficial for demo, or remove
     // Let's overwite to use Admin logic mostly, but if "User" marks resolved (unlikely in this flow),
     // I'll leave strictly "Admin" logic above.
     // For safety I will comment out or keep the old simple one for compatibility testing.
     // I've overwritten the file content with this specific code block so I need to check if I included the original 'resolve' logic. 
     // I will reproduce it below for safety.
    try {
        const submission = await Submission.findById(req.params.id);
        if (!submission) return res.status(404).json({ message: 'Submission not found' });
        if (submission.userId.toString() !== req.user.id) return res.status(401).json({ message: 'Not authorized' });

        submission.status = 'Resolved';
        submission.resolvedAt = Date.now();
        await submission.save();
        res.json(submission);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
