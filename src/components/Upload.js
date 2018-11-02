import React, { Component } from "react";
import { Input, Button } from "reactstrap";

class Upload extends Component {
  componentDidMount() {
    if (!localStorage.getItem("token")) {
      // Token not present
      window.location.assign("/");
    }
  }
  render() {
    return (
      <div className="form">
        <form action="/api/claim" method="POST" enctype="multipart/form-data">
          <div style={{ display: "none" }}>
            <Input
              className="input"
              type="text"
              name="token"
              value={`Bearer ${localStorage.getItem("token")}`}
            />
          </div>

          <div>
            <br />
            <h3>Please upload the image of the damaged vehicle</h3>
            <br />
            <h5>Name of file</h5>
            <Input className="input" type="text" name="name" />
          </div>
          <br />
          <div>
            <h5>Upload file</h5>
            <Input className="input" type="file" name="image" />
          </div>
          <div>
            <br />
            <Button color="primary" type="submit" class="btn">
              Submit
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

export default Upload;
