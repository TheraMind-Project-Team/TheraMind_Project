import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './TestQuestion.css';

const TestQuestion = () => {
  const navigate = useNavigate();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [answers, setAnswers] = useState([]);

  // نظام توزيع الدرجات لكل إجابة
  const scoreMapping = {
    "Never": 0, "Not at all": 0,
    "Rarely": 1, "A little": 1,
    "Sometimes": 2, "Moderately": 2,
    "Often": 3, "Quite a bit": 3,
    "Always": 4, "Extremely": 4
  };

  const questions = [
    { id: 1, text: "How often do you feel nervous or anxious?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 2, text: "Do you experience rapid heartbeat or shortness of breath?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 3, text: "Do you worry excessively about everyday things?", options: ["Not at all", "A little", "Moderately", "Quite a bit", "Extremely"] },
    { id: 4, text: "Do you avoid certain situations because they make you anxious?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] },
    { id: 5, text: "Do you feel restless or on edge?", options: ["Never", "Rarely", "Sometimes", "Often", "Always"] }
  ];

  const handleAnswerSelect = (option) => {
    setSelectedAnswer(option);
  };

  const handleNext = () => {
    if (selectedAnswer !== null) {
      const currentScore = scoreMapping[selectedAnswer];
      const newAnswers = [...answers, currentScore];
      setAnswers(newAnswers);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
      } else {
        // حساب المجموع النهائي (أقصى درجة 20 لأن 5 أسئلة * 4 درجات)
        const totalScore = newAnswers.reduce((a, b) => a + b, 0);
        // تحويلها لنسبة مئوية
        const percentage = (totalScore / 20) * 100;
        
        // الانتقال لصفحة النتائج وإرسال النتيجة
        navigate('/Tests/Result', { state: { score: percentage } });
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      const lastAnswers = [...answers];
      lastAnswers.pop();
      setAnswers(lastAnswers);
      setSelectedAnswer(null);
    }
  };

  const handleExit = () => navigate('/tests');

  const progress = ((currentQuestion + 1) / questions.length) * 100;
  const currentQ = questions[currentQuestion];

  return (
    <div className="test-question-container">
      <div className="test-header">
        <button className="exit-btn" onClick={handleExit}>
          <svg viewBox="0 0 24 24" fill="none"><path d="M19 12H5M12 19l-7-7 7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          Exit
        </button>
        <span className="question-counter">Question {currentQuestion + 1} of {questions.length}</span>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>
      <p className="progress-text">{Math.round(progress)}% Complete</p>

      <div className="question-card">
        <h2 className="question-text">{currentQ.text}</h2>
        <div className="answers-list">
          {currentQ.options.map((option, index) => (
            <button
              key={index}
              className={`answer-option ${selectedAnswer === option ? 'selected' : ''}`}
              onClick={() => handleAnswerSelect(option)}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="navigation-buttons">
          <button className="nav-btn prev-btn" onClick={handlePrevious} disabled={currentQuestion === 0}>
             Previous
          </button>
          <button 
            className={`nav-btn next-btn ${selectedAnswer === null ? 'disabled' : ''}`}
            onClick={handleNext}
            disabled={selectedAnswer === null}
          >
            {currentQuestion === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TestQuestion;