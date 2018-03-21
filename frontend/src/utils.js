import axios from 'axios';

export const fetchEmployees = () => (
  axios.get('http://localhost:3000/employees')
);

export const createEmployee = employee => (
  axios.post('http://localhost:3000/employees', { employee })
);

export const editEmployee = employee => (
  axios.patch(`http://localhost:3000/employees/${employee.id}`, { employee })
);

export const deleteEmployee = employeeId => (
  axios.delete(`http://localhost:3000/employees/${employeeId}`)
);
