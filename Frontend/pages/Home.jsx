import { useState, useEffect } from 'react';
import Logo from '../src/assets/encode.jpeg';
import { Modal } from 'react-responsive-modal';
import 'react-responsive-modal/styles.css';
import "../src/App.css";
import KBC from "../src/assets/kbc.gif";
import WRONG from "../src/assets/wrong.gif";

const Home = () => {
    const [open, setOpen] = useState(false);
    const [question, setQuestion] = useState(null);
    const [buttonClicked, setButtonClicked] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);
    const [result, setResult] = useState(null);
    const [istTime, setIstTime] = useState('');

    const onOpenModal = () => {
        setIstTime(getISTTime()); // Update IST time when modal opens
        setOpen(true);
    };
    const onCloseModal = () => {
        setOpen(false);
        setButtonClicked(false);
    };

    const getISTTime = () => {
        const now = new Date();
        const istOffset = 5.5 * 60; // 5 hours 30 minutes
        const localOffset = now.getTimezoneOffset(); // Get the local timezone offset in minutes
        const istTime = new Date(now.getTime() + (istOffset + localOffset) * 60 * 1000);

        return istTime.toLocaleTimeString('en-IN', { timeZone: 'Asia/Kolkata' });
    };

    const fetchQuestion = async () => {
        try {
            const response = await fetch('http://localhost:7000/api/random-question');
            const data = await response.json();
            setQuestion(data);
        } catch (error) {
            console.error('Error fetching the question:', error);
        }
    };

    const submitAnswer = async (option) => {
        try {
            const response = await fetch('http://localhost:7000/api/check-answer', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    questionId: question._id,
                    selectedOption: option
                })
            });
            const data = await response.json();
            setResult(data.isCorrect ? 'Correct!' : 'Incorrect!');
        } catch (error) {
            console.error('Error submitting the answer:', error);
        }
    };

    const handleOptionClick = (option) => {
        setSelectedOption(option);
        submitAnswer(option);
        onOpenModal();
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
                        <p>&#128269;</p><p> World Wide Web Day</p><p></p>
                    </div>
                    <div className="browser-buttons">
                        <span className="button minimize"></span>
                        <a href="https://chat.whatsapp.com/CbZ618g7HCOCMOgRoV4W8m" target='_blank'><span className="button maximize"></span></a>
                        <a href="https://www.linkedin.com/company/encode-pdpu/mycompany/" target='_blank'><span className="button close"></span></a>
                    </div>
                </div>
                <div className="main">
                    <h2>Congrats on reaching the last round!</h2>
                    {buttonClicked === false && <button onClick={() => {
                        fetchQuestion();
                        setButtonClicked(true);
                    }} className='q-button'>Get the Final Question!</button>}
                    {buttonClicked === true && question && (
                        <div className="question-container">
                            <h3>Final Question:</h3>
                            <div className="question"><p>{question.question}</p></div>
                            <div className="options">
                                {question.options.map((option, index) => (
                                    <button key={index} className="option-button" onClick={() => handleOptionClick(option)}>
                                        {option}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
            <Modal open={open} onClose={onCloseModal} center styles={{ modal: { backgroundColor: result === "Correct!" ? "#5dbb63" : "indianred" } }}>
                {result === "Correct!" ? (
                    <div className='modal-div'>
                        <h1 className='modal-text'>{result}</h1>
                        <img src={KBC} alt="" width={400} />
                        <p>Time: {istTime}</p>
                    </div>
                ) : (
                    <div className='modal-div'>
                        <h1 className='modal-text'>{result}</h1>
                        <img src={WRONG} alt="" width={400} />
                        <p>Time: {istTime}</p>
                    </div>
                )}
            </Modal>
        </div>
    );
};

export default Home;
