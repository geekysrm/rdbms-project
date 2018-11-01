import React, { Component } from "react";
import axios from "axios";
import { Button, Alert } from "reactstrap";
import { withRouter } from "react-router-dom";

import setAuthToken from "../utils/setAuthToken";
import "./Login.css";

class Login extends Component {
  constructor(props) {
    super(props);
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

    this.setState({ error: "" });
    const submitData = {
      email: this.state.email,
      password: this.state.password
    };
    axios
      .post(`/api/login`, submitData)
      .then(res => {
        console.log(res.data);
        let token;
        token = res.data.token;
        //console.log(token);
        localStorage.setItem("token", token);
        setAuthToken(token);
        // const decoded = jwt_decode(token);
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log(err);
        this.setState({ error: "Server error occured!" });
      });
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
            <div>
              <Alert color="danger">
                {this.state.error}
                &nbsp;&nbsp;
                <Button onClick={this.dismissError} color="danger">
                  X
                </Button>
              </Alert>
            </div>
          )}
          <label>Email</label>
          <br />
          <input
            type="email"
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

export default withRouter(Login);
