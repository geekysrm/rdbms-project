import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

import setAuthToken from "../utils/setAuthToken";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasInsurance: false
    };
  }
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      // Token not present
      window.location.assign("/");
    } else {
      setAuthToken(localStorage.getItem("token"));
      axios
        .get(`/api/has-insurance`)
        .then(res => {
          console.log(res.data);
          this.setState({ hasInsurance: res.data });
          if (res.data) {
            axios
              .get(`/api/claim`)
              .then(res => {
                console.log(res.data);
              })
              .catch(err => {
                console.log(err);
              });
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }

  handleBuyClick = () => {
    this.props.history.push("/buy");
  };
  handleCreateClick = () => {
    this.props.history.push("/upload");
  };
  handleViewInsuranceClick = () => {
    this.props.history.push("/view");
  };
  handleLogoutClick = () => {
    localStorage.removeItem("token");
    window.location.assign("/");
  };
  render() {
    return (
      <center>
        <div>
          <br />

          <h3>Welcome to Car Insurance Assistance</h3>
          <Button
            className="logout"
            color="danger"
            onClick={this.handleLogoutClick}
          >
            Logout
          </Button>
          <br />
          <br />
          {!this.state.hasInsurance ? (
            <div>
              <h4>Buy an Insurance for your vehicle</h4>
              <br />
              <Button onClick={this.handleBuyClick} color="info">
                Buy
              </Button>
            </div>
          ) : (
            <div>
              <div>
                <Button color="info" onClick={this.handleViewInsuranceClick}>
                  View Insurance
                </Button>
                <br />
                <br />
                <h3>Create a Claim</h3>
                <Button color="primary" onClick={this.handleCreateClick}>
                  Create
                </Button>
              </div>
              <br />
              <h3>Your Claims</h3>
              {this.state.claims}
            </div>
          )}
        </div>
      </center>
    );
  }
}

export default withRouter(Home);
