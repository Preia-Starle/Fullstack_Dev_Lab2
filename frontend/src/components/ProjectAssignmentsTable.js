import React, { useState, useEffect } from 'react'; 

const ProjectAssignmentsTable = () => {
  //hook for storing data from backend
  const [assignments, setAssignments] = useState([]);
  //fetch the data from the backend
  useEffect(() => {
      const fetchAssignments = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/project_assignments');
          const data = await response.json();
          console.log(data);
          setAssignments(data);
        } catch (error) {
          console.error('Error fetching assignments', error);
        }   
      };

      fetchAssignments();
  }, []);

    //render the table
    return (
    <div>
    <h2>Project Assignments</h2>
    <table>
      <thead>
        <tr>
          <th>Employee ID</th>
          <th>Employee Name</th>
          <th>Project Name</th>
          <th>Start Date</th>
        </tr>
      </thead>
      <tbody>
        {/* Map over the assignments and display them in table rows */}
        {assignments.map((assignment) => (
          <tr key={assignment._id}>
            <td>{assignment.employee_id._id}</td>
            <td>{assignment.employee_id.full_name}</td>
            <td>{assignment.project_code.project_name}</td>
            <td>{new Date(assignment.start_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default ProjectAssignmentsTable;