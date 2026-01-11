const express = require('express');
const router = express.Router();
const Fleet = require('../models/Fleet');
const Submission = require('../models/Submission');
const { protectAdmin } = require('../middleware/adminAuthMiddleware');

// @desc    Get All Fleet Trucks
// @route   GET /api/fleet
// @access  Private
router.get('/', protectAdmin, async (req, res) => {
    try {
        const fleet = await Fleet.find().populate('currentTask');
        res.json(fleet);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// @desc    Create/Add New Truck
// @route   POST /api/fleet
// @access  Private
router.post('/', protectAdmin, async (req, res) => {
    try {
        const truck = await Fleet.create(req.body);
        res.status(201).json(truck);
    } catch (error) {
        res.status(400).json({ message: 'Invalid fleet data' });
    }
});

// @desc    Assign Truck to Report
// @route   POST /api/fleet/assign
// @access  Private
router.post('/assign', protectAdmin, async (req, res) => {
    const { truckId, reportId, teamLead, priority } = req.body;

    try {
        // 1. Update Truck Status
        // We find by internal _id or custom truckId? User likely passes internal _id via dropdown, or string truckId.
        // Let's assume _id for safety or query string.
        const truck = await Fleet.findById(truckId); 
        if (!truck) return res.status(404).json({ message: 'Truck not found' });

        truck.status = 'En Route';
        truck.currentTask = reportId;
        await truck.save();

        // 2. Update Report Status
        const report = await Submission.findById(reportId);
        if (!report) return res.status(404).json({ message: 'Report not found' });

        report.status = 'Dispatched';
        report.assigned_truck = truck._id;
        report.assigned_team_lead = teamLead || 'General Team';
        if (priority) report.severity = priority; // Update severity based on admin decision
        
        report.statusHistory.push({
            status: 'Dispatched',
            changedBy: req.user._id,
            notes: `Assigned to ${truck.truckId} with Team Lead ${teamLead}`
        });

        await report.save();

        res.json({ message: 'Dispatch Successful', truck, report });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;
