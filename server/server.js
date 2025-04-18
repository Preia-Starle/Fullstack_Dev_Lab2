const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const assignmentRoutes = require('../backend/routes/assignmentsRoute');
require('dotenv').config();
const dataSetupRoutes = require('../backend/routes/dataSetUpRoute');

const app = express();

//connect DB
connectDB();

//connect assignments route
app.use('/api/project_assignments', assignmentRoutes);

//connect data set up route
app.use('/api', dataSetupRoutes); 

app.use(cors());

//body parser
app.use(express.json());

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});