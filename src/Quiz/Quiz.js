import React, { useState } from 'react';
import './Quiz.css'

export default function Quiz() {
	const questions = [
		{
			questionText: 'What is the capital of France?',
			answerOptions: [
				{ answerText: 'New York', isCorrect: false },
				{ answerText: 'London', isCorrect: false },
				{ answerText: 'Paris', isCorrect: true },
				{ answerText: 'Dublin', isCorrect: false },
			],
		},
		{
			questionText: 'Who is CEO of Tesla?',
			answerOptions: [
				{ answerText: 'Jeff Bezos', isCorrect: false },
				{ answerText: 'Elon Musk', isCorrect: true },
				{ answerText: 'Bill Gates', isCorrect: false },
				{ answerText: 'Tony Stark', isCorrect: false },
			],
		},
		{
			questionText: 'The iPhone was created by which company?',
			answerOptions: [
				{ answerText: 'Apple', isCorrect: true },
				{ answerText: 'Intel', isCorrect: false },
				{ answerText: 'Amazon', isCorrect: false },
				{ answerText: 'Microsoft', isCorrect: false },
			],
		},
		{
			questionText: 'How many Harry Potter books are there?',
			answerOptions: [
				{ answerText: '1', isCorrect: false },
				{ answerText: '4', isCorrect: false },
				{ answerText: '6', isCorrect: false },
				{ answerText: '7', isCorrect: true },
			],
		},
	];
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);
  
  const handleAnswerButtonClick = (isCorrect) =>{

    if (isCorrect === true){
      const currentScore = score + 1;
      setScore(currentScore);
    }
    const nextQuestion = currentQuestion + 1;
    if(nextQuestion < questions.length){
      setCurrentQuestion(nextQuestion);
    }else{
      setShowResults(true);
    }
  }

	return (
        <div className='quiz_app_container'>
            <div className='quiz_app'>
                {showResults ? (
                    <div className='score-section'>You scored {score} out of {questions.length}</div>
                ) : (
                    <div className = "quiz_question_container">
                        <div className='question-section'>
                            <div className='question-count'>
                                <span>Question {currentQuestion + 1}</span>
                            </div>
                            <div className='question-text'>{questions[currentQuestion].questionText}
                        </div>
                        <div className='answer-section'>
                            {questions[currentQuestion].answerOptions.map((answerOptions)=>
                <button className="questions_btn" onClick={()=> handleAnswerButtonClick(answerOptions.isCorrect)}> {answerOptions.answerText}</button>
                )}</div>
                        </div>
                    </div>
                )}
            </div>
        </div>
	);
}