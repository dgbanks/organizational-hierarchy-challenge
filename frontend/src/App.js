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
      response => {
        this.setState({ employees: response.data });
      }
    );
  }

  closeForm(x) {
    this.setState({ showForm: false, selected: null }, () =>
      x ? this.setState({ notice: null }) : null
    );
  }

  handleSubmit(employee) {
    async function anon() {
      let response;
      if (typeof(employee) === 'number') {
        response = await APIUtils.deleteEmployee(employee);
      } else if (employee.id) {
        response = await APIUtils.editEmployee(employee);
      } else {
        response = await APIUtils.createEmployee(employee);
      }
      return response;
    };
    anon().then(response => {
      if (response.data.notice) {
        this.setState({ notice: response.data.notice });
      } else {
        APIUtils.fetchEmployees().then(
          response => this.setState({
            employees: response.data,
            notice: "Success!"
          })
        );
        this.closeForm();
      }
    })
  }

  timeoutNotice() {
    setTimeout(() => this.setState({notice: null}), 3000);
    return this.state.notice
  }

  displayHeader() {
    if (this.state.showForm) {
      return (
        <Form
          notice={this.state.notice}
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
            {this.state.notice ? this.timeoutNotice() : "Add New Employee"}
          </button>
        </div>
      );
    }
  }

  selectEmployee(selected) {
    if (this.state.showForm) {
      if (this.state.notice) {
        this.setState({ notice: null});
      }
      this.setState({ manager: { id: selected.id, name: selected.name}});
    } else {
      this.setState({ selected: selected, showForm: true});
    }
  }

  render() {
    console.log(this.state.employees);
    if (this.state.employees) {
      const employees = this.state.employees;
      return (
        <div style={{display:'flex', flexDirection: 'column', alignItems: 'center', justifyContent:'center'}}>
          {this.displayHeader()}
          <div className='index'>
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
