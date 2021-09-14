import React,{ useState } from 'react';
import { Redirect } from 'react-router-dom';
import Axios from 'axios';
import './Register.css';
import Register_Form from './Register_Form';

function Register() {

    const[error, setError] = useState("");

    const RegisterApp = registerDetails =>{


console.log(registerDetails.email);
        Axios.post("http://localhost:3001/api/Register", {
            username: registerDetails.username,
            password: registerDetails.password,
            email: registerDetails.email,
        }).then((response) => {
            if (response.data.message) <Redirect to="./Logoin"/>
            console.log(response);
        });



    }
      
    return (     
        <div className="Sign_Up_container">
            <Register_Form registerDetails={RegisterApp} error={error}/>    
        </div>
           
    )
}

export default Register
