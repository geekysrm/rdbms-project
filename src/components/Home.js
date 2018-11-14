import React, { Component } from "react";
import { Card, CardText, CardBody,
  CardTitle, CardSubtitle, Button,
  Collapse, Navbar, NavbarToggler,
  NavbarBrand, Nav, NavItem,
  NavLink } from 'reactstrap';
import { withRouter } from "react-router-dom";
import axios from "axios";

import setAuthToken from "../utils/setAuthToken";

import './Home.css';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasInsurance: false,
      claims: null,
      isOpen: false
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

  renderDamage = (damageIndex) =>
  {
    if(damageIndex === 1)
    {
      return "Minor";
    }
    else if(damageIndex === 2)
    {
      return "Medium";
    }
    else if(damageIndex === 3)
    {
      return "Severe";
    }
  }

  renderCliams = () =>
  {
    if(this.state.claims)
    {
      return this.state.claims.map( claim => {
        return (
          <Card key={claim.id} >
            <CardBody>
              <CardTitle style={{textAlign: "center"}} >{claim.name}</CardTitle>
              <CardSubtitle>Status - {claim.status}</CardSubtitle>
            </CardBody>
            <img 
              width="100%" 
              style={{
                maxHeight: "250px",
                objectFit: "contain"
              }}
              src={`http://localhost:8000/images/${claim.image_url}`} 
              alt="car"
            />
            <CardBody>
              <CardText>Predicted Refund - {claim.refund} Rs</CardText>
              <CardText>Predicted Damage - {this.renderDamage(claim.damage)}</CardText>
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


  toggle() {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }

  render() {
    return (
      <div>
      <Navbar color="light" light expand="md">
          <NavbarBrand href="/home">Car Insurance Assistance</NavbarBrand>
          <NavbarToggler onClick={this.toggle} />
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <NavItem className="nav-item" >
                { 
                  !this.state.hasInsurance 
                  ?
                  (
                    <Button onClick={this.handleBuyClick} color="info">
                      Buy Insurance
                    </Button>
                  )
                  :
                  (
                    <Button color="info" onClick={this.handleViewInsuranceClick}>
                      View Insurance
                    </Button>
                  )
                }
              </NavItem>
              <NavItem>
              <Button
                className="logout"
                color="danger"
                onClick={this.handleLogoutClick}
              >
                Logout
              </Button>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      <center>
        <div>
          {this.state.hasInsurance && (
            <div>
              <br />
              <div>
                <div className="header-container">
                  <div>
                    <h3>Your Claims</h3>
                  </div>
                  <div>
                    <Button color="primary" onClick={this.handleCreateClick}>
                      Create a New Claim
                    </Button>
                  </div>
                </div>
                <div>
                  {this.renderCliams()}
                </div>
              </div>
            </div>
          )}
        </div>
      </center>
    </div>
    );
  }
}

export default withRouter(Home);
