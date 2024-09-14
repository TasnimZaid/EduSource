const mongoose = require('mongoose');
const User = require('./model/User');
const Resource = require('./model/Resource');
const Job = require('./model/Job');
const Quiz = require('./model/Quiz');
const Lesson = require('./model/Lesson');
const Passage = require('./model/Passage');
const InteractiveVideo = require('./model/InteractiveVideio');
const CoachingSession = require('./model/CoachingSession');
const Share = require('./model/Sharing');
const Review = require('./model/Review');
const Reported = require('./model/Reported');
require("dotenv").config();


// Connect to your MongoDB
const mongoURI = process.env.MONGO_URI;
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error("Failed to connect to MongoDB", err);
  });

// Function to seed the data
const seedDatabase = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Resource.deleteMany({});
    await Job.deleteMany({});
    await Quiz.deleteMany({});
    await Lesson.deleteMany({});
    await Passage.deleteMany({});
    await InteractiveVideo.deleteMany({});
    await CoachingSession.deleteMany({});
    await Share.deleteMany({});
    await Review.deleteMany({});
    await Reported.deleteMany({});

    // Create sample users
    const users = await User.insertMany([
      { username: 'teacher1', email: 'teacher1@example.com', password: 'password',confirmPassword : 'password' , role: 'teacher', subjects: ['Math', 'Science'] },
      { username: 'teacher2', email: 'teacher2@example.com', password: 'password', confirmPassword : 'password' ,role: 'teacher', subjects: ['English', 'History'] },
      { username: 'coach1', email: 'coach1@example.com', password: 'password', confirmPassword : 'password' , role: 'coach' },
      { username: 'admin', email: 'admin@example.com', password: 'password', confirmPassword : 'password', role: 'admin' }
    ]);

    const teacher1 = users[0]._id;
    const teacher2 = users[1]._id;
    const coach1 = users[2]._id;
    const admin = users[3]._id;

    // Create sample resources
    const resources = await Resource.insertMany([
      { title: 'Math Quiz', description: 'Math quiz for grade 6', category: 'Quiz', postedBy: teacher1 },
      { title: 'English Lesson', description: 'Shakespeare introduction', category: 'Lesson', postedBy: teacher2 }
    ]);

    // Create sample jobs
    const jobs = await Job.insertMany([
      { title: 'Math Teacher', description: 'Math teacher for high school', postedBy: admin, status: 'approved', location: 'New York', salary: 50000 },
      { title: 'English Teacher', description: 'English teacher for middle school', postedBy: admin, status: 'pending', location: 'California', salary: 45000 }
    ]);

    // Create sample quizzes
    const quizzes = await Quiz.insertMany([
      {
        title: 'Math Quiz 1',
        questions: [
          { questionText: 'What is 2+2?', options: ['3', '4', '5'], correctOption: 1 },
          { questionText: 'What is 5*6?', options: ['30', '35', '40'], correctOption: 0 }
        ],
        creator: teacher1
      }
    ]);

    // Create sample lessons
    const lessons = await Lesson.insertMany([
      { title: 'Shakespeare Overview', content: 'Introduction to Shakespeare', creator: teacher2 }
    ]);

    // Create sample passages
    const passages = await Passage.insertMany([
      { title: 'Passage on Environment', text: 'This is a passage about environmental protection.', creator: teacher1 }
    ]);

    // Create sample interactive videos
    const videos = await InteractiveVideo.insertMany([
      {
        title: 'Interactive Math Video',
        videoUrl: 'https://example.com/video',
        interactions: [
          { time: 30, type: 'quiz', data: 'What is 5+5?' }
        ],
        creator: teacher1
      }
    ]);

    // Create sample coaching sessions
    const coachingSessions = await CoachingSession.insertMany([
      { coach: coach1, teacher: teacher1, sessionDate: new Date(), status: 'approved', topic: 'Improving teaching methods' }
    ]);

    // Create sample shares
    const shares = await Share.insertMany([
      { sharedBy: teacher1, sharedWith: teacher2, resourceId: resources[0]._id }
    ]);

    // Create sample reviews
    const reviews = await Review.insertMany([
      { userId: teacher2, resourceId: resources[0]._id, rating: 5, comment: 'Great resource!' }
    ]);

    // Create sample reported items
    const reportedItems = await Reported.insertMany([
      { reportedBy: teacher2, resourceId: resources[0]._id, reason: 'Inappropriate content' }
    ]);

    console.log('Database seeded successfully!');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error seeding the database:', error);
  }
};

// Run the seed function
seedDatabase();