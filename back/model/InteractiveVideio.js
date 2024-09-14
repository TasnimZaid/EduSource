const mongoose = require('mongoose');

const InteractiveVideoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  videoUrl: { type: String, required: true },
  interactions: [{
    time: { type: Number, required: true }, // Time in video for interaction
    type: { type: String, enum: ['quiz', 'poll'], required: true }, // Interaction type
    data: { type: String } // Additional data (like quiz questions)
  }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const InteractiveVideo = mongoose.model('InteractiveVideo', InteractiveVideoSchema);
module.exports = InteractiveVideo;
