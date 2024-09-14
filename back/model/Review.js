const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    resourceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Resource', required: true },  // Or Job ID, if reviewing jobs
    rating: { type: Number, required: true, min: 1, max: 5 },  // Rating from 1 to 5
    comment: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false },  // Soft delete
    reported: { type: Boolean, default: false }  // Flag for reported reviews
  });
  
  const Review = mongoose.model('Review', ReviewSchema);
module.exports = Review;
