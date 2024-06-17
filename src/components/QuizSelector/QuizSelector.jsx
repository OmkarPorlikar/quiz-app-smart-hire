import React from 'react';
import './QuizSelector.css'; 

const QuizSelector = ({ onSelectQuiz }) => {
  const handleQuizSelection = (event) => {
    onSelectQuiz(event.target.value);
  };

  return (
    <div className="quiz-selector">
      <h2>Select Quiz Topic</h2>
      <select className="quiz-select" onChange={handleQuizSelection}>
        <option value="">Select a quiz</option>
        <option value="react">React</option>
        <option value="html">HTML</option>
        <option value="css">CSS</option>
        <option value="js">JavaScript</option>
      </select>
    </div>
  );
};

export default QuizSelector;
