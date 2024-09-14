const mongoose = require('mongoose');


const ReportedSchema = new mongoose.Schema({
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reviewId: { type: mongoose.Schema.Types.ObjectId, ref: 'Review' },  // Link to review if it's a review report
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },  // Or link to resource if resource is reported
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },  // Link to job if job post is reported
    reason: { type: String, required: true },  // Reason for reporting
    status: { type: String, enum: ['pending', 'reviewed', 'resolved'], default: 'pending' },  // Status of the report
    createdAt: { type: Date, default: Date.now },
    reviewedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },  // Admin who reviewed the report
    resolvedAt: { type: Date }
  });
  
  const Reported = mongoose.model('Reported', ReportedSchema);
  module.exports = Reported;
  
