const express = require('express');
const router = express.Router();
const dataSetupController = require('../controllers/dataSetupController');

router.post('/setup-data', dataSetupController.setupData);

module.exports = router;