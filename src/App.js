import React, { Component } from 'react';
import Login from './components/Login';
import Register from './components/Register';


class App extends Component {
  render() {
    return (
      <div className="App">
        <h1>Car Insurance Assistance App</h1>
        <div>
        <h3></h3>
       <Register />      
       <h3></h3>
       <Login />        
        </div>
      </div>
    );
  }
}

export default App;
