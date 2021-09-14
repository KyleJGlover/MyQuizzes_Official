import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import './Login.css';
import Login_Form from './Login_Form';
import Axios from 'axios';


function Login() {

    const intialStateQuizName = () =>(Number(window.sessionStorage.getItem('user'))) || "";

    const [user, setUser] = useState(intialStateQuizName);
    const [error, setError] = useState("");
    const [loginError, setLoginError] = useState("");
    
    useEffect(() => {
        // Axios.get("http://localhost:3001/api/Login").then((response) => {
        //     if(response.data.loggedIn == true){
        //     setUser(response.data.user[0].username);
        //     }
            
        // })
      }, []);
      
    Axios.defaults.withCredentials = true;
    const LoginApp = loginDetails =>{
        
console.log (loginDetails.email);
        Axios.post("http://localhost:3001/api/Login", {
            username: loginDetails.username,
            password: loginDetails.password,
            email: loginDetails.email
        }).then((response) => {
            if (response.data.message){
                setLoginError(response.data.message);
            }   else {
                console.log(response);
                setUser(response.data[0].username);

                sessionStorage.setItem('user', response.data[0].user_id)
                console.log (sessionStorage.getItem("user"));
                console.log(user);
                <Redirect to="/Home"/>
            }
        });  
    }

    const Logout = () =>{
        sessionStorage.removeItem("user");
        setUser("");
    }


    return (
        <div className="Login_container">
            <div className = "error_message">
                <h1>{loginError}</h1>
            </div>
            {(user !== "") ? (
                <div className="welcome">
                    <h2>Welcome, <span>{user}</span></h2>
                    <button onClick={Logout}>Logout</button>
                </div> 
            ): (
            <Login_Form loginDetails={LoginApp} error={error}/>)}
            
        </div>
    )
}

export default Login
