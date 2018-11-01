import React, { Component } from "react";

import Login from "./components/Login";
import Register from "./components/Register";
import "./App.css";

class App extends Component {
  render() {
    return (
      <div>
        <center>
          <h1>Car Insurance Assistance App</h1>
        </center>
        <br />
        <div className="container">
          <div className="register item">
            <h4>New User? Register here</h4>
            <Register />
          </div>
          <div className="login item">
            <h4>Already registered? Login here.</h4>
            <Login />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
