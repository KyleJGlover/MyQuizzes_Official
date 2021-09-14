import React from 'react';
import {Link} from 'react-router-dom';
import './QuizHeader.css';
import { IoApertureSharp } from "react-icons/io5";


function QuizHeader() {
    return (
        <div className="quiz_header">
            <Link className="link" to="/">
                <div className="header_logo"><IoApertureSharp size={90}/></div>
            </Link>
            <Link className="main_btn_quiz_container" to="/Main">
                <button className ="main_btn_quiz">Main</button> 
            </Link>
            <Link className="link" to="/">
                <div className="header_logo"><IoApertureSharp size={90}/></div>
            </Link>
        </div>
    )
}

export default QuizHeader
