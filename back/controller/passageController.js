const Passage = require('../model/Passage');

exports.getAllPassages = async (req, res) => {
  try {
    const passages = await Passage.find().populate('creator');
    res.status(200).json(passages);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching passages.' });
  }
};
