import React, { Component } from 'react';
//import './App.css';

class Register extends Component {
  constructor() {
    super();
    this.state = {
      password: '',
      password2:'',
      email:'',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
	  this.handleConfirmPassChange = this.handleConfirmPassChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.dismissError = this.dismissError.bind(this);
  }

  dismissError() {
    this.setState({ error: '' });
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }
     if (!this.state.email) {
      return this.setState({ error: 'Email is required' });
    }
     if (this.state.password !== this.state.password2) {
      return this.setState({ error: 'Password entered in both fields is not equal' });
    }
    return this.setState({ error: '' });
    const submitData = {
    	email: this.state.email,
    	password: this.state.password
    }
    // API Call Here (also remove return from last setState)
  }

  ;
    handleEmailChange(evt) {
    this.setState({
      email: evt.target.value,
    });
  };
    handleConfirmPassChange(evt) {
    this.setState({
      password2: evt.target.value,
    });
  };
  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {

    return (
      <div className="Login">
        <form onSubmit={this.handleSubmit}>
          {
            this.state.error &&
            <h3  onClick={this.dismissError}>
              <button onClick={this.dismissError}>✖</button>
              {this.state.error}
            </h3>
          }
          
          <label>Email</label>
          <input type="email"  value={this.state.email} onChange={this.handleEmailChange} />
          <br />
          <label>Password</label>
          <input type="password"  value={this.state.password} onChange={this.handlePassChange} />
          <br />
           <label>Confirm Password</label>
          <input type="password"  value={this.state.password2} onChange={this.handleConfirmPassChange} />
          <br />
          <input type="submit" value="Register"  />
        </form>
      </div>
    );
  }

}
export default Register;