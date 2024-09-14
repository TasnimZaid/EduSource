const Lesson = require('../model/Lesson');

exports.getAllLessons = async (req, res) => {
  try {
    const lessons = await Lesson.find().populate('creator');
    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching lessons.' });
  }
};
