import React, { useState, useEffect } from 'react'; 
import styles from '../components/ProjectAssignmentsTable.module.css';

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
    <h2 className={styles.mainHeader}>Project Assignments</h2>
    <table className={styles.assignmentsTable}>
      <thead>
        <tr>
          <th className={styles.tableHeader}>Employee ID</th>
          <th className={styles.tableHeader}>Employee Name</th>
          <th className={styles.tableHeader}>Project Name</th>
          <th className={styles.tableHeader}>Start Date</th>
        </tr>
      </thead>
      <tbody>
        {/* Map over the assignments and display them in table rows */}
        {assignments.map((assignment) => (
          <tr key={assignment._id}>
            <td className={styles.tableCell}>{assignment.employee_id._id}</td>
            <td className={styles.tableCell}>{assignment.employee_id.full_name}</td>
            <td className={styles.tableCell}>{assignment.project_code.project_name}</td>
            <td className={styles.tableCell}>{new Date(assignment.start_date).toLocaleDateString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};

export default ProjectAssignmentsTable;