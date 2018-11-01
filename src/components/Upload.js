import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component 
{
    constructor(props) {
        super(props);
        
        this.state = {
            file: null
        }
    }
    
    /*onFileChange = (event) =>
    {
        this.setState({
            file: event.target.files[0]
        });
    }

    onSubmit = () =>
    {
        axios({
            method: 'post',
            url: '/api/upload',
            headers:{
                'Content-Type': 'application/json'
            },
            data:{
                file: this.state.file
            }
          })
            .then(res => {
              console.log(res);
            })
            .catch(err => {
              console.log(err);
            });
    }*/

    render() 
    {
        return (
            <div>
                <form action="/api/upload" method="POST" enctype="multipart/form-data">
                    <div><input type="file" name="image" /></div>
                    <div><button type="submit" class="btn">Submit</button></div>
                </form>
            </div>
        );
    }
}

export default Upload;