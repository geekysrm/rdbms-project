import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export default class Buy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      dl_number: "",
      car_model: "",
      car_company: "",
      car_number: "",
      car_year: 0,
      car_price: 0
    };
  }
  onFormSubmit = e => {
    e.preventDefault();
    console.log();
  };
  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  render() {
    return (
      <Form onSubmit={this.onFormSubmit}>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
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
            onChange={this.handleChange}
            value={this.state.car_price}
            type="number"
            name="car_price"
            id="carPrice"
          />
        </FormGroup>

        <Button>Submit</Button>
      </Form>
    );
  }
}
