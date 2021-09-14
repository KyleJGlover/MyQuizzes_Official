const mysql = require("mysql");
const express = require("express");
const cors = require("cors");

const cookieParser = require ("cookie-parser");
const session = require ("express-session");

const bcrypt = require("bcrypt");
const { default: e } = require("express");
const saltRounds = 10;

const app = express();

app.use(express.json());
app.use(cors({
    origin:["http://localhost:3000"], 
    methods: ["GET", "POST"], 
    credentials: true
}));

app.use(cookieParser());
app.use(express.urlencoded({extended: true}));

app.use(session({
    key:"userId",
    secret: "MyQuizWebsite", 
    resave: false,
    saveUnintialized: false,
    cookie:{
        expires: 60 * 60 * 24,
    },

}))

const db = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'password',
  database : 'quizzes_online'
});

app.get('/api/users', (req, res) => {
    db.query("SELECT * from users",
    (err, result) => {
        console.log(err);
        console.log(result);
        res.json(result);
    });
});

app.get('/api/Logout', (req, res) => {
    if (req.session.user) {
        {req.session.destroy()};
        res.send({message: "user has been logged out!"})
     }
});

app.get('/api/Login', (req, res) => {
    if (req.session.user) {
       res.send({loggedIn: true, user: req.session.user});
    } else{
        res.send({loggedIn: false});
    }
});

app.post('/api/Login', (req, res) => {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    db.query(
        "SELECT * FROM users WHERE email = ? AND username = ?;", 
        [email, username],
        (err, result) => {
            if(err){
                console.log({err:err});
            }

            if(result.length > 0){
                bcrypt.compare(password, result[0].password, (error, response) => {
                    if (response){
                        req.session.user = result.data;
                        console.log(req.session.user);
                        res.send(result);
                    } else {
                        res.send({message: "Wrong username/password combination!"})
                    }
                });
            }else {
                res.send({message: "User doesn't exist!"})
            }
        }
    );
});

app.post('/api/Register', (req, res) => {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;
    console.log(email)

    bcrypt.hash(password, saltRounds, (err, hash) =>{
        
        if(err) {
            console.log(err)
        }

        db.query(
            "INSERT INTO users (email, username, password) VALUES (?,?,?)", 
            [email, username, hash],
            (err, result) => {
                if(err){
                    console.log({err:err});
                } else{
                    res.send({message:"account created!"})
                }
            }
        );

    })   
});

app.post('/api/Register', (req, res) => {

    const email = req.body.email;
    const username = req.body.username;
    const password = req.body.password;

    bcrypt.hash(password, saltRounds, (err, hash) =>{
        
        if(err) {
            console.log(err)
        }

        db.query(
            "INSERT INTO users (email, username, password) VALUES (?,?,?)", 
            [email, username, hash],
            (err, result) => {
                if(err){
                    console.log({err:err});
                } else{
                    res.send({message:"account created!"})
                }
            }
        );

    })   
});

app.post('/api/Create_quiz/quiz_name', (req, res) => {
    //console.log(req.session.user.data.user_Id);
    const quiz_Name = req.body.quiz_Name;

    db.query(
        "INSERT INTO quiz_names (quiz_Name) VALUES (?)", 
        [quiz_Name],
        (err, result) => {
            if(err){
                console.log({err:err});
            } else{
                res.send({message:"name created!"})
            }
        }
    );
});




//will grab the unique id for the quiz
app.get('/api/Create_quiz/questions', (req, res) => {

    const quiz_Name = req.body.quiz_Name;

    db.query("SELECT quiz_id from quiz_names = ?",
    [quiz_Name],
    (err, result) => {
        if(err){
            console.log({err:err});
        } else{
            res.send(result.data[0].quiz_id);
        }
    });

});
/// This will attach the quiz id to the question 
app.post('/api/Create_quiz/questions', (req, res) => {
    //console.log(req.session.user.data.user_Id);
    const quiz_id = req.body.quiz_Id;
    const question = req.body.question;

    db.query("INSERT INTO questions (quiz_id, question) VALUES (?,?)", 
        [quiz_id, question],
        (err, result) => {
            if(err){
                console.log({err:err});
            } else{
                res.send({message:"question created!"})
            }
        }
    );
});



//This will be recording the question answers and will store which is true/false
app.get('/api/Create_quiz/question_choices', (req, res) => {
    //console.log(req.session.user.data.user_Id);
    const question = req.body.question;

    db.query(
        "SELECT question_id from questions WHERE question = ?", 
        [question],
        (err, result) => {
            if(err){
                console.log({err:err});
            } else{
                res.send(result.data.question_id)
            }
        }
    );
});
app.post('/api/Create_quiz/question_choices', (req, res) => {
    //console.log(req.session.user.data.user_Id);
    const question_id = req.body.question_id;
    const choice_text = req.body.answertext;
    const isCorrect = req.body.isCorrect;

    db.query(
        "INSERT INTO questions_choices (question_id, choice_text, isCorrect) VALUES (?,?,?)", 
        [question_id, choice_text, isCorrect],
        (err, result) => {
            if(err){
                console.log({err:err});
            } else{
                res.send({message:"Quiz choices stored!"})
            }
        }
    );
});


//This will be for scoring the user on the quiz
app.post('/api/Create_quiz/user_question_answers', (req, res) => {
    //console.log(req.session.user.data.user_Id);
    const question_id = req.body.question_id;
    const choice_id = req.body.isCorrect;
    const choice_text = req.body.quizName;

    db.query(
        "INSERT INTO questions (question_id, choice_id, choice_text) VALUES (?,?,?)", 
        [question_id, choice_id, choice_text],
        (err, result) => {
            if(err){
                console.log({err:err});
            } else{
                res.send({message:"answers stored!"})
            }
        }
    );
});

app.listen(3001, () => {
    console.log("running server");
});

