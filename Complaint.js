const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema(
  {
    complaintId: {
      type: String,
      unique: true,
      required: true
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },

    title: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    categoryLabel: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    latitude: {
      type: Number
    },

    longitude: {
      type: Number
    },

    priority: {
      type: String,
      enum: ['low', 'medium', 'high'],
      default: 'medium'
    },

    beforeImage: {
      type: String,
      default: null
    },

    aiAnalysis: {
      type: mongoose.Schema.Types.Mixed,
      default: null
    },

    status: {
      type: String,
      enum: ['submitted', 'assigned', 'in_progress', 'completed', 'resolved', 'closed'],
      default: 'submitted'
    },
    feedback: {
  rating: {
    type: Number,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    default: ''
  },
  date: {
    type: Date,
    default: null
  }
}
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Complaint', complaintSchema);