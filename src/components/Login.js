import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const initialValues = {
  username: "", 
  password: "",
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ formValues, setFormValues ] = useState(initialValues)
  const { history } = useHistory();


  // useEffect(()=>{
  //   // make a post request to retrieve a token from the api
  //   // when you have handled the token, navigate to the BubblePage route
  //   axios.post("http://localhost:5000/api/login", formValues)
  //     .then(res=>{
  //       localStorage.setItem("token", res.data.payload)
  //       history.push("/colors")
  //     })
  //     .catch(err=>{
  //       console.log("error with login:", err.response)
  //     });
  // },[formValues]);

  const submit = (e) => {
    e.preventDefault()

      // make a post request to retrieve a token from the api
      // when you have handled the token, navigate to the BubblePage route
      axios.post("http://localhost:5000/api/login", formValues)
      .then(res=>{
        localStorage.setItem("token", res.data.payload)
        history.push("/colors")
      })
      .catch(err=>{
        console.log("error with login:", err.response)
      });
  
    
    setFormValues(initialValues);
  }
  
  const change = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }

  const error = "";
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <h2>Build login form here</h2>
      <form className="login-form" onSubmit={submit}>
        <h1>Welcome to the Bubble App!</h1>
        <label>
          Username
          <input 
            type="text"
            name="username"
            value={formValues.username}
            onChange={change}
          />
        </label>
        <label>
          Password
          <input 
            type="password"
            name="password"
            value={formValues.password}
            onChange={change}
          />
        </label>
        <button>Sign in</button>
      </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.