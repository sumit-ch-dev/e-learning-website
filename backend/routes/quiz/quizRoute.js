const express = require('express');
const router = express.Router()
const { createQuiz, submitQuiz } = require('../../controller/quizController')

router.post('/create-quiz/:lessonId', createQuiz);
// router.get('/quizzes', getAllQuizzes);
router.post('/submit-quiz', submitQuiz)


module.exports = router