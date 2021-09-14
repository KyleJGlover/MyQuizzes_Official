import '../projectImg.jpg';
import './Main.css';
import {Link} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import profilePhoto from '../images/ProfilePicture.jpg';
import { pictures } from './pictureData'


function Main() {

    const [user, setUser] = useState(
       {
            username:"Kyle Glover",
            userPhoto: profilePhoto,
            quizzesTaken:10,
            quizzes:[
                {
                    quizName: "About Me",
                    numQuestions: 5,
                    averageScore:100,
                },
                {
                    quizName: "CSS",
                    numQuestions: 8,
                    averageScore: 50,
                },
                {
                    quizName: "HTML",
                    numQuestions: 10,
                    averageScore: 25,
                },
                {
                    quizName: "Java",
                    numQuestions: 15,
                    averageScore: 10,
                }
            ]
        }

    );

    const [friendUser, setFriendUser] = useState(
        [
            {
                username:"DJGlover",
                quizzesMade: 6,
                image: pictures.golden
            },
            {
                username:"Sierra1",
                quizzesMade: 2,
                image: pictures.doberman
            },
            {
                username:"Alyssa1",
                quizzesMade: 3,
                image: pictures.frenchy
            },
            {
                username:"Bernard12",
                quizzesMade: 7,
                image: pictures.poodle
            },
            {
                username:"Daulton1",
                quizzesMade: 10,
                image: pictures.pug
            },
            {
                username:"Kyle1",
                quizzesMade: 1,
                image: pictures.husky
            }
        ]
    )


    useEffect(() => {
        Axios.get("http://localhost:3001/api/Login").then((response) => {
            if(response.data.loggedIn === true){
            setUser(response.data[0].username);
            }
        })
      }, []);
    Axios.defaults.withCredentials = true;







    return (
        <div className="main_container">
            <div className="left_empty_container">
            <Link className="create_quiz_btn_link" to="/Create_quiz">
                <button className="create_quiz_btn">Create a Quiz!</button>
            </Link>
            </div>
            <div className="middle_content_container">
                <div className="user_data_container">
                    <div className="user_photo_container">
                        <img className="profile_photo" src={user.userPhoto}></img>
                    </div>
                    <div className="user_info_container">
                        <div className="info_list">
                            <label className="main_user_info">Username: {user.username}</label>
                            <br/>
                            <label className="main_user_info">Quizzes made: {user.quizzes.length}</label>
                            <br/>
                            <label className="main_user_info">Quizzes taken: {user.quizzesTaken}</label>
                        </div>
                    </div>
                </div>
                {/* This is a place holder for the array of quizzes STARTS      */}
                <div className="main_content_container">
                    {user.quizzes.map((quiz, index) => {
                        return(
                        <div className="quiz_container">
                            <div className="user_quizzes">
                                <div className="quiz_content_container">
                                    <label className="quiz_name_lbl">Quiz Name: {quiz.quizName}</label>
                                    <label className="num_questions_lbl">Number of Questions: {quiz.numQuestions}</label>
                                </div>
                            </div>
                            <div className="average_score">
                                <label>Success Rate: {quiz.averageScore}</label>
                                <progress value={quiz.averageScore}  max="100"/>
                            </div>                       
                        </div>
                        );
                    })}
                </div>
                {/* This is a place holder for the array of quizzes ENDS       */}
            </div>
            <div className="right_friend_container">
                <div className="friendlist_container">
                    <div className="friendlist_container_header">
                        <div className="friendlist_header_div">
                            <label className="friendlist_header">Friends List</label>
                        </div>
                    </div>
                    <div className="friend_in_friendlist_container">
                        {friendUser.map((user, index) => {
                            return(
                            <div className="friend_profile_list">
                                <div className="friendlist_image_container">
                                    <img className="user_image_friendlist" src={user.image}></img>
                                </div>
                                <div className="friendlist_user_content">
                                    <label className="friendlist_user_data">Username: {user.username}</label>
                                    <label className="friendlist_user_data">Quizzes Made: {user.quizzesMade}</label>
                                </div>
                            </div>
                            );
                        })}
                    </div>
                </div>
            </div>
    </div>
    )
}

export default Main
