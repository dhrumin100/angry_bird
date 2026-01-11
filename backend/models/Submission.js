const mongoose = require('mongoose');

const submissionSchema = new mongoose.Schema({
    reportId: { // Custom ID like KVH-2025-0412
        type: String,
        unique: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String, // URL or Base64
        required: true
    },
    location: {
        lat: Number,
        lng: Number,
        address: String
    },
    issueType: {
        type: String,
        default: 'Pothole'
    },
    subCategory: {
        type: String
    },
    severity: {
        type: String, // 'High', 'Medium', 'Low'
        enum: ['High', 'Medium', 'Low'],
        default: 'Medium'
    },
    description: { // user_comment
        type: String
    },
    status: {
        type: String,
        enum: ['New', 'Pending', 'AI Analyzed', 'Dispatched', 'In Progress', 'Resolved', 'Rejected'],
        default: 'New'
    },
    ai_analysis: {
        confidence: Number,
        detected_issue: String,
        estimated_size: String,
        severity_score: Number,
        explanation: String
    },
    assigned_truck: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Fleet'
    },
    assigned_admin: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AdminUser'
    },
    assigned_team_lead: {
        type: String,
        default: 'Unassigned'
    },
    before_photo: String, // Same as image mainly, or verified one
    after_photo: String,
    repair_notes: String,
    materials_used: {
        asphalt: Number,
        labor_hours: Number,
        cost: Number
    },
    statusHistory: [{
        status: String,
        changedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'AdminUser' }, // or 'System'
        timestamp: { type: Date, default: Date.now },
        notes: String
    }],
    resolvedAt: {
        type: Date
    },
    pointsAwarded: {
        type: Number, default: 0
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Pre-save hook to generate reportId if not present
submissionSchema.pre('save', async function(next) {
    if (!this.reportId) {
        const date = new Date();
        const year = date.getFullYear();
        const count = await mongoose.model('Submission').countDocuments();
        this.reportId = `KVH-${year}-${(count + 1).toString().padStart(4, '0')}`;
    }
    next();
});

module.exports = mongoose.model('Submission', submissionSchema);
