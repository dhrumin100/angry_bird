const cron = require('node-cron');

/**
 * Keep-Alive Service (Self-Ping Cron Job)
 * 
 * Render's free tier shuts down the server after 15 minutes of inactivity.
 * This cron job pings the server's own health endpoint every 10 minutes
 * to keep it awake 24/7.
 * 
 * How it works:
 * - "node-cron" schedules a function to run at a fixed interval (every 10 min)
 * - The function sends an HTTP GET request to the server's own "/" route
 * - Render sees incoming traffic and keeps the container alive
 * - If the ping fails (e.g., network blip), it logs the error but doesn't crash
 */

const startKeepAlive = () => {
    const RENDER_URL = process.env.RENDER_EXTERNAL_URL || process.env.APP_URL;

    if (!RENDER_URL) {
        console.log('⏸️  Keep-Alive: No RENDER_EXTERNAL_URL or APP_URL set. Skipping. (This is normal in local dev)');
        return;
    }

    // Run every 10 minutes: "*/10 * * * *"
    // Cron format: [minute] [hour] [day-of-month] [month] [day-of-week]
    // */10 = "every 10th minute"
    cron.schedule('*/10 * * * *', async () => {
        try {
            const response = await fetch(RENDER_URL);
            console.log(`🏓 Keep-Alive Ping: ${response.status} OK at ${new Date().toISOString()}`);
        } catch (error) {
            console.error(`❌ Keep-Alive Ping Failed: ${error.message}`);
        }
    });

    console.log(`🏓 Keep-Alive: Pinging ${RENDER_URL} every 10 minutes to prevent Render sleep.`);
};

module.exports = startKeepAlive;
