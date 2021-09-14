import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginHeader from "./Login/LoginHeader.js";
import Login from "./Login/Login.js";
import RegisterHeader from "./Register/RegisterHeader.js";
import Register from "./Register/Register.js";
import QuizHeader from "./Quiz/QuizHeader.js";
import Quiz from "./Quiz/Quiz.js";
import MainHeader from "./Main/MainHeader.js";
import Main from "./Main/Main.js";
import Create_quiz_header from "./Create_quiz/Create_quiz_header.js";
import Create_quiz from "./Create_quiz/Create_quiz.js";


function App() {


  return (
    <div className="App">
      <div className="inner_app">
      <Router>
        <Switch>
        <Route exact path="/">
            <LoginHeader/>
            <Login />
        </Route>
        <Route path="/Login">
          <LoginHeader/>
          <Login />
        </Route>
        <Route path ="/Register">
          <RegisterHeader />
          <Register />
        </Route>
        <Route path ="/Main">
          <MainHeader />
          <Main />
        </Route>
        <Route path="/Quiz">
          <QuizHeader/>
          <Quiz/>
        </Route>
        <Route path="/Create_quiz">
          <Create_quiz_header/>
          <Create_quiz/>
        </Route>
        </Switch>
      </Router>
      </div>
    </div>
  );
}

export default App;
