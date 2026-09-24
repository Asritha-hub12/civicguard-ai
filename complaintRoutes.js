const express = require('express');
const router = express.Router();

const {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  submitComplaintFeedback
} = require('../controllers/complaintController');

const { protect } = require('../middleware/authMiddleware');

// Submit a new complaint
router.post('/', protect, createComplaint);

// Get complaints submitted by the logged-in citizen
router.get('/my', protect, getMyComplaints);
router.get('/all',protect,getAllComplaints);
router.patch('/:complaintId/status', protect, updateComplaintStatus);
router.patch(
  '/:complaintId/feedback',
  protect,
  submitComplaintFeedback
);
module.exports = router;