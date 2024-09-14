const mongoose = require('mongoose');

const FriendListSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]  // List of friend IDs
  });
  
const FriendList = mongoose.model('FriendList', FriendListSchema);
module.exports = FriendList;
