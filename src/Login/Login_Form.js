import React,{ useState } from 'react';
// import Login from './Login';
import { MDBContainer, MDBRow, MDBCol, MDBBtn } from 'mdbreact';


function Login_Form({loginDetails, error}) {

    const [details, setDetails] = useState({email:"", password:"", username:""});

    const submitHandler = e =>{ 
        e.preventDefault();
        loginDetails(details);

        setDetails({email:"", password:"", username:""});
    }



    return (
        <MDBContainer>
            <MDBRow>
                <MDBCol md="6">
                    <form onSubmit={submitHandler} className="Login_form">
                        <div className="form-inner">
                            <h3 className="title-text">Login</h3>
                            {(error !=="") ? ( <div className="error">{error}</div> ) : ""}

                            <div className="form-group">
                            <label htmlFor="defaultFormLoginEmailEx" className="white-text">
                                Your email
                            </label>
                                <input name="username" type="text" className="form-control" placeholder="Username" 
                                onChange={e =>setDetails({...details, username: e.target.value})} value={details.username}/>
                            </div>

                            <div className="form-group">
                                <label className="Login_lbl" htmlFor="email">Email:</label>
                                <input name="email" type="email" className="form-control" placeholder="Email" 
                                onChange={e =>setDetails({...details, email: e.target.value})} value={details.email}/>
                            </div>

                            <div className="form-group">
                                <label className="Login_lbl" htmlFor="password">Password:</label>
                                <input name="password" type="text" className="form-control" placeholder="Password" 
                                onChange={e =>setDetails({...details, password: e.target.value})} value={details.password}/>
                            </div>
                            
                            <button type="submit" className="Login_submit_btn" value="Submit">Submit</button>
                            <p className="forgot-password text-right">
                            </p>
                        </div>
                    </form>
                </MDBCol>
            </MDBRow>
        </MDBContainer>
/*

<form onSubmit={submitHandler} className="Login_form">
                        <div className="form-inner">
                            <p className="h4 text-center mb-4">Login</p>
                            {(error !=="") ? ( <div className="error">{error}</div> ) : ""}

                            <div className="form-group">
                                <label className="Login_lbl" htmlFor="name">Username:</label>
                                <input name="username" type="text" className="form-control" placeholder="Username" 
                                onChange={e =>setDetails({...details, username: e.target.value})} value={details.username}/>
                            </div>

                            <div className="form-group">
                                <label className="Login_lbl" htmlFor="email">Email:</label>
                                <input name="email" type="email" className="form-control" placeholder="Email" 
                                onChange={e =>setDetails({...details, email: e.target.value})} value={details.email}/>
                            </div>

                            <div className="form-group">
                                <label className="Login_lbl" htmlFor="password">Password:</label>
                                <input name="password" type="text" className="form-control" placeholder="Password" 
                                onChange={e =>setDetails({...details, password: e.target.value})} value={details.password}/>
                            </div>

                            <button type="submit" className="Login_submit_btn" value="Submit">Submit</button>
                            <p className="forgot-password text-right">
                            </p>
                        </div>
                    </form>

<MDBContainer>
    <MDBRow>
        <MDBCol md="6">
            <form>
            <p className="h4 text-center mb-4">Sign in</p>
            <label htmlFor="defaultFormLoginEmailEx" className="grey-text">
                Your email
            </label>
            <input type="email" id="defaultFormLoginEmailEx" className="form-control" />
            <br />
            <label htmlFor="defaultFormLoginPasswordEx" className="grey-text">
                Your password
            </label>
            <input type="password" id="defaultFormLoginPasswordEx" className="form-control" />
            <div className="text-center mt-4">
                <MDBBtn color="indigo" type="submit">Login</MDBBtn>
            </div>
            </form>
        </MDBCol>
    </MDBRow>
</MDBContainer>
*/
    )
}

export default Login_Form
