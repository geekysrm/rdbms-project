import React, { Component } from 'react';
import axios from 'axios';

class Upload extends Component 
{

    render() 
    {
        return (
            <div>
                <form action="/api/claim" 
                    method="POST" 
                    enctype="multipart/form-data" 
                >
                    <div style={{ display: "none" }} ><input type="text" name="token" value={`Bearer ${localStorage.getItem("token")}`} /></div>
                    <div><input type="text" name="name" /></div>
                    <div><input type="file" name="image" /></div>
                    <div><button type="submit" class="btn">Submit</button></div>
                </form>
            </div>
        );
    }
}

export default Upload;