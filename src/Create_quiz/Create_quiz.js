import './Create_quiz.css';
import React,{ useState, useEffect } from 'react';
import Axios from 'axios';


function Create_quiz() {
    
    //This will store the quiz in session storage
    const intialStateCounter = () =>(Number(window.sessionStorage.getItem('questionCounter'))) || 1;
    const intialStateQuiz = () =>(Number(window.sessionStorage.getItem('quizObject'))) || [];
    const intialStateQuizName = () =>(Number(window.sessionStorage.getItem('QuizName'))) || "";

    const [quizObject, setQuizObject] = useState(intialStateQuiz);

    const [quizName, setQuizName] = useState(intialStateQuizName);

    const [questionCounter, setQuestionCounter] = useState(intialStateCounter);

    const [formContents, setformContents] = useState({isCorrect:"", question:"", answer1:"", answer2:"", answer3: "", answer4:""});


    Axios.defaults.withCredentials = true;
    
    useEffect(()=>{
    
        // window.sessionStorage.setItem('questionCounter', questionCounter );
        // window.sessionStorage.setItem('quizObject', quizObject );
        // setQuizName(window.sessionStorage.setItem('QuizName', quizName ));
        console.log(quizName);
    }, [questionCounter, quizObject, quizName])

    const onSubmitName = name =>{
        name.preventDefault();
        setQuizName(name);
        window.sessionStorage.setItem('QuizName', quizName );
    }

    const onSubmit = (data)=> {
        data.preventDefault();

        var isCorrect1 = false;
        var isCorrect2 = false;
        var isCorrect3 = false;
        var isCorrect4 = false;

        switch(formContents.isCorrect) {
            case 'question1':
                isCorrect1 = true;
                break;
            case 'question2':
                isCorrect2 = true;
                break;
            case 'question3':
                isCorrect3 = true;
                break;
            default:
                isCorrect4 = true;
        }
        var question = formContents.question;
        var answer1 = formContents.answer1;
        var answer2 = formContents.answer2;
        var answer3 = formContents.answer3;
        var answer4 = formContents.answer4;
        
        var isCorrect = [isCorrect1, isCorrect2, isCorrect3, isCorrect4]

        const answerOptions = [ answer1, answer2, answer3, answer4, isCorrect];

        const questionContents = {question, answerOptions};

        setQuizObject(quizObject =>{ 
            return [...quizObject, questionContents];   
        });

        console.log(quizObject);

        setQuestionCounter(questionCounter+1);

        document.getElementById("quizInfo").reset();
    }


    function finishQuiz(){

        //Submit data to the data base
        console.log(quizName);
        console.log(quizObject);
        const user_id = sessionStorage.getItem("user");
        console.log(typeof (parseInt(user_id)));

        for(var i = 0;i<quizObject.length;i++){

        const quiz_id= 0;
        const question_id= 0;


        Axios.post("http://localhost:3001/api/Create_quiz/quiz_name", {
            quizName: "quizName",
        }).then((response) => {
            console.log(response.data.message);
        });
        // This will attach the quiz id to the question 
        Axios.get("http://localhost:3001/api/Create_quiz/questions", {
            quizName: "quizName",
        }).then((response) => {
            response = quiz_id;
        });

        Axios.post("http://localhost:3001/api/Create_quiz/questions", {
            quiz_id: quiz_id, 
            question: quizObject[i].question,
        }).then((response) => {
            console.log(response.data.message);
        });

        Axios.get("http://localhost:3001/api/Create_quiz/question_choices", {
            question: quizObject[i].question,
        }).then((response) => {
            response = question_id;
        });
        //logic for storing the multiple choice questions
            for(var i = 0;i< 4;i++){
                Axios.post("http://localhost:3001/api/Create_quiz/question_choices", {
                    question_id: question_id,
                    choice_text: quizObject[i].answerOptions[i],
                    isCorrect: quizObject[i].answerOptions[4].isCorrect[i]
                }).then((response) => {
                    console.log(response.data.message);
                });
            }
        

    }
    //will remove all session Storages
        window.sessionStorage.removeItem('questionCounter');
        window.sessionStorage.removeItem('quizObject');
        window.sessionStorage.removeItem('quizName');
    }
    
    return (
        <div className="create_quiz_container">
            {(quizName === "") ? (
            <form onSubmit={onSubmitName} className="quiz_name">
                    <input type= "text" name="quizName" placeholder=" Quiz Name" />
                    <button type="submit" className="quiz_next_btn" name="quiz_next_btn">Submit</button>
            </form>        
            ):(
                <div className='create_quiz_app'>
                    <div className = "create_quiz_question_container">
                        
                            <div className='create_quiz_question_count'>
                                <h2 style={{margin: "10px"}}>Question {questionCounter}</h2>
                            </div>
                            <form id = "quizInfo" onSubmit={onSubmit}>
                                    <input type="text" className="create_question" name = "question" placeholder="Question Text" 
                                    onChange={e =>setformContents({...formContents, question: e.target.value})} value={formContents.question}/>
                                <div className='create_answer_section'>
                                    
                                    <div className="create_form_group">
                                        <input type="text" className="create_answer" name= "answer1" placeholder="Answer 1" 
                                        onChange={e =>setformContents({...formContents, answer1: e.target.value})} value={formContents.answer1}/>
                                                
                                    </div>
                                    <div className="create_form_group">
                                        <input type="text" className="create_answer" name= "answer2" placeholder="Answer 2" 
                                        onChange={e =>setformContents({...formContents, answer2: e.target.value})} value={formContents.answer2}/>
                                        

                                    </div>
                                    <div className="create_form_group">
                                        <input type="text" className="create_answer" name= "answer3" placeholder="Answer 3" 
                                        onChange={e =>setformContents({...formContents, answer3: e.target.value})} value={formContents.answer3}/>
                                        

                                    </div>
                                    <div className="create_form_group">
                                        <input type="text" className="create_answer" name= "answer4" placeholder="Answer 4" 
                                        onChange={e =>setformContents({...formContents, answer4: e.target.value})} value={formContents.answer4}/>
                                    
                                    </div> 
                                    <select id="iscorrect" name="isCorrect"
                                    onChange={e =>setformContents({...formContents, isCorrect: e.target.value})} value={formContents.isCorrect} >
                                            <option value= "question1">Question 1</option>
                                            <option value= "question2">Question 2</option>
                                            <option value= "question3">Question 3</option>
                                            <option value= "question4">Question 4</option>
                                        </select>                               
                                    </div>
                                    <button type="submit" className="quiz_next_btn" name="quiz_next_btn">Submit</button>
                                    
                        </form>
                        <button className="quiz_submit_btn" name="quiz_submit_btn" onClick={finishQuiz}>Finish</button>
                        </div>
                    
                    </div>
                )} 
                    
        </div>
    )
}

export default Create_quiz
