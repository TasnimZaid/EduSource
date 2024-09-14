const express = require('express');
const router = express.Router();
const quizController = require('../controller/quizController');
const passageController = require('../controller/passageController');
const lessonController = require('../controller/lessonController');
const interactiveVideoController = require('../controller/interactiveVideoController');



// Quiz routes
router.get('/quizzes', quizController.getAllQuizzes);

// Passage routes
router.get('/passages', passageController.getAllPassages);

// Lesson routes
router.get('/lessons', lessonController.getAllLessons);

// InteractiveVideo routes
router.get('/interactive-videos', interactiveVideoController.getAllInteractiveVideos);

module.exports = router;
