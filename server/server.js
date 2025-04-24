const express = require('express');
const connectDB = require('./db');
const cors = require('cors');
const assignmentRoutes = require('../backend/routes/assignmentsRoute');
const dataSetupRoutes = require('../backend/routes/dataSetUpRoute');
const projectRoutes = require('../backend/routes/projectRoute'); 
const employeeRoutes = require('../backend/routes/employeesRoute'); 
require('dotenv').config();

const app = express();

app.use(cors());

//connect DB
connectDB();

//body parser
app.use(express.json());

//connect routes
app.use('/api/project_assignments', assignmentRoutes);
app.use('/api', projectRoutes);
app.use('/api', employeeRoutes);

//connect data set up route
app.use('/api', dataSetupRoutes); 

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});