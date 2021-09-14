import React, {useState} from'react';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';


function Register_Form({registerDetails}){

    const[details, setDetails] = useState({username:"",email:"", password:"", confirm_Password:"" });
    const[error, setError] = useState("The passwords didn't match!");

        const submitHandler = e =>{
            e.preventDefault();
            console.log({details});
            console.log(details.password);
            console.log(details.confirm_Password);

            if (details.password !== details.confirm_Password){
            setDetails({password:"", confirm_Password:""}) 
            alert(error);
            }
            else{

            registerDetails(details);
            setDetails({username:"",email:"", password:"", confirm_Password:"" });
            }
        }

    return(
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={submitHandler} className="Sign_Up_form">
                        <h3 className="sign_up_title">Sign Up</h3>

                        <div className="form-group">
                            <label className="Sign_up_lbl">Username: </label>
                            <input name ="username" type="text" className="form-control" placeholder="Last name" 
                            onChange={e =>setDetails({...details, username: e.target.value})} value={details.username}/>
                        </div> 

                        <div className="form-group">
                            <label className="Sign_up_lbl">Email address: </label>
                            <input name='email' type="email" className="form-control" placeholder="Enter email"
                            onChange={e =>setDetails({...details, email: e.target.value})} value={details.email}/>
                        </div>

                        <div className="form-group">
                            <label className="Sign_up_lbl">Password: </label>
                            <input name='password' type="password" className="form-control" placeholder="Enter password"
                            onChange={e =>setDetails({...details, password: e.target.value})} value={details.password}/>
                        </div>
                        <div className="form-group">
                            <label className="Sign_up_lbl">Confirm Password: </label>
                            <input  name='Confirm_Password' type="password" className="form-control" placeholder="Enter password"
                            onChange={e =>setDetails({...details, confirm_Password: e.target.value})} value={details.confirm_Password}/>
                        </div>

                        <button type="submit" className="Sign_Up_submit_btn">Sign Up</button>
                        <p className="forgot-password text-right">
                            Already registered <a href="/Login">sign in?</a>
                        </p>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
    )
}

export default Register_Form