const express = require('express');
const router = express.Router();
const assignmentsController = require('../controllers/assignmentsController');

//get all asignments
router.get('/', assignmentsController.getAllAssignments);




module.exports = router;