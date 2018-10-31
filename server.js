const express = require('express');
const morgan = require('morgan');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());

const PORT = process.env.PORT || 8000;

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'build')));

//authRoutes
const authRoutes = require('./routes/authRoutes');
app.use(authRoutes);

//insuranceRoutes
const insuranceRoutes = require('./routes/insuranceRoutes');
app.use(insuranceRoutes);

// pass all other routes to React that will be handled by React Router
app.get('*', (req,res) => {
    res.sendFile(path.resolve(__dirname, 'build', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!`);
});
  
