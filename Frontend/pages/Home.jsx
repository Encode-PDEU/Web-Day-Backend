import { useState, useEffect } from 'react';
import Logo from '../src/assets/encode.jpeg';
import "../src/App.css";
import KBC from "../src/assets/kbc.gif";
import WRONG from "../src/assets/wrong.gif";

const Home = () => {
    const [questions, setQuestions] = useState([]);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState(null);
    const [name, setName] = useState('');
    const [rollNumber, setRollNumber] = useState('');
    const [score, setScore] = useState(0);
    const [questionIndex, setQuestionIndex] = useState(0);

    useEffect(() => {
        // Check if the user has already submitted the quiz
        const hasSubmitted = localStorage.getItem('quizSubmitted');
        if (hasSubmitted) {
            setSubmitted(true);
        }
    }, []);

    const fetchQuestions = async () => {
        try {
            const response = await fetch('https://web-day-backend.onrender.com/api/all-questions');
            const data = await response.json();
            setQuestions(shuffleArray(data));
        } catch (error) {
            console.error('Error fetching the questions:', error);
        }
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    const submitAnswer = async (option) => {
        try {
            const response = await fetch('https://web-day-backend.onrender.com/api/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: questions[questionIndex]._id,
                    selectedOption: option
                })
            });
            const data = await response.json();
            if (data.isCorrect) {
                setScore(score + 1);
                setResult('Correct!');
            } else {
                setResult('Incorrect!');
            }
        } catch (error) {
            console.error('Error submitting the answer:', error);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        submitAnswer(option);
    };

    const handleNextQuestion = () => {
        if (questionIndex < 9) {
            setQuestionIndex(questionIndex + 1);
            setResult(null);
            setSelectedOption(null);
        }
    };

    const handleStartQuiz = () => {
        if (name && rollNumber) {
            fetchQuestions();
            setButtonClicked(true);
            setScore(0);
            setQuestionIndex(0);
        } else {
            alert("Please enter your Name and Roll Number.");
        }
    };

    const handleSubmitQuiz = async () => {
        try {
            const response = await fetch('https://web-day-backend.onrender.com/api/create', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    rollNo: rollNumber,
                    score: score
                })
            });

            if (response.ok) {
                const data = await response.json();
                console.log('User created successfully:', data.user);
                // Store a flag in localStorage to indicate the quiz has been submitted
                localStorage.setItem('quizSubmitted', 'true');
            } else {
                const data = await response.json();
                console.error('Failed to create user:', data.message);
            }
        } catch (error) {
            console.error('Error submitting the quiz:', error.message);
        }
        setSubmitted(true);
        setButtonClicked(false);
        setName("");
        setRollNumber("");
    };

    return (
        <div className='home'>
            <div className="content">
                <div className="navbar">
                    <div className="left">
                        <div className="logo">
                            <a href="https://www.instagram.com/encode_pdeu?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" target='_blank'><img src={Logo} alt="" /></a>
                        </div>
                    </div>
                    <div className="center">
                        <p>&#128269;</p><p> Encode Introductory Session Quiz</p><p></p>
                    </div>
                    <div className="browser-buttons">
                        <span className="button minimize"></span>
                        <a href="https://chat.whatsapp.com/CbZ618g7HCOCMOgRoV4W8m" target='_blank'><span className="button maximize"></span></a>
                        <a href="https://www.linkedin.com/company/encode-pdpu/mycompany/" target='_blank'><span className="button close"></span></a>
                    </div>
                </div>
                <div className="main">
                    {buttonClicked && !submitted && (
                        <div className="score-display">
                            <h3>Score: {score}</h3>
                        </div>
                    )}

                    {submitted && (
                        <div>
                            <h1>Thank you for taking the Quiz!</h1>
                        </div>
                    )}

                    {!buttonClicked && !submitted && (
                        <div className='form'>
                            <h2>Enter your details!</h2>
                            <input
                                type="text"
                                placeholder="Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="input-field"
                            />
                            <input
                                type="text"
                                placeholder="Roll Number"
                                value={rollNumber}
                                onChange={(e) => setRollNumber(e.target.value)}
                                className="input-field"
                            />
                            <button onClick={handleStartQuiz} className='q-button'>Start Quiz</button>
                        </div>
                    )}
                    {buttonClicked && questions.length > 0 && questionIndex < 10 && (
                        <div className="question-container">
                            <h3>Question {questionIndex + 1}:</h3>
                            <div className="question"><p>{questions[questionIndex].question}</p></div>
                            <div className="options">
                                {questions[questionIndex].options.map((option, index) => (
                                    <button key={index} className="option-button" onClick={() => handleOptionClick(option)}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                            {result && (
                                <div className="result-container">
                                    <h2>{result}</h2>
                                    {questionIndex < 9 ? (
                                        <button onClick={handleNextQuestion} className="next-button">Next Question</button>
                                    ) : (
                                        <button onClick={handleSubmitQuiz} className="next-button">Submit final Score!</button>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
