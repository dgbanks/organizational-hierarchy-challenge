import React, { Component } from 'react';
import { Employee } from './employee';
import Form from './employee_form';
import * as APIUtils from './utils';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      showForm: false
    };

    this.selectEmployee = this.selectEmployee.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.displayHeader = this.displayHeader.bind(this);
    this.closeForm = this.closeForm.bind(this);
  }

  componentWillMount() {
    APIUtils.fetchEmployees().then(
      response => this.setState({ employees: response.data })
    );
  }

  closeForm() {
    this.setState({ showForm: false, selected: null,  });
  }

  handleSubmit(employee) {
    async function anon() {
      let response;
      if (typeof(employee) === 'number') {
        await APIUtils.deleteEmployee(employee);
      } else if (employee.id) {
        await APIUtils.editEmployee(employee);
      } else {
        await APIUtils.createEmployee(employee);
      }
      console.log(response);
    };
    anon().then(() => {
      APIUtils.fetchEmployees().then(
        response => this.setState({ employees: response.data })
      )
      this.closeForm();
    })
  }

  displayHeader() {
    if (this.state.showForm) {
      return (
        <Form
          handleSubmit={this.handleSubmit}
          closeForm={this.closeForm}
          manager={this.state.manager}
          employee={this.state.selected}
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
    if (this.state.showForm) {
      this.setState({ manager: { id: selected.id, name: selected.name}});
    } else {
      this.setState({ selected: selected, showForm: true});
    }
  }

  render() {
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
