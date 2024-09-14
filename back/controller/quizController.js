const Quiz = require('../model/Quiz');

exports.getAllQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find().populate('creator');
    res.status(200).json(quizzes);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching quizzes.' });
  }
};
