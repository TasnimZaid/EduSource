const mongoose = require('mongoose');

const CoachingSessionSchema = new mongoose.Schema({
  coach: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the coach (a user with role 'coach')
  teacher: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to the teacher requesting coaching
  sessionDate: { type: Date, required: true }, // Date of the coaching session
  status: { type: String, enum: ['pending', 'approved', 'rejected', 'completed'], default: 'pending' }, // Status of the session
  topic: { type: String, required: true }, // Topic of the coaching session
  feedback: { type: String } // Optional feedback after the session
}, {
  timestamps: true // Automatically adds createdAt and updatedAt timestamps
});


const CoachingSession = mongoose.model('CoachingSession', CoachingSessionSchema);
module.exports = CoachingSession;
