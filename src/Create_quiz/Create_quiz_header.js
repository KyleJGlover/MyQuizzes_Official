import React from 'react';
import {Link} from 'react-router-dom';
import './Create_quiz_header.css';

function Create_quiz_header() {
    return (
        <div className="create_quiz_header">
            <Link className="main_btn_create_quiz_container" to="/Main">
                <button className ="main_btn_create_quiz">Main</button> 
            </Link>
        </div>
    )
}

export default Create_quiz_header
