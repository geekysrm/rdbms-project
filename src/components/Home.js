import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Card, CardImg, CardText, CardBody, CardLink,
  CardTitle, CardSubtitle, Button } from 'reactstrap';
import { withRouter } from "react-router-dom";
import axios from "axios";

import setAuthToken from "../utils/setAuthToken";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasInsurance: false,
      claims: null
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

        axios
        .get(`/api/claim`)
        .then(res => {
          console.log(res.data);
          this.setState({
            claims: res.data
          });
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

  renderCliams = () =>
  {
    if(this.state.claims)
    {
      return this.state.claims.map( claim => {
        return (
          <Card key={claim.id} >
            <CardBody>
              <CardTitle>{claim.name}</CardTitle>
              <CardSubtitle>{claim.damage}</CardSubtitle>
            </CardBody>
            <img 
              width="100%" 
              src={`http://localhost:8000/images/${claim.image_url}`} 
              alt="car"
            />
            <CardBody>
              <CardText>{claim.refund}</CardText>
              <CardText>{claim.status}</CardText>
            </CardBody>
          </Card>
        );
      });
    }
    else
    {
      return null;
    }
  }

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
              {this.renderCliams()}
            </div>
          )}
        </div>
      </center>
    );
  }
}

export default withRouter(Home);
