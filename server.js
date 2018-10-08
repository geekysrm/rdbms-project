const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');
const pg = require("pg");

const pool = new pg.Pool({
    user: "admin",
    host: "127.0.0.1",
    database: "rdbms",
    password: "password",
    port: "5432"
});

const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));

app.get("/api/hello",(req,res)=>{
    pool.query('SELECT * FROM "names"',(err,res)=>{
        console.log(err, res);
        res.send("working");
        pool.end();
    });
});

// pass all other routes to React that will be handled by React Router
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
  
