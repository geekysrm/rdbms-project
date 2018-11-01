import React, { Component } from "react";
import axios from "axios";
import { Button } from "reactstrap";

import "./Register.css";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      password2: "",
      email: "",
      error: ""
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: "" });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.password) {
      return this.setState({ error: "Password is required" });
    }
    if (!this.state.email) {
      return this.setState({ error: "Email is required" });
    }
    if (this.state.password !== this.state.password2) {
      return this.setState({
        error: "Password entered in both fields is not equal"
      });
    }
    this.setState({ error: "" });
    const submitData = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post(`/api/register`, submitData).then(res => {
      console.log(res.data);
    });
  }

  handleEmailChange(evt) {
    this.setState({
      email: evt.target.value
    });
  }
  handleConfirmPassChange(evt) {
    this.setState({
      password2: evt.target.value
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
            type="email"
            value={this.state.email}
            onChange={this.handleEmailChange}
            className="register_email"
          />
          <br />
          <label>Password</label>
          <br />
          <input
            type="password"
            value={this.state.password}
            onChange={this.handlePassChange}
            className="register_password"
          />
          <br />
          <label>Confirm Password</label>
          <br />
          <input
            type="password"
            value={this.state.password2}
            onChange={this.handleConfirmPassChange}
            className="register_password2"
          />
          <br />
          <br />
          <Button color="success">Register</Button>
        </form>
      </div>
    );
  }
}
export default Register;
