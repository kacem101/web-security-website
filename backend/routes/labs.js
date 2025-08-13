const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const User = require('../models/User');
const mongoose = require('mongoose');

// Define flags for each lab
const labFlags = {
    'xss-lab-1': 'FLAG{XSS_SUCCESS_e16c31f2}',
    'xss-lab-2': 'FLAG{XSS_STORED_c5d9a8f2}',
    'xss-lab-3': 'FLAG{XSS_DOM_b8e7c1d3}',
    'sql-injection-lab-1': 'FLAG{SQLI_CHALLENGE_f78a2d1b}',
    'sql-injection-lab-2': 'FLAG{SQLI_ERROR_BASED_d1f2e9c4}',
    'sql-injection-lab-3': 'FLAG{SQLI_TIME_BASED_a3b5c7d9}',
    // Add more labs and their flags here
};

// Function to check the submitted flag against the correct flag
const checkFlag = (labId, submittedFlag) => {
    return labFlags[labId] === submittedFlag;
};

// Route to submit a flag for a lab
router.post('/check-flag/:labId', authenticate, async (req, res) => {
    try {
        const { labId } = req.params;
        const { submittedFlag } = req.body;

        // Convert the string ID from the JWT to a Mongoose ObjectId
        const userId = req.user.id;
        const userObjectId = new mongoose.Types.ObjectId(userId);

        if (checkFlag(labId, submittedFlag)) {
            // Find the user and update their progress Map using the correct ObjectId
            const updatedUser = await User.findOneAndUpdate(
                { _id: userObjectId },
                { $set: { [`progress.${labId}`]: { completed: true, completionDate: new Date() } } },
                { new: true, upsert: true }
            );

            if (updatedUser) {
                console.log(`User ${userObjectId} progress updated for lab ${labId}`);
                console.log('Updated user document:', updatedUser.progress);
                res.status(200).json({ success: true, message: "Correct flag! Progress saved." });
            } else {
                console.error(`Failed to find and update user with ID: ${userId}`);
                res.status(500).json({ success: false, message: "Failed to update user progress." });
            }
        } else {
            res.status(400).json({ success: false, message: "Incorrect flag. Try again!" });
        }
    } catch (error) {
        console.error('Error checking flag:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;