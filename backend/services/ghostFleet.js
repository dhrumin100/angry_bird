const cron = require('node-cron');
const Submission = require('../models/Submission');

// Run every 2 minutes for demonstration purposes
// In production, this would be every hour or day
const startGhostFleet = () => {
    cron.schedule('*/2 * * * *', async () => {
        try {
            console.log('👻 Ghost Fleet: Running auto-resolution cycle...');
            
            // Find reports that are either 'New', 'Pending', or 'In Progress'
            const unresolvedReports = await Submission.find({
                status: { $in: ['New', 'Pending', 'In Progress', 'AI Analyzed'] }
            });

            if (unresolvedReports.length === 0) {
                console.log('👻 Ghost Fleet: No pending reports found.');
                return;
            }

            // Pick the oldest one to resolve to simulate an actual truck completing a job
            const reportToResolve = unresolvedReports.sort((a, b) => a.createdAt - b.createdAt)[0];

            reportToResolve.status = 'Resolved';
            reportToResolve.resolvedAt = new Date();
            
            await reportToResolve.save();
            
            console.log(`✅ Ghost Fleet successfully resolved report: ${reportToResolve.reportId}`);
        } catch (error) {
            console.error('👻 Ghost Fleet Error:', error);
        }
    });
};

module.exports = startGhostFleet;
