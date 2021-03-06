import React from 'react';
import {Employee as Subordinate} from './employee';
import './employee.css';

export class Employee extends React.Component {
  constructor() {
    super();
    this.state = { showSubordinates: true };

    this.handleClick = this.handleClick.bind(this);
    this.renderToggleControl = this.renderToggleControl.bind(this);
    this.renderSubordinates = this.renderSubordinates.bind(this);
  }

  renderToggleControl(employee) {
    if (!this.props.disableToggle) {
      if (employee.direct_reports) {
        if (this.state.showSubordinates) {
          return (
            <div onClick={() => this.setState({showSubordinates:false})}>
              Hide Subordinates
            </div>
          );
        } else {
          return (
            <div onClick={() => this.setState({showSubordinates:true})}>
              Show Subordinates
            </div>
          );
        }
      }
    }
  }

  renderSubordinates(employee) {
    if (employee.direct_reports && (
      this.state.showSubordinates || this.props.disableToggle
    )) {
      return (
        employee.direct_reports.map(subordinate => (
          <Subordinate
            key={subordinate.id}
            employee={subordinate}
            managerName={employee.name}
            opacity={this.props.opacity - 0.07}
            selectEmployee={this.props.selectEmployee}
            disableToggle={this.props.disableToggle}
          />
        ))
      );
    }
  }

  handleClick() {
    this.props.selectEmployee({
      id: this.props.employee.id,
      name: this.props.employee.name,
      title: this.props.employee.title,
      manager_id: this.props.employee.manager_id,
      managerName: this.props.managerName
    });
  }

  render() {
    const employee = this.props.employee;
    const opacity = this.props.opacity;

    return (
      <div style={{borderLeft:'1px solid black', borderRadius:'10px'}}>
        <div
          className='employee'
          style={{backgroundColor:`rgba(255,0,0,${opacity}`}}>
          <span onClick={this.handleClick} style={{display:'flex', alignItems:'center'}}>
            <h1>{employee.name}, {employee.title}</h1>
          </span>
          {this.renderToggleControl(employee)}
        </div>
        <div style={{width:'95%', marginLeft:'5%'}}>
          {this.renderSubordinates(employee)}
        </div>
      </div>
    );
  }
}
