const mongoose = require('mongoose');


const DashboardSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    recentActivity: [{ type: String }], // Track recent actions (posted resource, applied to job, etc.)
    savedResources: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Resource' }],
    savedJobs: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Job' }]
  });

  const Dashboard = mongoose.model('Dashboard', DashboardSchema);
module.exports = Dashboard;

  