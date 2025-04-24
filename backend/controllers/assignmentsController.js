const Assignment = require ('../models/assignmentModels');
const Employee = require('../models/employeeModels');
const Project = require('../models/projectModels');

const getAllAssignments = async (req, res) => {
    try {
        const assignments = await Assignment.find()
        .populate('employee_id', 'full_name email') 
        .populate('project_code', 'project_name project_description');
        //debug
        //console.log(assignments);

        res.status(200).json(assignments);
    } catch (error) {
        res.status(500).json({message: 'Error fetching assignments.', error});
    }
}

//assign employee to a project
const assignEmployee = async(req, res) => {
    try {
        //destructure employee body
        const { employee_id, project_code, start_date } = req.body;

        //validate input data
        if (!employee_id || !project_code || !start_date) {
            return res.status(400).json({ message: 'All fields are required.' });
          }
        //check if the employee exists
        const employee = await Employee.findById(employee_id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found.' });
        }
        //check if the project exists
        const project = await Project.findById(project_code);

        if (!project) {
            return res.status(404).json({ message: 'Project not found.' });
        }
        //if yes, create an assignment
        const newAssignment = await Assignment.create({
            employee_id,
            project_code,
            start_date
        });
        res.status(201).json(newAssignment, { message: `Employee ${Employee.full_name} was assigned to project ${Project.project_name}`});
    } catch (error) {
        console.error('Error assigning employee to a project.', error);
        res.status(500).json({ message: 'Server error', error: error.message });
    }
   


}


module.exports = {getAllAssignments, assignEmployee};