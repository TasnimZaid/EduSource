const mongoose = require('mongoose');

const QuizSchema = new mongoose.Schema({
  title: { type: String, required: true },
  questions: [{
    questionText: { type: String, required: true },
    options: [{ type: String, required: true }],
    correctOption: { type: Number, required: true }
  }],
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;
