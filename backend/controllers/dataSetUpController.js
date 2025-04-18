const dataSetup = require('../models/dataSetUpModel');

const setupData = async (req, res) => {
  try {
    await dataSetup.runDataSetup();
    res.status(200).send('Data setup completed!');
  } catch (error) {
    res.status(500).send('Error setting up data.');
  }
};

module.exports = { setupData };