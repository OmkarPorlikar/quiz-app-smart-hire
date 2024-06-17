import React, { useState, useEffect, useRef } from 'react';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import screenfull from 'screenfull'; 
import './QuizComponent.css'; 
import {quizData} from '../../utils/mcq'; 
import ScoreCard from '../ScoreCard/ScoreCard';
import FullScreenCompo from '../FullScreen/FullScreenCompo';
import Hero from '../Hero/Hero'

const QuizComponent = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answersData, setAnswersData] = useState([]);
  const [questionTimeLeft, setQuestionTimeLeft] = useState(60);
  const [totalTimeLeft, setTotalTimeLeft] = useState(600);
  const [score, setScore] = useState(0); 
  const [isQuizCompleted, setIsQuizCompleted] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); 
  const [selectedQuiz, setSelectedQuiz] = useState(''); 
  const questionTimerRef = useRef(null);
  const totalTimerRef = useRef(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFullscreen = screenfull.isFullscreen;
      setIsFullScreen(isFullscreen);
      if (isFullscreen) {
        startTimers();
      } else {
        stopTimers();
      }
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange);
    }

    return () => {
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullscreenChange);
      }
      stopTimers();
    };
  }, []);

  useEffect(() => {
    if (selectedQuiz) {
      localStorage.setItem('selectedQuiz', selectedQuiz);
      resetQuiz();
    }
  }, [selectedQuiz]);

  const startTimers = () => {
    if (!questionTimerRef.current) {
      questionTimerRef.current = setInterval(() => {
        setQuestionTimeLeft(prev => {
          if (prev <= 1) {
            handleNextQuestion();
            return 60;
          }
          return prev - 1;
        });
      }, 1000);
    }

    if (!totalTimerRef.current) {
      totalTimerRef.current = setInterval(() => {
        setTotalTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(totalTimerRef.current);
            totalTimerRef.current = null;
            setIsQuizCompleted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
  };

  const stopTimers = () => {
    if (questionTimerRef.current) {
      clearInterval(questionTimerRef.current);
      questionTimerRef.current = null;
    }
    if (totalTimerRef.current) {
      clearInterval(totalTimerRef.current);
      totalTimerRef.current = null;
    }
  };

  const handleFullScreen = () => {
    if (screenfull.isEnabled) {
      screenfull.request().catch(err => {
        console.error('Failed to enable full-screen mode:', err);
      });
    }
  };

  


  const handleAnswerClick = (option) => {
    if (selectedAnswer === option) {
      // Deselect if the same option is clicked again
      setSelectedAnswer(null);
    } else {
      // Select the new option
      setSelectedAnswer(option);
    }
  
    const currentQuestion = quizData.quizData[selectedQuiz].questions[currentQuestionIndex];
    const isCorrect = option === currentQuestion.answer;
  
    const answerDetails = {
      question: currentQuestion.question,
      selectedOption: option,
      correctOption: currentQuestion.answer,
      explanation: currentQuestion.explanation,
      isCorrect: isCorrect,
      options: currentQuestion.options,
    };
  
    // Update answers data
    const updatedAnswersData = answersData.filter(
      (answer) => answer.question !== currentQuestion.question
    );
  
    setAnswersData([...updatedAnswersData, answerDetails]);
  
    // Update score
    if (isCorrect && selectedAnswer !== option) {
      setScore((prevScore) => prevScore + 1);
    } else if (!isCorrect && selectedAnswer === currentQuestion.answer) {
      setScore((prevScore) => prevScore - 1);
    }
  };
  
      
  
  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizData.quizData[selectedQuiz].questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setQuestionTimeLeft(60);
    } else {
      stopTimers();
      setIsQuizCompleted(true);
    }
  };

  const handleReset = () => {
    resetQuiz();
    setSelectedQuiz('')
    setIsQuizCompleted(false)
    console.log(isQuizCompleted ,"quiz no ts ocmpler ete")
  };

  const handleSubmitQuiz = () => {
    stopTimers();
    setIsQuizCompleted(true);
  };

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setQuestionTimeLeft(60);
    setTotalTimeLeft(600);
    setAnswersData([]);
    setScore(0); 
    // setSelectedQuiz('')
  };

  const getTimerColor = (timeLeft) => {
    if (timeLeft > 30) {
      return 'green';
    } else if (timeLeft > 10) {
      return 'yellow';
    } else {
      return 'red';
    }
  };

  console.log(selectedQuiz , "Selected quiz")
  console.log(quizData , "quizData")
//   console.log(quizData.quizData. , "lawda lusuan")
  const currentQuestion = selectedQuiz ? quizData.quizData[selectedQuiz]?.questions[currentQuestionIndex] : null;
  console.log(currentQuestion , "current question")
console.log(isQuizCompleted , "quiz completed")
  return (
    <div className="quiz-container">
  {!selectedQuiz ? (
    <Hero onSelectQuiz={setSelectedQuiz} />
  ) : !isFullScreen ? (
    <FullScreenCompo handleFullScreen={handleFullScreen} handleReset={handleReset}/>
  ) : !isQuizCompleted ? (
    <>
      <div className="quiz-timer">
        <div className="question-timer">
          <CircularProgressbar
            value={questionTimeLeft}
            maxValue={60}
            text={`${questionTimeLeft}s`}
            styles={buildStyles({
              pathColor: getTimerColor(questionTimeLeft),
              textColor: '#fff',
              trailColor: '#ddd',
            })}
          />
        </div>
        <div className="total-timer">
          <CircularProgressbar
            value={totalTimeLeft}
            maxValue={600}
            text={`${Math.floor(totalTimeLeft / 60)}:${totalTimeLeft % 60}`}
            styles={buildStyles({
              pathColor: getTimerColor(totalTimeLeft),
              textColor: '#fff',
              trailColor: '#ddd',
            })}
          />
        </div>
      </div>
      <div className="question-section">
        <h2>Question {currentQuestionIndex + 1}</h2>
        <p>{currentQuestion.question}</p>
        <div className="options">
          {currentQuestion.options.map((option) => (
            <button
              key={option}
              className={`option-button button-17
                ${isAnswered && option === currentQuestion.answer ? 'correct' : ''}
                ${isAnswered && option !== currentQuestion.answer && option === selectedAnswer ? 'incorrect' : ''}
                ${option === selectedAnswer ? 'selected' : ''}`}
              onClick={() => handleAnswerClick(option)}
            >
              {option}
            </button>
          ))}
        </div>
        <div>
          <button className="button-85" onClick={handleReset}>Reset</button>
        </div>
        {selectedAnswer && (
          <div className="navigation-buttons">
            {currentQuestionIndex < quizData.quizData[selectedQuiz].questions.length - 1 ? (
              <button onClick={handleNextQuestion}>Next Question</button>
            ) : (
              <button onClick={handleSubmitQuiz}>Submit Quiz</button>
            )}
          </div>
        )}
      </div>
    </>
  ) : (
    <ScoreCard score={score} totalQuestions={quizData.quizData[selectedQuiz].questions.length} answersData={answersData} />
  )}
</div>

  );
};


export default QuizComponent;
