const mongoose = require('mongoose');

const adminUserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['super_admin', 'ops_admin', 'fleet_manager', 'govt_viewer', 'analyst'],
        required: true
    },
    city: {
        type: String,
        default: 'All Cities'
    },
    permissions: [{
        type: String
    }],
    lastActive: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

// Hash password before saving
adminUserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await require('bcryptjs').genSalt(10);
    this.password = await require('bcryptjs').hash(this.password, salt);
});

// Match user entered password to hashed password
adminUserSchema.methods.matchPassword = async function (enteredPassword) {
    return await require('bcryptjs').compare(enteredPassword, this.password);
};

module.exports = mongoose.model('AdminUser', adminUserSchema);
