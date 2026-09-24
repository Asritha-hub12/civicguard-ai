const Complaint = require('../models/Complaint');

const createComplaint = async (req, res, next) => {
  try {
    const {
      title,
      category,
      categoryLabel,
      description,
      location,
      latitude,
      longitude,
      priority,
      beforeImage,
      aiAnalysis
    } = req.body;

    if (!title || !category || !categoryLabel || !description || !location) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all required complaint details'
      });
    }

    const complaintId = `CG-${Date.now().toString().slice(-6)}`;

    const complaint = await Complaint.create({
      complaintId,
      user: req.user._id,
      title,
      category,
      categoryLabel,
      description,
      location,
      latitude,
      longitude,
      priority: priority || 'medium',
      beforeImage: beforeImage || null,
      aiAnalysis: aiAnalysis || null
    });

    res.status(201).json({
      success: true,
      message: 'Complaint submitted successfully',
      complaint
    });
  } catch (error) {
    next(error);
  }
};

const getMyComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find({
      user: req.user._id
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      complaints
    });
  } catch (error) {
    next(error);
  }
};
const getAllComplaints = async (req, res, next) => {
  try {
    const complaints = await Complaint.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      complaints
    });
  } catch (error) {
    next(error);
  }
};
const updateComplaintStatus = async (req, res, next) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
  'submitted',
  'assigned',
  'in_progress',
  'completed',
  'resolved',
  'closed'
];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid complaint status'
      });
    }

    const complaint = await Complaint.findOneAndUpdate(
      { complaintId: req.params.complaintId },
      { status },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Complaint status updated successfully',
      complaint
    });
  } catch (error) {
    next(error);
  }
};
const submitComplaintFeedback = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        message: 'Rating must be between 1 and 5'
      });
    }

    const complaint = await Complaint.findOneAndUpdate(
      { complaintId: req.params.complaintId },
      {
        status: 'resolved',
        feedback: {
          rating,
          comment: comment || 'Issue resolved smoothly by the civic team.',
          date: new Date()
        }
      },
      { new: true }
    );

    if (!complaint) {
      return res.status(404).json({
        success: false,
        message: 'Complaint not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback submitted successfully',
      complaint
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  createComplaint,
  getMyComplaints,
  getAllComplaints,
  updateComplaintStatus,
  submitComplaintFeedback
};