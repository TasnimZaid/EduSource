const mongoose = require('mongoose');

const ShareSchema = new mongoose.Schema({
  sharedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  sharedWith: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource' },  // Shared resource
  jobId: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },  // Shared job
  sharedAt: { type: Date, default: Date.now }
});

const Share = mongoose.model('Share', ShareSchema);
module.exports = Share;
