const Project = require('../models/projectModels');

const addProject = async (req, res) => {
    try {
        console.log(req.body);
        const { project_code, project_name, project_description } = req.body;

        if (!project_code || !project_name || !project_description) {
            return res.status(400).json({ message: 'All fields are required.' });
          }

        const newProject = await Project.create({
            project_code,
            project_name,
            project_description
        });
        //life check
        console.log(newProject);

        res.status(201).json(newProject);
    } catch (error) {
        console.error('Error inserting project: ', error);
        res.status(500).json({message: 'Server error', error: error.message});
    }
}

module.exports = { addProject };