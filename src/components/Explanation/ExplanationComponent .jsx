import React from 'react';
import './ExplanationComponent.css'; 

const ExplanationComponent = ({ answersData }) => {
  console.log(answersData , "Anwer data form explanation")
  return (
    <div className="explanation-container">
      <h2>Quiz Explanations</h2>
      {answersData.map((answer, index) => (
        <div key={index} className="question-container">
          <h3>Question {index + 1}: {answer.question}</h3>
          <div className="options-container">
            {answer.options.map((option, i) => (
              <div
                key={i}
                className={`option ${option === answer.correctOption ? 'correct' : ''} 
                            ${option === answer.selectedOption && !answer.isCorrect ? 'wrong' : ''}
                            ${option === answer.selectedOption ? 'selected' : ''}`}
              >
                {option}
                {option === answer.correctOption && <span className="icon correct-icon">✔</span>}
                {option === answer.selectedOption && !answer.isCorrect && <span className="icon wrong-icon">✖</span>}
              </div>
            ))}
          </div>
          <div className="explanation">
            <strong>Explanation:</strong> {answer.explanation}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExplanationComponent;
