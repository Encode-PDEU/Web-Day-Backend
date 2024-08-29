const Question = require('../Models/questionModel');
const logger = require('../utils/logger');
const promClient = require('prom-client');

const counter = new promClient.Counter({
  name: 'questions_served',
  help: 'The number of questions served'
});

const getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    console.log(questions)
    const count = questions.length;

    console.log('Total questions count:', count);
    logger.info('Total questions count:', count);

    if (count === 0) {
      return res.status(404).json({ msg: 'No questions found' });
    }

    counter.inc(count); // Increment the counter by the number of questions served

    const questionsWithoutAnswers = questions.map(({ _id, question, options }) => ({
      _id,
      question,
      options
    }));

    res.json(questionsWithoutAnswers);
  } catch (err) {
    logger.error('Error in /all-questions endpoint:', err.message);
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

module.exports = { getAllQuestions, checkAnswer };
