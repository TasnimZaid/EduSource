const mongoose = require('mongoose');

const LessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Lesson = mongoose.model('Lesson', LessonSchema);
module.exports = Lesson;
