const mongoose = require('mongoose');

const PassageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  creator: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  createdAt: { type: Date, default: Date.now }
});

const Passage = mongoose.model('Passage', PassageSchema);
module.exports = Passage;
