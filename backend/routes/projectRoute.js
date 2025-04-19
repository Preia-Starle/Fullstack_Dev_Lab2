const express = require('express');
const router = express.Router();
const projectsController = require('../controllers/projectsController');

router.post('/projects', projectsController.addProject);

module.exports = router;