
const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

console.log("Testing MongoDB Connection...");
console.log("URI:", process.env.MONGO_URI ? "Found" : "Missing");

mongoose.connect(process.env.MONGO_URI, { serverSelectionTimeoutMS: 5000 })
    .then(() => {
        console.log("✅ SUCCESS: Connected to MongoDB!");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ ERROR: Could not connect to MongoDB.");
        console.error(err);
        process.exit(1);
    });
