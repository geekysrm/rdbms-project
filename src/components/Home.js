import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Button } from "reactstrap";
import { withRouter } from "react-router-dom";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasInsurance: false
    };
  }
  // render() {
  //   return (
  //     <div>
  //       <h3>Welcome to Car Insurance Assistance</h3>
  //       <br />
  //       <br />
  //       <p>
  //         Your Claims:
  //         <Link to="/claims">View</Link>
  //       </p>
  //       <p>
  //         Your Insurance: <Link to="/insurance">View</Link>
  //       </p>
  //     </div>
  //   );
  // }
  componentDidMount() {
    axios
      .get(`/api/has-insurance`)
      .then(res => {
        console.log(res.data);
      })
      .catch(err => {
        console.log(err);
      });
  }
  handleBuyClick = () => {
    this.props.history.push("/buy");
  };
  render() {
    return (
      <center>
        <div>
          <h3>Welcome to Car Insurance Assistance</h3>
          <br />
          <br />
          {!this.state.hasInsurance && (
            <div>
              <h4>Buy an Insurance for your insurance</h4>
              <br />
              <Button onClick={this.handleBuyClick} color="info">
                Buy
              </Button>
            </div>
          )}
        </div>
      </center>
    );
  }
}

export default withRouter(Home);
