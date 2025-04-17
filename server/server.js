const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
//const routes = require('../backend/routes');
require('dotenv').config();

const app = express();

//connect DB
connectDB();

app.use(cors());

// app.use('/api', routes);

//body parser
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});