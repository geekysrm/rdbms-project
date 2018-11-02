import React, { Component } from "react";
import axios from "axios";
import { Card, Button, CardTitle, CardText } from "reactstrap";

import "./View.css";

export default class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      car_company: "",
      car_currentPrice: "",
      car_model: "",
      car_number: "",
      car_price: "",
      car_year: "",
      date: "",
      dl: "",
      name: ""
    };
  }
  componentDidMount() {
    axios
      .get(`/api/insurance`)
      .then(res => {
        console.log(res.data);
        this.setState({
          name: res.data.name,
          car_currentPrice: res.data.car_currentPrice,
          car_model: res.data.car_model,
          car_number: res.data.car_number,
          car_price: res.data.car_price,
          car_company: res.data.car_company,
          date: res.data.date.split("T")[0],
          car_year: res.data.car_year,
          dl: res.data.dl
        });
      })
      .catch(error => {
        console.log("Some error occured " + error);
        alert("Server Error occured!");
      });
  }
  render() {
    return (
      <div>
        <center>
          <Card className="card" body>
            <CardTitle>View Insurance</CardTitle>
            <hr />
            <CardText>
              <p>Name: {this.state.name}</p>
              <p>Driving License: {this.state.dl}</p>
              <p>Car Company: {this.state.car_company}</p>
              <p>Car Model: {this.state.car_model}</p>
              <p>Car Price: {this.state.car_price}</p>
              <p>Car Current Price: {this.state.car_currentPrice}</p>
              <p>Car Number: {this.state.car_number}</p>
              <p>Car Year: {this.state.car_year}</p>
              <p>Date: {this.state.date}</p>
            </CardText>
          </Card>
        </center>
      </div>
    );
  }
}
