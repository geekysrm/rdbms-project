import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import axios from "axios";

import setAuthToken from "../utils/setAuthToken";
import "./Buy.css";

export default class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dl_number: "",
      car_model: "",
      car_company: "",
      car_number: "",
      car_year: null,
      car_price: null
    };
  }
  onFormSubmit = e => {
    e.preventDefault();
    const submitData = {
      name: this.state.name,
      dl_number: this.state.dl_number,
      car_model: this.state.car_model,
      car_company: this.state.car_company,
      car_number: this.state.car_number,
      car_year: Number(this.state.car_year),
      car_price: Number(this.state.car_price)
    };
    console.log(submitData);
    setAuthToken(localStorage.getItem("token"));
    axios
      .post(`/api/insurance`, submitData)
      .then(res => {
        console.log(res.data);
        this.props.history.push("/home");
      })
      .catch(err => {
        console.log(err);
      });
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <div>
        <br />
        <center>
          <h3>Buy Insurance</h3>
        </center>
        <Form className="form" onSubmit={this.onFormSubmit}>
          <FormGroup>
            <Label for="name">Name</Label>
            <Input
              className="input"
              onChange={this.handleChange}
              value={this.state.name}
              type="text"
              name="name"
              id="name"
            />
          </FormGroup>
          <FormGroup>
            <Label for="DLNumber">Driving License Number</Label>
            <Input
              className="input"
              onChange={this.handleChange}
              value={this.state.dl_number}
              type="text"
              name="dl_number"
              id="DLNumber"
            />
          </FormGroup>
          <FormGroup>
            <Label for="carModel">Car Model</Label>
            <Input
              className="input"
              onChange={this.handleChange}
              value={this.state.car_model}
              type="text"
              name="car_model"
              id="carModel"
            />
          </FormGroup>
          <FormGroup>
            <Label for="carCompany">Car Company</Label>
            <Input
              className="input"
              onChange={this.handleChange}
              value={this.state.car_company}
              type="text"
              name="car_company"
              id="carCompany"
            />
          </FormGroup>
          <FormGroup>
            <Label for="carNumber">Car Number</Label>
            <Input
              className="input"
              onChange={this.handleChange}
              value={this.state.car_number}
              type="text"
              name="car_number"
              id="carNumber"
            />
          </FormGroup>
          <FormGroup>
            <Label for="carYear">Car Year</Label>
            <Input
              className="input"
              onChange={this.handleChange}
              value={this.state.car_year}
              type="number"
              name="car_year"
              id="carYear"
            />
          </FormGroup>
          <FormGroup>
            <Label for="carPrice">Car Price</Label>
            <Input
              className="input"
              onChange={this.handleChange}
              value={this.state.car_price}
              type="number"
              name="car_price"
              id="carPrice"
            />
          </FormGroup>

          <Button>Submit</Button>
        </Form>
      </div>
    );
  }
}
