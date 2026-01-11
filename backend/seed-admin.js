const mongoose = require('mongoose');
const dotenv = require('dotenv');
const AdminUser = require('./models/AdminUser');
const bcrypt = require('bcryptjs');

dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedAdmin = async () => {
    await connectDB();

    try {
        // Clear existing admins
        await AdminUser.deleteMany();
        console.log('Admin Users cleared');

        // Create Super Admin
        // Note: Password hashing is handled in the model pre-save hook we added earlier (Step 46)
        // If that hook IS active, plain string 'password123' will be hashed.
        // If not, we might need to manually hash here if we want to be safe.
        // Let's rely on the model logic or force hash here to be sure.
        
        let password = 'password123';
        // Check if we need manual hash (if pre-save isn't working or we want to be explicit)
        // Ideally we just let the model handle it. But to be safe for a seed script:
        // We will instantiate and save, which triggers pre-save.
        // However, AdminUser.create() also triggers pre-save in Mongoose 5+.

        const superAdmin = new AdminUser({
            name: 'Super Admin',
            email: 'admin@kavaach.in',
            password: 'password123', // Will be hashed by pre-save
            role: 'super_admin',
            city: 'Mumbai',
            permissions: ['all']
        });

        await superAdmin.save();

        console.log('Super Admin Created:');
        console.log('Email: admin@kavaach.in');
        console.log('Password: password123');

        // Create Ops Admin
        const opsAdmin = new AdminUser({
            name: 'Ravi Ops',
            email: 'ops@kavaach.in',
            password: 'password123',
            role: 'ops_admin',
            city: 'Mumbai',
            permissions: ['dispatch', 'view_reports']
        });

        await opsAdmin.save();
        console.log('Ops Admin Created: ops@kavaach.in');

        process.exit();
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};

seedAdmin();
