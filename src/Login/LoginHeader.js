import React from 'react';
import {Link} from 'react-router-dom';
import { IoApertureSharp } from "react-icons/io5";
import './LoginHeader.css'

function LoginHeader() {
    return (
        <div className="header">
            <Link className="link" to="/">
                <div className="header_logo"><IoApertureSharp size={90}/></div>
            </Link>
            
            <div className="login_title_div">
                <h1>Welcome to Personalized Quizzes</h1>
            </div>

            <Link className="register_btn" to="/register">
                <button className ="header_btn">Create New Account</button>
            </Link>
        </div>
    )
}

export default LoginHeader
