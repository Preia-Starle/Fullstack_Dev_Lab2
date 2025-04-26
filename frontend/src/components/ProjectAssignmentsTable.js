import React, { useState, useEffect } from 'react'; 
import styles from '../components/ProjectAssignmentsTable.module.css';

const ProjectAssignmentsTable = () => {
  //hook for storing data from backend
  const [assignments, setAssignments] = useState([]);
  const [sortOrder, setSortOrder] = useState('desc');  //default is descending
  const [sortedColumn, setSortedColumn] = useState('start_date');

  const fetchAssignments = async () => {
        try {
          const response = await fetch('http://localhost:3001/api/project_assignments');
          const data = await response.json();
          //debug to show data are fetched on interval
          console.log('Fetched Data:', data);
          //limit to show only latest 5
          const latestAssignments = data
            .sort((a, b) => new Date(b.start_date) - new Date(a.start_date))
            .slice(0, 5);
          setAssignments(latestAssignments);
        } catch (error) {
          console.error('Error fetching assignments', error);
        }   
      };

  //run on component mount and every minute to refresh the data
  useEffect(() => {
    //initial fetch
    fetchAssignments(); 
    //set interval
    const intervalId = setInterval(fetchAssignments, 60000); 

    return () => clearInterval(intervalId);//clear
  }, []);

  //sorting 
  const handleSort = (column) => {
    //toggle - check which order now and sort based on that - if desc sort asc and other way round
    const newSortOrder = sortedColumn === column && sortOrder === 'desc' ? 'asc' : 'desc';
    //update state of sorting order
    setSortOrder(newSortOrder);
    //update state of the column being currently clicked
    setSortedColumn(column);
  };

  //helper to handle sorting based on column and order
  const getValueByKey = (obj, key) => {
    //extract nested values
    return key.split('.').reduce((acc, part) => acc && acc[part], obj); 
  };

  //sort the assignments based on selected column and order
  const sortedAssignments = [...assignments].sort((a, b) => {
    const aValue = getValueByKey(a, sortedColumn);
    const bValue = getValueByKey(b, sortedColumn);

    //compare the values based on data type
    //if string alphabetically
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortOrder === 'desc' 
        ? bValue.localeCompare(aValue) 
        : aValue.localeCompare(bValue);
    } 
    //for number use subtraction to see which bigger
    else if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortOrder === 'desc' 
        ? bValue - aValue 
        : aValue - bValue;
    } 
    //for date also subtraction to compare
    else if (aValue instanceof Date && bValue instanceof Date) {
      return sortOrder === 'desc' 
        ? bValue - aValue 
        : aValue - bValue;
    } 
    else {
      //0 if undefined or unexpected
      return 0;
    }
  });

  return (
    <div>
      <h2 className={styles.mainHeader}>Project Assignments</h2>
      <table className={styles.assignmentsTable}>
        <thead>
          <tr>
            <th className={`${styles.tableHeader} ${sortedColumn === 'employee_id._id' ? (sortOrder === 'desc' ? styles.sortedDesc : styles.sortedAsc) : ''}`}
                onClick={() => handleSort('employee_id._id')}>
              Employee ID
            </th>
            <th className={`${styles.tableHeader} ${sortedColumn === 'employee_id.full_name' ? (sortOrder === 'desc' ? styles.sortedDesc : styles.sortedAsc) : ''}`}
                onClick={() => handleSort('employee_id.full_name')}>
              Employee Name
            </th>
            <th className={`${styles.tableHeader} ${sortedColumn === 'project_code.project_name' ? (sortOrder === 'desc' ? styles.sortedDesc : styles.sortedAsc) : ''}`}
                onClick={() => handleSort('project_code.project_name')}>
              Project Name
            </th>
            <th className={`${styles.tableHeader} ${sortedColumn === 'start_date' ? (sortOrder === 'desc' ? styles.sortedDesc : styles.sortedAsc) : ''}`}
                onClick={() => handleSort('start_date')}>
              Start Date
            </th>
          </tr>
        </thead>
        <tbody>
          {/* Map over the sortedAssignments to display them */}
          {sortedAssignments.map((assignment) => (
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