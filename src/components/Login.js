import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router";

const initialValues = {
  username: "", 
  password: "",
}

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [ formValues, setFormValues ] = useState(initialValues);
  const [ error, setErrors ] = useState("");
  const history = useHistory();

  const submit = (e) => {
    e.preventDefault()
    if(formValues.username === "Lambda School" && formValues.password === "i<3Lambd4"){
      axios.post("http://localhost:5000/api/login", formValues)
      .then(res=>{
        localStorage.setItem("token", res.data.payload)
        history.push("/colors")
      })
      .catch(err=>{
        console.log("error with login:", err.response)
      });
      setFormValues(initialValues);

    }else {
      setErrors("Wrong username or password")
    }
  }
  
  const change = (e) => {
    setFormValues({...formValues, [e.target.name]: e.target.value})
  }



  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={submit} >
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