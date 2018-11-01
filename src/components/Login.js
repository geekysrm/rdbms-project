import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";

import "./Login.css";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: ""
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.email) {
      return this.setState({ error: "email is required" });
    }

    if (!this.state.password) {
      return this.setState({ error: "Password is required" });
    }

    return this.setState({ error: "" });
    const submitData = {
      email: this.state.email,
      password: this.state.password
    };
    // API Call Here (also remove return from last setState)
  }

  handleUserChange(evt) {
    this.setState({
      email: evt.target.value
    });
  }

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value
    });
  }

  render() {
    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {this.state.error && (
            <h3 onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          )}
          <label>Email</label>
          <br />
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleUserChange}
            className="login_email"
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePassChange}
            className="login_password"
          />
          <br />
          <br />
          <Button color="primary">Login</Button>
        </form>
      </div>
    );
  }
}

export default Login;
