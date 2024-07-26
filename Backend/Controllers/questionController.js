const Question = require('../Models/questionModel');
const logger = require('../utils/logger');
const promClient = require('prom-client');

const counter = new promClient.Counter({
  name: 'question_served',
  help: 'The number of questions served'
});

const getRandomQuestion = async (req, res) => {
  try {
    const count = await Question.countDocuments();
    console.log('Total questions count:', count);
    logger.info('Total questions count:', count);
    if (count === 0) {
      return res.status(404).json({ msg: 'No questions found' });
    }
    const random = Math.floor(Math.random() * count);
    const question = await Question.findOne().skip(random);
    logger.info('Random question:', question);
    console.log('Random question:', question);

    if (!question) {
      return res.status(404).json({ msg: 'No question found' });
    }

    counter.inc();

    res.json(question);
  } catch (err) {
    logger.error('Error in /random-question endpoint:', err.message);
    logger.error('Error in /random-question endpoint:', err.message);
    res.status(500).send('Server Error');
  }
};

const checkAnswer = async (req, res) => {
  const { questionId, selectedOption } = req.body;
  try {
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({ msg: 'Question not found' });
    }
    const isCorrect = selectedOption === question.answer;
    res.json({ isCorrect });
  } catch (err) {
    logger.error('Error in /check-answer endpoint:', err.message);
    res.status(500).send('Server Error');
  }
};

module.exports = { getRandomQuestion, checkAnswer };
