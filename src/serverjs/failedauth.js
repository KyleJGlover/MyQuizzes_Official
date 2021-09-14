// const mysql = require("mysql");
// const express = require("express");
// const cors = require("cors");

// const cookieParser = require ("cookie-parser");
// const session = require ("express-session");

// const bcrypt = require("bcrypt");
// const { default: e } = require("express");
// const saltRounds = 10;

// const jwt = require('jsonwebtoken');

// const app = express();

// app.use(express.json());
// app.use(cors({
//     origin:["http://localhost:3000"], 
//     methods: ["GET", "POST"], 
//     credentials: true
// }));

// app.use(cookieParser());
// app.use(express.urlencoded({extended: true}));

// app.use(session({
//     key:"userId",
//     secret: "MyQuizWebsite", 
//     resave: false,
//     saveUnintialized: false,
//     cookie:{
//         expires: 60 * 60 * 24,
//     },

// }))

// const db = mysql.createConnection({
//   host     : '127.0.0.1',
//   user     : 'root',
//   password : 'password',
//   database : 'quizzes_online'
// });

// app.get('/api/users', (req, res) => {
//     db.query("SELECT * from users",
//     (err, result) => {
//         console.log(err);
//         console.log(result);
//         res.json(result);
//     });
// });

// const verifyJWT = (req, res, next) =>{
//     const token = req.headers["x-access-token"]

//     if(!token) {
//         res.send("need a token");
//     } else{
//         jwt.verify(token, "MyQuizWebsite", (err, decoded) => {
//             if(err) {
//                 res.json({auth:false, message: "failed to authenticate"})
//             } else {
//                 req.userId = decoded.id;
//                 next();
//             }
//         })
//     }
// }

// app.get('/api/isUserAuth', verifyJWT,(req, res) => {
//     res.send("Yo, you are authenticated Congrats!")
// })

// app.get('/api/Login', (req, res) => {
//     if (req.session.user) {
//        res.send({loggedIn: true, user: req.session.user});
//     } else{
//         res.send({loggedIn: false});
//     }
// });

// app.post('/api/Login', (req, res) => {

//     const email = req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;

//     db.query(
//         "SELECT * FROM users WHERE email = ? AND username = ?;", 
//         [email, username],
//         (err, result) => {
//             if(err){
//                 console.log({err:err});
//             }

//             if(result.length > 0){
//                 bcrypt.compare(password, result[0].password, (error, response) => {
//                     if (response){
//                         const id = result[0].id;
//                         const token = jwt.sign({id}, "MyQuizWebsite", {
//                             expiresIn: 300,
//                         })
//                         req.session.user = result;

//                         res.json({
//                             auth:true,
//                             token:token,
//                             result: result
//                         });
//                     } else {
//                         res.json({
//                             auth: false,
//                             message: "Wrong username/password combination!"})
//                     }
//                 });
//             }else {
//                 res.json({
//                     auth: false,
//                     message:"no user exists"})
//             }
//         }
//     );
// });


// app.post('/api/Register', (req, res) => {

//     const email = req.body.email;
//     const username = req.body.username;
//     const password = req.body.password;

//     bcrypt.hash(password, saltRounds, (err, hash) =>{
        
//         if(err) {
//             console.log(err)
//         }

//         db.query(
//             "INSERT INTO users (email, username, password) VALUES (?,?,?)", 
//             [email, username, hash],
//             (err, result) => {
//                 if(err){
//                     console.log({err:err});
//                 } else{
//                     res.send({message:"account created!"})
//                 }
//             }
//         );

//     })


    
// });

// app.listen(3001, () => {
//     console.log("running server");
// });

