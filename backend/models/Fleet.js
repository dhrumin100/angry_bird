const mongoose = require('mongoose');

const fleetSchema = new mongoose.Schema({
    truckId: {
        type: String,
        required: true,
        unique: true
    },
    driverName: {
        type: String,
        required: true
    },
    driverPhone: {
        type: String,
        required: true
    },
    currentLocation: {
        lat: Number,
        lng: Number,
        address: String
    },
    status: {
        type: String,
        enum: ['Available', 'En Route', 'On-Site', 'Offline/Maintenance'],
        default: 'Available'
    },
    fuelLevel: {
        type: Number,
        default: 100
    },
    lastMaintenance: {
        type: Date
    },
    nextMaintenanceDueKm: {
        type: Number
    },
    assignmentsToday: {
        type: Number,
        default: 0
    },
    currentTask: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Submission' // References the Report/Submission ID
    },
    equipment: {
        asphaltMix: { type: Number, default: 0 }, // kg
        compactor: { type: Boolean, default: true },
        safetyCones: { type: Boolean, default: true }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Fleet', fleetSchema);
