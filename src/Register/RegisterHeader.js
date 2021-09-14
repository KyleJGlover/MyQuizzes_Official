import React from 'react';
import {Link} from 'react-router-dom';
import { IoApertureSharp } from "react-icons/io5";
import './RegisterHeader.css';



function RegisterHeader() {
    return (
        <div className="header">
            <Link className="link" to="/">
                <div className="header_logo"><IoApertureSharp size={90}/></div>
            </Link>
            
            <div className="login_title_div">
                <h1>Welcome to Personalized Quizzes</h1>
            </div>

            <Link className="register_btn" to="/login">
                <button className ="header_btn">Login</button>
            </Link>
        </div>
    )
}

export default RegisterHeader
