const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    employee_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Employee',
        required: true
      },
      project_code: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Project',
        required: true
      },
      start_date: {
        type: Date,
        required: true
      }
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment;