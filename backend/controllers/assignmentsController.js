const Assignment = require ('../models/assignmentModels');
const Employee = require('../models/employeeModels');
const Project = require('../models/projectModels');

const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
        .populate('employee_id', 'full_name email') 
        .populate('project_code', 'project_name project_description');
        console.log(assignments);

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({message: 'Error fetching assignments.', error});
    }
}

module.exports = {getAllAssignments};