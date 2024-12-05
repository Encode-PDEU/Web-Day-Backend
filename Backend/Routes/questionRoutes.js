const express = require('express');
const router = express.Router();
const { getAllQuestions, checkAnswer } = require('../Controllers/questionController');

router.get('/all-questions', getAllQuestions);

router.post('/check-answer', checkAnswer);

module.exports = router;
