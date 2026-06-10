const rateLimit = require("express-rate-limit");

const queryLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: 15,

    handler: (req, res) => {
        res.status(429).json({
            success: false,
            message: "Too many requests. Please try again in an hour."
        });
    }
});

module.exports = queryLimiter;