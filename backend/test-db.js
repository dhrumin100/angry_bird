require('dotenv').config();
const mongoose = require('mongoose');

console.log("Attempting to connect to MongoDB...");
console.log("URI:", process.env.MONGO_URI.replace(/:([^:@]+)@/, ':****@')); // Hide password

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('✅ MongoDB Connected Successfully!');
        process.exit(0);
    })
    .catch(err => {
        console.error('❌ MongoDB Connection Error:', err);
        process.exit(1);
    });
