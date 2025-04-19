const express = require('express');
const router = express.Router();
const employeesController = require('../controllers/employeesController');

router.post('/employees', employeesController.addEmployee);

module.exports = router;