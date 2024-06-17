import React, { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import './congrat.css'
const ConfettiComponent = ({ isPassed, score, totalQuestions }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (isPassed) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 10000);
      return () => clearTimeout(timer); 
    }
  }, [isPassed]);

  let message = '';
  if (score >= 10) {
    message = 'Excellent! You have aced the quiz!';
  } else if (score > 8) {
    message = 'Great job! You scored very well!';
  } else if (score > 5) {
    message = 'Good! You passed the quiz!';
  } else {
    message = 'Nice try! Keep practicing!';
  }

  return (
    <div className='container'>
      {isVisible && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
        />
      )}
      {isPassed && (
        <div className='message'>
          <h1>Congratulations!</h1>
          <h2>Your Score: {score} / {totalQuestions}</h2>
          <p>{message}</p>
        </div>
      )}
    </div>
  );
};



export default ConfettiComponent;
