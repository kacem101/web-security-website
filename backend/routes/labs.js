const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { startLab, stopLab , checkFlag } = require('../services/dockerService');
const User = require('../models/User');
const mongoose = require('mongoose');
// Route to start a lab
router.post('/start/:labId', authenticate, async (req, res) => {
  try {
    const { labId } = req.params;
    const labInfo = await startLab(labId);
    res.status(200).json(labInfo);
  } catch (error) {
    res.status(500).json({ message: 'Error starting lab.', error: error.message });
  }
});

// Route to stop a lab
router.post('/stop/:containerId', authenticate, async (req, res) => {
  try {
    const { containerId } = req.params;
    await stopLab(containerId);
    res.status(200).json({ message: 'Lab stopped successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Error stopping lab.', error: error.message });
  }
});

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