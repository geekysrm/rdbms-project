import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';

import './App.css';

class App extends Component {
  render() {
    return (
      <div>
      <center><h1>Car Insurance Assistance App</h1></center>
      <div className="container">
        
        <div className="register item">
        <h3>New User? Register here</h3>
       <Register />      
       </div>
       <div className="login item">
       <h3>Already registered? Login here.</h3>
       <Login />        
        </div>
      </div>
      </div>
    );
  }
}

export default App;
