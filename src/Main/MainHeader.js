import React from 'react';
import {Link} from 'react-router-dom';
import { IoApertureSharp } from "react-icons/io5";
import './MainHeader.css'

function MainHeader() {
    return (
        <div className="header">
            <Link className="link" to="/">
                <div className="header_logo"><IoApertureSharp size={90}/></div>
            </Link>
        
            <div className="title_div">
                <h1>Welcome to Personalized Quizzes</h1>
            </div>

            <Link className="register_btn" to="/login">
                <button className ="header_btn">Sign Out</button>
            </Link>
        </div>
    )
}

export default MainHeader
