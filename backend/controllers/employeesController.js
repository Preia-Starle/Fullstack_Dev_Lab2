const Employee = require('../models/employeeModels');

const addEmployee = async (req, res) => {
    try {
        const { employee_id, full_name, email, hashed_password } = req.body;

        if (!employee_id || !full_name || !email || !hashed_password) {
            return res.status(400).json({ message: 'All fields are required.' });
          }
    
        const newEmployee = await Employee.create({
            employee_id,
            full_name,
            email,
            hashed_password
        });
        console.log(newEmployee);
    
        res.status(201).json(newEmployee);

    } catch (error) {
        console.error('Error creating employee: ', error);
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

module.exports = { addEmployee };