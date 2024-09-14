const InteractiveVideo = require('../model/InteractiveVideio');

exports.getAllInteractiveVideos = async (req, res) => {
  try {
    const interactiveVideos = await InteractiveVideo.find().populate('creator');
    res.status(200).json(interactiveVideos);
  } catch (error) {
    res.status(500).json({ error: 'Server error while fetching interactive videos.' });
  }
};
