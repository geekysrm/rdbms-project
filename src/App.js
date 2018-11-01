import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import Login from "./components/Login";
import Register from "./components/Register";
import setAuthToken from "./utils/setAuthToken";
import "./App.css";

class App extends Component {
  componentDidMount() {
    if (localStorage.getItem("token")) {
      // Token present
      setAuthToken(localStorage.getItem("token"));
      this.props.history.push("/home");
    }
  }
  render() {
    return (
      <div className="app">
        <br />
        <center>
          <h1>
            <b>Car Insurance Assistance App</b>
          </h1>
        </center>
        <br />
        <br />
        <div className="container">
          <div className="register item">
            <h4>New User? Register here</h4>
            <br />
            <Register />
          </div>
          <div className="login item">
            <h4>Already registered? Login here.</h4>
            <br />
            <Login />
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(App);
