import './Hero.css'
import QuizSelector from '../QuizSelector/QuizSelector';
const Hero = ({onSelectQuiz}) =>{
    return (
        <section className="hero-wrapper">
            {/* <Header/> */}
<div className="text-box">
    <h1>We Ensure better education <br/>
        for a better world</h1>
    <p>Our cutting-edge curriculum is designed to empower students with the knowledge, 
        skills, and <br/> experiences needed to excel in the dynamic field of education</p>
</div>

<div>   
    <h2> Take The Quiz </h2>
<QuizSelector  onSelectQuiz={onSelectQuiz} />
</div>
        </section>
    )
}

export default Hero;