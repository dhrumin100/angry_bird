const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const startGhostFleet = require('./services/ghostFleet');
const startKeepAlive = require('./services/keepAlive');

// Only load .env in development (when file exists)
if (process.env.NODE_ENV !== 'production') {
    dotenv.config();
}

const requiredEnv = ['MONGO_URI', 'JWT_SECRET'];
const missingEnv = requiredEnv.filter((key) => !process.env[key]);

if (missingEnv.length > 0) {
    console.error(`Missing required environment variables: ${missingEnv.join(', ')}`);
    console.error('Set these variables in Railway/Render before starting the backend service.');
    process.exit(1);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: '*', // Allow all for dev to fix 5174 port issue
    credentials: true
}));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Basic Route
app.get('/', (req, res) => {
    res.send('KAVAACH API is running');
});

// Routes
const authRoutes = require('./routes/auth');
const submissionRoutes = require('./routes/submissions'); // Acts as 'Reports'
const adminRoutes = require('./routes/admin');
const fleetRoutes = require('./routes/fleet');

app.use('/api/auth', authRoutes);
app.use('/api/submissions', submissionRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/fleet', fleetRoutes);
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Database Connection & Server Startup
const startServer = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000 // Fail fast if connection has issues
        });
        console.log('MongoDB Connected Successfully');
        
        // Start the Ghost Fleet Simulation
        startGhostFleet();

        // Start Keep-Alive self-ping (prevents Render free tier from sleeping)
        startKeepAlive();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

startServer();

