const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  title: { type: String, required: true }, // Title of the job
  description: { type: String, required: true }, // Description of the job
  postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the user who posted the job
  appliedTeachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }], // List of teachers who applied for the job
  approvedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the admin who approved the job
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' }, // Status of the job posting
  createdAt: { type: Date, default: Date.now }, // Job posting date
  location: { type: String }, // Location of the job
  salary: { type: Number } // Optional field for salary
}, {
  timestamps: true // Automatically adds createdAt and updatedAt timestamps
});

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;
