import React, { Component } from 'react';
import { Employee } from './employee';
import Form from './employee_form';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      selected: null,
      newEmployee: null,
      showForm: false
    };

    this.selectEmployee = this.selectEmployee.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayHeader = this.displayHeader.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  componentWillMount() {
    this.fetchEmployees();
  }

  // componentDidUpdate() {
  //
  // }

  fetchEmployees() {
    axios.get('http://localhost:3000/employees').then(
      response => this.setState({ employees: response.data })
    );
  }

  closeForm() {
    this.setState({ showForm: false });
  }

  handleSubmit(employee) {
    console.log('firing');
    axios.post('http://localhost:3000/employees', employee)
      .then(() => {
        this.fetchEmployees();
        this.closeForm();
      }
    );
  }

  displayHeader() {
    if (this.state.showForm) {
      return (
        <Form
          handleSubmit={this.handleSubmit}
          closeForm={this.closeForm}
          manager={{id: this.state.selected, name: this.state.selectedName}}
        />
      );
    } else {
      return (
        <div className='header'>
          <button onClick={() => this.setState({ showForm: true })}>
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
      this.setState({ selected: selected.id, selectedName: selected.name});
    }
  }

  render() {
    console.log('RERENDERING');
    console.log(this.state);
    if (this.state.employees) {
      const employees = this.state.employees;
      return (
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
          {this.displayHeader()}
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
