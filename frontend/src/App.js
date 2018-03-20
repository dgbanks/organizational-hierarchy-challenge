import React, { Component } from 'react';
import { Employee } from './employee';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      newEmployee: null
    };

    this.selectEmployee = this.selectEmployee.bind(this);
    this.newEmployeeForm = this.newEmployeeForm.bind(this);
    this.updateField = this.updateField.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    this.fetchEmployees();
  }

  fetchEmployees() {
    axios.get('http://localhost:3000/employees').then(
      response => this.setState({ employees: response.data })
    );
  }

  updateField(e) {
    if (e.target.placeholder === 'First Name') {
      this.setState({
        newEmployee: Object.assign(
          {}, this.state.newEmployee, { first_name: e.target.value }
        )
      });
    }
    if (e.target.placeholder === 'Last Name') {
      this.setState({
        newEmployee: Object.assign(
          {}, this.state.newEmployee, { last_name: e.target.value }
        )
      });
    }
    if (e.target.placeholder === 'Title') {
      this.setState({
        newEmployee: Object.assign(
          {}, this.state.newEmployee, { title: e.target.value }
        )
      });
    }

    let { first_name, last_name, title } = this.state.newEmployee;
    if (first_name && last_name && title) {
      this.setState({ formComplete: true });
    } else {
      this.setState({ formComplete: false });
    }
  }

  updateManager() {
    if (this.state.newEmployee.manager_id) {
      return (
        <span>
          <p>Manager: {this.state.newEmployee.manager_name}</p>
          <button style={{fontSize: '15px', padding: '5px'}}
            onClick={() => this.setState({ newEmployee: Object.assign(
              {}, this.state.newEmployee, { manager_id: null }
            )
          })}>
            Remove manager
          </button>
        </span>
      );
    } else {
      return (
        <p>Click an existing employee to assign a manager (optional)</p>
      );
    }
  }

  handleSubmit() {
    console.log('firing');
    axios.post('http://localhost:3000/employees', this.state.newEmployee)
      .then(
        response => this.setState({ add: response.data, newEmployee: null })
    );
  }

  newEmployeeForm() {
    if (this.state.newEmployee) {
      return (
        <div className='header form'>

          <div>
            <input placeholder='First Name'
                   onChange={(e) => this.updateField(e)}/>
            <input placeholder='Last Name'
                   onChange={(e) => this.updateField(e)}/>
            <input placeholder='Title'
                   onChange={(e) => this.updateField(e)}/>
              {this.updateManager()}
          </div>

          <div>
            <button onClick={this.handleSubmit}
            disabled={!this.state.formComplete}
            style={ !this.state.formComplete ? {display: 'none'} : null }>
              Save
            </button>
            <button onClick={() => this.setState({ newEmployee: null })}>
              Cancel
            </button>
          </div>

        </div>
      );
    } else {
      return (
        <div className='header'>
          <button onClick={() => this.setState({ newEmployee: {
            first_name: '', last_name: '', title: '', manager_id: null
          } })}>
            Add New Employee
          </button>
        </div>
      );
    }
  }

  selectEmployee(selected) {
    if (this.state.newEmployee) {
      this.setState({
        newEmployee: Object.assign(
          {}, this.state.newEmployee, {
            manager_id: selected.id,
            manager_name: selected.name
          }
        )
      });
    } else {
      this.setState({ selected: selected.id});
    }
  }

  render() {
    console.log('RERENDERING');
    if (this.state.employees) {
      const employees = this.state.employees;
      return (
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
          {this.newEmployeeForm()}
          <div style={{width:'75%'}}>
            {
              employees.map(employee => (
                <Employee
                  key={employee.id}
                  employee={employee}
                  opacity={0.7}
                  selectEmployee={this.selectEmployee}
                  createdEmployee={this.state.add}
                  disableToggle={Boolean(this.state.newEmployee)}
                />
              ))
            }
          </div>
        </div>
      );
    } else {
      return <div>loading organization data...</div>;
    }
  }
}

export default App;
