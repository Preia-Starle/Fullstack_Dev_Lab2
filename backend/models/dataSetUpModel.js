const mongoose = require('mongoose');
const Employee = require('../models/employeeModels');
const Project = require('../models/projectModels');
const Assignment = require('../models/assignmentModels');

//clear all data in DB
const clearData = async () => {
    try {
      await Employee.deleteMany({});
      await Project.deleteMany({});
      await Assignment.deleteMany({});
      console.log('Data cleared');
    } catch (err) {
      console.log('Error clearing data: ', err);
    }
  };
  
  //insert sample data
  const insertData = async () => {
      try {
          //insert employees
          const employee1 = await Employee.create({
            employee_id: 'E001',
            full_name: 'Sung Jin Woo',
            email: 'sungjinwoo@sololeveling.com',
            hashed_password: 'mockhash123',
          });
      
          const employee2 = await Employee.create({
            employee_id: 'E002',
            full_name: 'Naofumi Iwatani',
            email: 'naofumi@shieldhero.com',
            hashed_password: 'mockhash123',
          });
      
          const employee3 = await Employee.create({
            employee_id: 'E003',
            full_name: 'Haruka Sakura',
            email: 'harukasakura@windbreaker.com',
            hashed_password: 'mockhash123',
          });
      
          const employee4 = await Employee.create({
            employee_id: 'E004',
            full_name: 'Tanjiro Kamado',
            email: 'tanjiro@demonslayer.com',
            hashed_password: 'mockhash123',
          });
      
          const employee5 = await Employee.create({
            employee_id: 'E005',
            full_name: 'Rin Okumura',
            email: 'rin@blueexorcist.com',
            hashed_password: 'mockhash123',
          });
      
          //insert projects
          const project1 = await Project.create({
            project_code: 'P002',
            project_name: 'Jeju Island Raid',
            project_description: 'A major raid to defeat the terrifying boss in Jeju Island.',
          });
      
          const project2 = await Project.create({
            project_code: 'P001',
            project_name: 'The Shield Hero\'s Quest',
            project_description: 'Defend the kingdom from the Waves of Catastrophe.',
          });
      
          const project3 = await Project.create({
            project_code: 'P003',
            project_name: 'Windbreaker Showdown',
            project_description: 'A major showdown between bikers.',
          });
      
          const project4 = await Project.create({
            project_code: 'P004',
            project_name: 'Demon Slayer: Final Selection',
            project_description: 'The final selection for becoming a demon slayer.',
          });
      
          const project5 = await Project.create({
            project_code: 'P005',
            project_name: 'Exorcist Training: The Devil\'s Son',
            project_description: 'Rin Okumura trains to become an exorcist to defeat the devil.',
          });
      
          //insert assignments
          await Assignment.create({
            employee_id: employee1._id, 
            project_code: project1._id, 
            start_date: new Date('2025-04-01'),
          });
      
          await Assignment.create({
            employee_id: employee2._id,
            project_code: project2._id,
            start_date: new Date('2025-04-03'),
          });
      
          await Assignment.create({
            employee_id: employee3._id,
            project_code: project3._id,
            start_date: new Date('2025-04-05'),
          });
      
          await Assignment.create({
            employee_id: employee4._id,
            project_code: project4._id,
            start_date: new Date('2025-04-07'),
          });
      
          await Assignment.create({
            employee_id: employee5._id,
            project_code: project5._id,
            start_date: new Date('2025-04-10'),
          });
          console.log('Data inserted successfully!');
        } catch (err) {
          console.log('Error inserting data: ', err);
        }
      };
  
  const runDataSetup = async() => {
      await clearData();
      await insertData();
  }
  
  module.exports = {runDataSetup};