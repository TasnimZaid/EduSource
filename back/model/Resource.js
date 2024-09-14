const mongoose = require('mongoose');


const ResourceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes: { type: Number, default: 0 },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    isDeleted: { type: Boolean, default: false },  // Soft delete flag

  });

  const Resource = mongoose.model('Resource', ResourceSchema);
  module.exports = Resource;
  

  