import ExplanationComponent from "../Explanation/ExplanationComponent ";
import ConfettiComponent from '../congrats/congrat'
import './ScoreCard.css'
const ScoreCard = ({ score, totalQuestions, answersData }) => {
    console.log(answersData, "Answer data")
    return (
      <div className="score-card">
        <div className="score-options">
          <button className="button-85" onClick={() => window.location.reload()}>Take the Next Quiz</button>
<div className="cong">
<ConfettiComponent isPassed={true}  score= {score} totalQuestions={totalQuestions} />

</div>
<div>  
            <ExplanationComponent answersData={answersData} />
            </div>
        </div>
      </div>
    );
  };
  
  export default ScoreCard;