const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  confirmPassword: { type: String, required: true },
  role: { type: String, enum: ['teacher', 'coach', 'admin'], required: true },
  createdAt: { type: Date, default: Date.now },
  isDeleted: { type: Boolean, default: false },  // Soft delete flag
  friendList: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }] ,
  profilePicture: { type: String },

  // Teacher-specific fields
  postedResources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
  appliedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],
  subjects: [
    {
      name: { type: String, required: true },  // Subject name
      photo: { type: String }  // URL to the subject's photo
    }
  ],
  
  quizzes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Quiz' }],
  lessons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Lesson' }],
  passages: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passage' }],
  interactiveVideos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'InteractiveVideo' }],

  // Coach-specific fields
  coachingRequests: [{ type: mongoose.Schema.Types.ObjectId, ref: 'CoachingSession' }],

  // Admin-specific fields
  approvedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }],

    // Share-related fields
    sharedByMe: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Share' }],  
    sharedWithMe: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Share' }],
    
  isDeleted: { type: Boolean, default: false }  // Soft delete flag
});

// Create and export the model
const User = mongoose.model('User', UserSchema);
module.exports = User;
