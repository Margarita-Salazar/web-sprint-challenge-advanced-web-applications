import React from "react";
import { BrowserRouter as Router, Route, useHistory, Link } from "react-router-dom";

import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import BubblePage from "./components/BubblePage";
import "./styles.scss";

function App(props) {
  const logOut = () => {
    localStorage.removeItem("token")
    alert("Sign Out Successfully! Come Back Soon")
  }
  return (
    <Router>
      <div className="App">
        <header>
          Color Picker Sprint Challenge
          <Link to="/" data-testid="logoutButton" href="#" onClick={logOut}>logout</Link>
        </header> 

        <Route exact path="/" component={Login} />
        <PrivateRoute path="/colors" component={BubblePage}/>

      </div>
    </Router>
  );
}

export default App;

//Task List:
//1. Render BubblePage as a PrivateRoute
//2. Build the logout button to remove the localStorage Item.