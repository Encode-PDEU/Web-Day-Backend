const express = require('express');
const router = express.Router();
const { getRandomQuestion, checkAnswer } = require('../Controllers/questionController');

router.get('/random-question', getRandomQuestion);

router.post('/check-answer', checkAnswer);

module.exports = router;
